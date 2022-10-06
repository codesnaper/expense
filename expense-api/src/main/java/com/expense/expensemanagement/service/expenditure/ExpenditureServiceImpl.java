package com.expense.expensemanagement.service.expenditure;

import com.expense.expensemanagement.conversion.EntityModalConversion;
import com.expense.expensemanagement.dao.ExpenditureDAO;
import com.expense.expensemanagement.entity.Expenditure;
import com.expense.expensemanagement.exception.AmountInsufficientException;
import com.expense.expensemanagement.exception.MaxLimitException;
import com.expense.expensemanagement.model.ExpenditureModel;
import com.expense.expensemanagement.model.ExpenditureSummary;
import com.expense.expensemanagement.model.ExpenditureType;
import com.expense.expensemanagement.model.NotificationType;
import com.expense.expensemanagement.service.expenditure.transaction.Transaction;
import com.expense.expensemanagement.service.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

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

    private void rollbackTransaction(Expenditure expenditure) throws AmountInsufficientException {
        expenditure.setAmount(expenditure.getAmount().multiply(new BigDecimal((-1))));
        ExpenditureModel expenditureModel = expenditureConversion.getModel(expenditure);
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
    }

    private void preInitializeExpenditureModel(ExpenditureModel expenditureModel) throws MaxLimitException {
        if(expenditureModel.getLimit() != null && expenditureModel.getCategory() == null){
            expenditureModel.setCategory(expenditureModel.getLimit().getCategory());
        }
        if(expenditureModel.getLimit() != null && expenditureModel.getAccount() == null){
            expenditureModel.setAccount(expenditureModel.getLimit().getAccount());
        }
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
                    String.format("Limit: %s </br> Thresold amount: %s. <br/> Used Amount: %s ", expenditureModel.getLimit().getName(), expenditureModel.getLimit().getThresoldWarningAmount().toString(), expenditureModel.getLimit().getUsedAmount() + expenditureModel.getAmount()),
                    NotificationType.LIMIT_WARNING
            );
        }
    }

    private void transaction(ExpenditureModel expenditureModel) throws AmountInsufficientException {
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
    }

    @Override
    public ExpenditureModel updateExpenditure(ExpenditureModel expenditureModel) throws Exception {
        Expenditure expenditure = expenditureDAO.findByUserIdAndId(expenditureModel.getUserId(), expenditureModel.getId()).orElseThrow(
                () -> {throw new NoSuchElementException("Expenditure not found.");});
        if(expenditure.getAmount().doubleValue() != expenditureModel.getAmount()){
            double originalAmount = expenditureModel.getAmount();
            double diffAmount = expenditureModel.getAmount() - expenditure.getAmount().doubleValue();
            expenditureModel.setAmount(diffAmount);
            transaction(expenditureModel);
            expenditureModel.setAmount(originalAmount);
        }
        return expenditureConversion.getModel(expenditureDAO.save(expenditureConversion.getEntity(expenditureModel)));
    }

    public void deleteExpenditure(long id, String userId) throws Exception{
        Expenditure expenditure = expenditureDAO.findByUserIdAndId(userId, id).orElseThrow(
                () -> {throw new NoSuchElementException("Expenditure not found.");});
        rollbackTransaction(expenditure);
        expenditureDAO.delete(expenditure);
    }

    public ExpenditureModel addExpenditure(ExpenditureModel expenditureModel) throws MaxLimitException, AmountInsufficientException {
        preInitializeExpenditureModel(expenditureModel);
        transaction(expenditureModel);
        return expenditureConversion.getModel(expenditureDAO.save(expenditureConversion.getEntity(expenditureModel)));
    }

    @Override
    public List<ExpenditureModel> fetchExpenditureBetweenDate(Date toDate, Date fromDate) {
        return expenditureDAO.findByLoggedDateBetween(toDate,fromDate)
                .stream().map(expenditureConversion::getModel)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<ExpenditureSummary> getExpenditureSummary(int month, String year){
        List<ExpenditureSummary>  expenditureSummaries = new ArrayList<>();
        ExpenditureSummary expenditureSummary = new ExpenditureSummary();
//        expenditureSummary.setAmount(expenditureDAO.groupByMonthAndYear(month, year, ExpenditureType.EXPENSE));
        expenditureSummary.setMonth(month);
        expenditureSummary.setYear(year);
        expenditureSummary.setType(ExpenditureType.EXPENSE);
        expenditureSummaries.add(expenditureSummary);
//        expenditureSummary.setAmount(expenditureDAO.groupByMonthAndYear(month, year, ExpenditureType.REVENUE));
        expenditureSummary.setMonth(month);
        expenditureSummary.setYear(year);
        expenditureSummary.setType(ExpenditureType.REVENUE);
        expenditureSummaries.add(expenditureSummary);
        return expenditureSummaries;
    }
}
