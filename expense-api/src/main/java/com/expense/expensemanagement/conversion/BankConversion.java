package com.expense.expensemanagement.conversion;

import com.expense.expensemanagement.entity.Bank;
import com.expense.expensemanagement.entity.Tag;
import com.expense.expensemanagement.model.BankModel;
import com.expense.expensemanagement.model.TagModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Conversion Class for Bank POJO
 */
@Component("BankEntityModel")
public class BankConversion implements EntityModalConversion<Bank, BankModel> {

    @Autowired
    @Qualifier("TagEntityModel")
    private EntityModalConversion<Tag, TagModel> tagEntityModalConversion;

    /**
     * {@inheritDoc}
     */
    @Override
    public BankModel getModel(Bank bankEntity) {
        BankModel bankModel = new BankModel();
        bankModel.setCreditAmount(bankEntity.getCreditAmount());
        bankModel.setDebitAmount(bankEntity.getDebitAmount());
        bankModel.setCurrencyType(bankEntity.getCurrency());
        bankModel.setId(bankEntity.getId());
        bankModel.setLocation(bankEntity.getLocation());
        bankModel.setName(bankEntity.getName());
        bankModel.setTotalAccount(bankEntity.getNAccount());
        bankModel.setUserId(bankEntity.getUserId());
        bankModel.setHoldAmount(bankEntity.getHoldAmount());
        bankModel.setTagModels(
                bankEntity.getTagMappings().parallelStream().
                        map(tagMapping -> tagEntityModalConversion.getModel(tagMapping.getTags())).
                        collect(Collectors.toList())
        );
        return bankModel;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Bank getEntity(BankModel bankModel) {
        Bank bankEntity = new Bank();
        bankEntity.setCurrency(bankModel.getCurrencyType());
        bankEntity.setCreditAmount(bankModel.getCreditAmount());
        bankEntity.setDebitAmount(bankModel.getDebitAmount());
        bankEntity.setHoldAmount(Optional.ofNullable(bankModel.getHoldAmount()).orElse(BigDecimal.valueOf(0)));
        bankEntity.setName(bankModel.getName());
        bankEntity.setLocation(bankModel.getLocation());
        bankEntity.setNAccount(0);
        if (bankModel.getId() != null) {
            bankEntity.setId(bankModel.getId());
        }
        bankEntity.setUserId(bankModel.getUserId());
        return bankEntity;
    }
}
