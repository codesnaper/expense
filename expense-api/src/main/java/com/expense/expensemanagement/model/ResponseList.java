package com.expense.expensemanagement.model;

import lombok.Data;

import java.util.List;

@Data
public class ResponseList<T>{
    private List<T> data;

    private int pageNo;

    private int totalPage;

    private long totalCount;
}
