package com.expense.expensemanagement.service.limit;

import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.model.LimitModel;
import com.expense.expensemanagement.model.Recursive;
import com.expense.expensemanagement.model.ResponseList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

import java.security.Principal;
import java.util.List;
import java.util.stream.Stream;

public interface ILimitService {

    Page<Limit> fetchAllLimit(Recursive reset_recursively, PageRequest pageRequest);
    /**
     *
     * @param pageNo
     * @param pageSize
     * @return
     */
    ResponseList<LimitModel> getLimits(int pageNo,int pageSize);

    /**
     *
     * @param limitModel
     * @return
     */
    LimitModel addLimit(LimitModel limitModel);

    /**
     *
     * @param id
     * @param limitModel
     * @return
     */
    LimitModel updateLimit(LimitModel limitModel);

    /**
     *
     * @param id
     */
    void deleteLimit(long id, String userId);

}
