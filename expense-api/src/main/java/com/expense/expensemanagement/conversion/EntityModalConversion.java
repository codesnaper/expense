package com.expense.expensemanagement.conversion;

/**
 * Interface to implement mapper for Entity and Modal POJO conversion.
 * @param <E> Entity
 * @param <M> Modal
 */
public interface EntityModalConversion<E, M> {

    /**
     * Method to convert Entity POJO to Business POJO
     * @param e
     * @return
     */
    M getModel(E e);

    /**
     * Method to convert Business POJO to entity POJO
     * @param m
     * @return
     */
    E getEntity(M m);

}
