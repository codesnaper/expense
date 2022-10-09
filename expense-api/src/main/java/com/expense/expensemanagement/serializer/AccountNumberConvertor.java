package com.expense.expensemanagement.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.fasterxml.jackson.databind.util.StdConverter;

import java.io.IOException;

public class AccountNumberConvertor extends StdConverter<String, String> {

    @Override
    public String convert(String s) {
        int length = s.length() - (int) (s.length()*0.7);
        return  s.replaceAll(".(?=.{"+length+"})", "X");
    }
}
