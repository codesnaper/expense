package com.expense.expensemanagement.fxrates;

import com.expense.expensemanagement.model.CurrencyType;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service("fxConversion")
public class FXConversionService implements FXConversion{

    @Autowired
    RestTemplate restTemplate;

    @Value("${fx.api}")
    private String url;

    private void createJSONFile(CurrencyType currencyType) throws URISyntaxException, IOException {
        Map<String, Object> currency = restTemplate.getForObject(url.concat(currencyType.getSymbol()+".json"), HashMap.class);
        File fxJSONFile = new File("fx-"+currencyType.getSymbol()+".json");
        if(fxJSONFile.exists()){
            fxJSONFile.delete();
        }
        fxJSONFile.createNewFile();
        try(FileOutputStream fileOutputStream = new FileOutputStream(fxJSONFile)){
            fileOutputStream.write(new ObjectMapper().writeValueAsBytes(Arrays.asList(
                    currency.get(CurrencyType.PLN.getSymbol()),
                    currency.get(CurrencyType.EUR.getSymbol()),
                    currency.get(CurrencyType.USD.getSymbol()),
                    currency.get(CurrencyType.INR.getSymbol())
            ).stream().filter(o -> o != null).collect(Collectors.toList())));
            log.info("Created JSON file for currency %s", currencyType);
        } catch (Exception ex){
            throw  ex;
        }
    }

    @PostConstruct
    @Override
    public void loadFXRate() throws URISyntaxException, IOException {
        createJSONFile(CurrencyType.EUR);
        createJSONFile(CurrencyType.INR);
        createJSONFile(CurrencyType.USD);
        createJSONFile(CurrencyType.PLN);
    }

    @Override
    public double getRate(CurrencyType currencyType, CurrencyType userProfileCurrencyType) throws Exception {
        if(currencyType.getSymbol().equalsIgnoreCase(userProfileCurrencyType.getSymbol())){
            return 1;
        }
        File file = new File("fx-"+userProfileCurrencyType.getSymbol()+".json");
        List<Map<String, Object>> currency = new ObjectMapper().readValue(file, List.class);
        return (double) currency.stream()
                .filter(stringObjectMap -> stringObjectMap.get("code").toString().equalsIgnoreCase(currencyType.getSymbol()))
                .findFirst()
                .orElseThrow(() -> {throw new NoSuchElementException("FX Rate for currency type not configuer");})
                .get("rate");
    }

    @Override
    public List<Object> getRates(CurrencyType currencyType) throws Exception {
        File file = new File("fx-"+currencyType.getSymbol()+".json");
        return new ObjectMapper().readValue(file, List.class);
    }
}
