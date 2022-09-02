package com.expense.expensemanagement.model;

import com.expense.expensemanagement.entity.Account;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;

@Data
@ToString
public class BankModel {
    @JsonProperty("name")
    private String name;

    @JsonProperty("location")
    private String location;

    @JsonProperty("currency")
    private CurrencyType currencyType;

    @JsonProperty("tags")
    private List<TagModel> tagModels;

    @JsonProperty("USERID")
    private String userId;

    @JsonProperty("ID")
    private Long id;

    @JsonProperty("creditAmount")
    private BigDecimal creditAmount;

    @JsonProperty("debitAmount")
    private BigDecimal debitAmount;

    @JsonProperty("holdAmount")
    private BigDecimal holdAmount;

    @JsonProperty("totalAccounts")
    private int totalAccount;

    private List<Account> accounts;
}
