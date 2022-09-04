package com.expense.expensemanagement.service.limit;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.AccountDAO;
import com.expense.expensemanagement.dao.LimitDao;
import com.expense.expensemanagement.entity.Account;
import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.model.LimitModel;
import com.expense.expensemanagement.model.ResponseList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

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
        limitModel.setAccount_id(account.getId());
        Limit limit= limitDao.save(limitConversion.getEntity(limitModel));
        return limitConversion.getModel(limit);
    }

    @Override
    public LimitModel updateLimit(long id, LimitModel limitModel) {
        Limit limit1 = null;
        Limit limit=limitDao.findById(id).orElseThrow(NoSuchElementException::new);
        if (limit.getId() == id) {
            limitModel.setId(limit.getId());
          limit1=  limitDao.save(limitConversion.getEntity(limitModel));
        }
        return limitConversion.getModel(limit1);
    }

    @Override
    public void deleteLimit(long id) {
        limitDao.deleteById(id);
    }
}
