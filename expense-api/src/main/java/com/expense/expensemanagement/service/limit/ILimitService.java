package com.expense.expensemanagement.service.limit;

import com.expense.expensemanagement.model.LimitModel;
import com.expense.expensemanagement.model.ResponseList;

public interface ILimitService {
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
    LimitModel updateLimit(long id,LimitModel limitModel);

    /**
     *
     * @param id
     */
    void deleteLimit(long id);


}
