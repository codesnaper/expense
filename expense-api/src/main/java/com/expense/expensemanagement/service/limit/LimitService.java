package com.expense.expensemanagement.service.limit;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.AccountDAO;
import com.expense.expensemanagement.dao.LimitDao;
import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.model.LimitModel;
import com.expense.expensemanagement.model.Recursive;
import com.expense.expensemanagement.model.ResponseList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Stream;

@Service
public class LimitService implements ILimitService {
    @Autowired
    @Qualifier("limitConversion")
    EntityModalConversion<Limit,LimitModel> limitConversion;

    @Autowired
    private LimitDao limitDao;

    @Autowired
    private AccountDAO accountDAO;


    @Override
    public ResponseList<LimitModel> getLimits(int pageNo, int pageSize) {
        Page page=limitDao.findAll(PageRequest.of(pageNo,pageSize));
        ResponseList<LimitModel> responseList=new ResponseList<>();
        responseList.setData(page.getContent());
        responseList.setTotalPage(page.getTotalPages());
        responseList.setTotalCount(page.getTotalElements());
        responseList.setPageNo(page.getNumber());
        return responseList;
    }

    @Override
    public LimitModel addLimit(LimitModel limitModel) {
        Account account = accountDAO.findById(limitModel.getId()).orElse(new Account());
        limitModel.setAccountId(account.getId());

        Limit limit= limitDao.saveAndFlush(limitConversion.getEntity(limitModel));
        return limitConversion.getModel(limit);
    }

    @Override
    public LimitModel updateLimit(LimitModel limitModel) {
        Limit limit1 = null;
        Limit limit=limitDao.findById(limitModel.getId()).orElseThrow(NoSuchElementException::new);
            limitModel.setId(limit.getId());
          limit1=  limitDao.save(limitConversion.getEntity(limitModel));

        return limitConversion.getModel(limit1);
    }

    @Override
    public void deleteLimit(long id, String userId) {
        Limit limit=limitDao.findById(id).orElseThrow(NoSuchElementException::new);
        if(limit.getUserid() == userId) {
            limitDao.deleteById(id);
        }
    }

    @Override
    public Page<Limit> fetchAllLimit(Recursive recursive, PageRequest pageRequest) {
        return this.limitDao.findByReset_recursively(recursive, pageRequest);
    }
}
