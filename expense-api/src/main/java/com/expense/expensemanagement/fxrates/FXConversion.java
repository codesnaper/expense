package com.expense.expensemanagement.fxrates;

import com.expense.expensemanagement.model.CurrencyType;

import java.io.IOException;
import java.net.URISyntaxException;

public interface FXConversion {

    void loadFXRate() throws URISyntaxException, IOException;

    double getRate(CurrencyType currencyType, CurrencyType userProfileCurrencyType) throws Exception;
}
