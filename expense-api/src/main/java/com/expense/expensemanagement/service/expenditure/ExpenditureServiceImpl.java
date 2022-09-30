package com.expense.expensemanagement.service.expenditure;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.ExpenditureDAO;
import com.expense.expensemanagement.entity.Expenditure;
import com.expense.expensemanagement.exception.MaxLimitException;
import com.expense.expensemanagement.model.ExpenditureModel;
import com.expense.expensemanagement.model.NotificationType;
import com.expense.expensemanagement.service.expenditure.transaction.Transaction;
import com.expense.expensemanagement.service.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class ExpenditureServiceImpl implements ExpenditureService{

    @Autowired
    private NotificationService notificationService;

    @Autowired
    @Qualifier("addTransaction")
    private Transaction addTransaction;

    @Autowired
    private ExpenditureDAO expenditureDAO;

    @Autowired
    @Qualifier("ExpenditureConversion")
    EntityModalConversion<Expenditure, ExpenditureModel> expenditureConversion;

    public ExpenditureModel addExpenditure(ExpenditureModel expenditureModel) throws MaxLimitException {
        if(expenditureModel.getLimit() != null && expenditureModel.getLimit().getUsedAmount() + expenditureModel.getAmount() > expenditureModel.getLimit().getMaxAmount()){
            notificationService.sendNewNotification(
                    expenditureModel.getUserId(),
                    String.format("Limit %s is reached maximum limit.", expenditureModel.getLimit().getName()),
                    String.format("Limit: %s </br> Maximum amount: %d. <br/> Used Amount: %d ", expenditureModel.getLimit().getName(), expenditureModel.getLimit().getMaxAmount(), expenditureModel.getLimit().getUsedAmount() + expenditureModel.getAmount()),
                    NotificationType.LIMIT_REACHED
            );
            throw new MaxLimitException("Limit exceede max amount");
        }
        if(expenditureModel.getLimit() != null && expenditureModel.getLimit().getUsedAmount() + expenditureModel.getAmount() > expenditureModel.getLimit().getThresoldWarningAmount()){
            notificationService.sendNewNotification(
                    expenditureModel.getUserId(),
                    String.format("Limit %s is reached its thresold limit amount.", expenditureModel.getLimit().getName()),
                    String.format("Limit: %s </br> Thresold amount: %d. <br/> Used Amount: %d ", expenditureModel.getLimit().getName(), expenditureModel.getLimit().getThresoldWarningAmount(), expenditureModel.getLimit().getUsedAmount() + expenditureModel.getAmount()),
                    NotificationType.LIMIT_WARNING
            );
        }
        switch (expenditureModel.getType()){
            case EXPENSE:
                addTransaction.expenseTransaction(expenditureModel);
                break;

            case REVENUE:
                addTransaction.revenueTransaction(expenditureModel);
                break;

            case TRANSFER:
                addTransaction.transferTransaction(expenditureModel);
                break;

            default:
                throw new IllegalArgumentException("Invalid expenditure type");
        }
        return expenditureConversion.getModel(expenditureDAO.save(expenditureConversion.getEntity(expenditureModel)));
    }
}
