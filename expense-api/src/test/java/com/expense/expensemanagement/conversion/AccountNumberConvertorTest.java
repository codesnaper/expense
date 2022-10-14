package com.expense.expensemanagement.conversion;

import org.junit.Assert;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;


class AccountNumberConvertorTest {

    AccountNumberConvertor accountNumberConvertor = new AccountNumberConvertor();
    @Test
    void convert() {
        String accountNumber = "PROTECTED1234";
        Assert.assertEquals("XXXXXXXXX1234", accountNumberConvertor.convert(accountNumber));
    }
}