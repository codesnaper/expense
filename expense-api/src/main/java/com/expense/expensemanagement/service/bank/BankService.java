package com.expense.expensemanagement.service.bank;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.BankDAO;
import com.expense.expensemanagement.dao.TagMappingDAO;
import com.expense.expensemanagement.entity.Bank;
import com.expense.expensemanagement.entity.Tag;
import com.expense.expensemanagement.entity.TagMapping;
import com.expense.expensemanagement.model.BankModel;
import com.expense.expensemanagement.model.ResponseList;
import com.expense.expensemanagement.model.TagMappingType;
import com.expense.expensemanagement.service.tag.ITagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class BankService implements IBankService {

    private final BankDAO bankDAO;
    private final com.expense.expensemanagement.service.tagMapping.TagMapping tagMappingService;

    @Autowired
    private TagMappingDAO tagMappingDAO;

    @Autowired
    @Qualifier("BankEntityModel")
    private EntityModalConversion<Bank, BankModel> bankEntityModalConversion;

    @Autowired
    public BankService(BankDAO bankDAO, com.expense.expensemanagement.service.tagMapping.TagMapping tagMappingService) {
        this.bankDAO = bankDAO;
        this.tagMappingService = tagMappingService;
    }

    @Transactional
    public BankModel addBank(BankModel bankModel) {
        try{
            bankModel.setCreditAmount(new BigDecimal(0));
            bankModel.setDebitAmount(new BigDecimal(0));
            Bank bankEntity = this.bankDAO.save(bankEntityModalConversion.getEntity(bankModel));
            bankModel.setId(bankEntity.getId());
            this.tagMappingService.addTagMapping(bankModel);
            return bankModel;
        } catch (DataIntegrityViolationException ex){
            throw new DuplicateKeyException("name: Bank Name already exits. It should be unique");
        }
    }

    @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
    public ResponseList<BankModel> getAllBanks(String userId, int page, int size) {
        Page<Bank> bankPage = this.bankDAO.findByUserId(userId, PageRequest.of(page, size));
        ResponseList<BankModel> responseList = new ResponseList<>();
        responseList.setPageNo(bankPage.getNumber());
        responseList.setTotalPage(bankPage.getTotalPages());
        responseList.setTotalCount(bankPage.getTotalElements());
        responseList.setData(bankPage.stream().map(bankModelEntity -> bankEntityModalConversion.getModel(bankModelEntity)).collect(Collectors.toList()));
        return responseList;
    }

    public void deleteBank(long id) {
        Bank bankEntity = this.bankDAO.findById(id).orElseThrow(NoSuchElementException::new);
        if (bankEntity.getAccounts().size() != 0) {
            throw new IllegalStateException("There are account tagged to bank. Can Delete the bank.");
        }
        bankEntity.getTagMappings()
                .stream().forEach(tagMapping -> this.tagMappingDAO.delete(tagMapping));
        this.bankDAO.delete(bankEntity);
    }

    public BankModel updateBank(BankModel bankModel) {
        Bank bankEntity = this.bankDAO.save(bankEntityModalConversion.getEntity(bankModel));
        return bankEntityModalConversion.getModel(bankEntity);
    }

    @Override
    public Bank findById(long id) {
        return this.bankDAO.findById(id).orElseThrow(() -> new NoSuchElementException("Bank Id is not found."));
    }
}
