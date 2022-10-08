package com.expense.expensemanagement.controller;

import com.expense.expensemanagement.fxrates.FXConversion;
import com.expense.expensemanagement.model.CurrencyType;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/expense/api/v1/fxrate")
@AllArgsConstructor
public class RateController {

    private final FXConversion fxConversionService;

    @GetMapping(value = "", produces = MediaType.TEXT_PLAIN_VALUE)
    public String getRate(@RequestParam CurrencyType toCurrencyType, @RequestParam CurrencyType fromCurrencyType) throws Exception {
        return String.valueOf(this.fxConversionService.getRate(toCurrencyType, fromCurrencyType));
    }

    @GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Object> getRates(@RequestParam CurrencyType currencyType) throws Exception {
        return this.fxConversionService.getRates(currencyType);
    }

}
