package com.expense.expensemanagement.fxrates;

import com.expense.expensemanagement.model.CurrencyType;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

public interface FXConversion {

    void loadFXRate() throws URISyntaxException, IOException;

    List<Object> getRates(CurrencyType currencyType) throws Exception;

    double getRate(CurrencyType currencyType, CurrencyType userProfileCurrencyType) throws Exception;
}
