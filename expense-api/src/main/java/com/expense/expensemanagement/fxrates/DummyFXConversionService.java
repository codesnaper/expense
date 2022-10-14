package com.expense.expensemanagement.fxrates;

import com.expense.expensemanagement.model.CurrencyType;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
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
@Profile("test")
public class DummyFXConversionService implements FXConversion{

    @Override
    public void loadFXRate() throws URISyntaxException, IOException {

    }

    @Override
    public double getRate(CurrencyType currencyType, CurrencyType userProfileCurrencyType) throws Exception {
        return 1;
    }

    @Override
    public List<Object> getRates(CurrencyType currencyType) throws Exception {
        return new ArrayList<>();
    }
}
