package com.expense.expensemanagement.conversion;

public interface EntityModalConversion<E, M> {

    M getModel(E e);

    E getEntity(M m);

}
