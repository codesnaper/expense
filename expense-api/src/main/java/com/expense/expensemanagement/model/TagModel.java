package com.expense.expensemanagement.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TagModel {

    @JsonProperty("ID")
    private long id;

    @JsonProperty("name")
    private String key;

    @JsonProperty("description")
    private String value;

}
