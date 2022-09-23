package com.expense.expensemanagement.service.limit;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.AccountDAO;
import com.expense.expensemanagement.dao.LimitDao;
import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.model.LimitModel;
import com.expense.expensemanagement.model.Recursive;
import com.expense.expensemanagement.model.ResponseList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.stream.Collectors;

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
    public ResponseList<LimitModel> getLimits(int pageNo, int pageSize, String userId) {
        Page<Limit> page=limitDao.findByUserid(userId,PageRequest.of(pageNo,pageSize));
        ResponseList<LimitModel> responseList=new ResponseList<>();
        responseList.setData(
                page.getContent().stream().map(limitConversion::getModel).collect(Collectors.toList())
        );
        responseList.setTotalPage(page.getTotalPages());
        responseList.setTotalCount(page.getTotalElements());
        responseList.setPageNo(page.getNumber());
        return responseList;
    }

    @Override
    public LimitModel addLimit(LimitModel limitModel) {
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
        Limit limit=limitDao.findByIdAndUserid(id,userId).orElseThrow(NoSuchElementException::new);
        limitDao.deleteById(limit.getId());
    }

    @Override
    public Page<Limit> fetchAllLimit(Recursive recursive, PageRequest pageRequest) {
        return this.limitDao.findByResetRecursively(recursive, pageRequest);
    }
}
