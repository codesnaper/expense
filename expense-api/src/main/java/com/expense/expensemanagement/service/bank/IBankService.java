package com.expense.expensemanagement.service.bank;

import com.expense.expensemanagement.entity.Bank;
import com.expense.expensemanagement.model.BankModel;
import com.expense.expensemanagement.model.ResponseList;

public interface IBankService {
    /**
     * Method will add new Bank to table
     * @param bankModel Bank Object
     * @return
     */
    BankModel addBank(BankModel bankModel);

    /**
     * Method will fetch all the bank w.r.t userid
     * @param userId
     * @param page
     * @param size
     * @return
     */
    ResponseList<BankModel> getAllBanks(String userId, int page, int size);

    /**
     * Method will delete the bank
     * @param id
     */
    void deleteBank(String userId, long id);

    /**
     * Method will update the bank
     * @param bankModel
     * @return
     */
    BankModel updateBank(BankModel bankModel);

    BankModel findById(long id, String userId);

    Bank findById(long id);
}
