package com.expense.expensemanagement.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class ResponseList<T>{
    @JsonProperty("Items")
    private List<T> data;

    @JsonProperty("pageNo")
    private int pageNo;

    @JsonProperty("pageSize")
    private int totalPage;

    @JsonProperty("Count")
    private long totalCount;
}
