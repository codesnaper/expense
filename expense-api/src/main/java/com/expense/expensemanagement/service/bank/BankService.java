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
    private final TagMappingDAO tagMappingDAO;
    private final ITagService tagService;

    @Autowired
    @Qualifier("BankEntityModel")
    private EntityModalConversion<Bank, BankModel> bankEntityModalConversion;

    @Autowired
    public BankService(BankDAO bankDAO, TagMappingDAO tagMappingDAO, ITagService tagService) {
        this.bankDAO = bankDAO;
        this.tagMappingDAO = tagMappingDAO;
        this.tagService = tagService;
    }

    @Transactional
    public BankModel addBank(BankModel bankModel) {
        bankModel.setCreditAmount(new BigDecimal(0));
        bankModel.setDebitAmount(new BigDecimal(0));
        Bank bankEntity = this.bankDAO.save(bankEntityModalConversion.getEntity(bankModel));
        bankModel.setId(bankEntity.getId());
        //TODO: put in tag mapping service
        List<TagMapping> tagMappingEntities = new ArrayList<>();
        List<Long> tagIds = bankModel.getTagModels().stream().map(tag -> tag.getId()).collect(Collectors.toList());
        List<Tag> tagEntities = this.tagService.findAllByIds(tagIds);
        if (tagIds.size() != tagEntities.size()) {
            throw new IllegalArgumentException("Provided Tag Id is not found or missing. Please create tag first.");
        }
        tagEntities.parallelStream().forEach(tag -> {
            TagMapping tagMapping = new TagMapping();
            tagMapping.setTagMappingType(TagMappingType.BANK);
            tagMapping.setRefId(bankModel.getId());
            tagMapping.setTags(tag);
            tagMappingEntities.add(tagMapping);
        });
        tagMappingDAO.saveAll(tagMappingEntities);
        return bankModel;
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
        this.bankDAO.delete(bankEntity);
    }

    public BankModel updateBank(BankModel bankModel) {
        Bank bankEntity = this.bankDAO.save(bankEntityModalConversion.getEntity(bankModel));
        return bankEntityModalConversion.getModel(bankEntity);
    }
}
