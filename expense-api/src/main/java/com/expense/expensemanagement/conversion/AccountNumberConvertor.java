package com.expense.expensemanagement.conversion;

import com.fasterxml.jackson.databind.util.StdConverter;

public class AccountNumberConvertor extends StdConverter<String, String> {

    @Override
    public String convert(String s) {
        int length = s.length() - (int) (s.length()*0.7);
        return  s.replaceAll(".(?=.{"+length+"})", "X");
    }
}
