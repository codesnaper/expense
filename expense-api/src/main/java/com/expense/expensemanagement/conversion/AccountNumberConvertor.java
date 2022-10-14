package com.expense.expensemanagement.conversion;

import com.fasterxml.jackson.databind.util.StdConverter;

/**
 * Class Used by JSON serializer convertor to convert account number to mask account number
 */
public class AccountNumberConvertor extends StdConverter<String, String> {

    /**
     * Method to convert 70% account number to masked
     * @param s String Input
     * @return Return masked string
     */
    @Override
    public String convert(String s) {
        int length = s.length() - (int) (s.length()*0.7);
        return  s.replaceAll(".(?=.{"+length+"})", "X");
    }
}
