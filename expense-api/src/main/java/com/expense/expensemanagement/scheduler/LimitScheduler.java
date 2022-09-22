package com.expense.expensemanagement.scheduler;

import com.expense.expensemanagement.dao.LimitDao;
import com.expense.expensemanagement.dao.NotificationDao;
import com.expense.expensemanagement.entity.Limit;
import com.expense.expensemanagement.entity.Notification;
import com.expense.expensemanagement.model.LogExecutionTime;
import com.expense.expensemanagement.model.Recursive;
import com.expense.expensemanagement.service.limit.ILimitService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * TODO: add Loan Scheduler monthly anount to add.
 */
@Component
@Slf4j
public class LimitScheduler {

    private final ILimitService limitService;

    @Autowired
    private NotificationDao notificationDao;

    @Autowired
    private LimitDao limitDao;

    public LimitScheduler(ILimitService limitService) {
        this.limitService = limitService;
    }

    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    @LogExecutionTime
    public void scheduleLimitAmountOnDailyReset(){
        log.info("Running Daily limit scheduler task");
        runLimitResetTask(Recursive.DAILY);
        log.info("Daily limit scheduler task completed !!!");
    }

    @Scheduled(cron = "0 0 0 1 * ?")
    @Transactional
    @LogExecutionTime
    public void scheduleLimitAmountOnMonthlyReset(){
        log.info("Running Monthly limit scheduler task");
        runLimitResetTask(Recursive.MONTHLY);
        log.info("Daily Monthly scheduler task completed !!!");
    }

    @Scheduled(cron = "0 0 0 1 1 ?")
    @Transactional
    @LogExecutionTime
    public void scheduleLimitAmountOnYearlyReset(){
        log.info("Running Yearly limit scheduler task");
        runLimitResetTask(Recursive.YEARLY);
        log.info("Daily Yearly scheduler task completed !!!");
    }

    private void runLimitResetTask(Recursive recursive){
        int pageNo = 0;
        PageRequest page = PageRequest.of(pageNo, 10);
        Page<Limit> limitPage= this.limitService.fetchAllLimit(recursive, page);
        while (limitPage.hasNext()){
            List<Limit> limits = limitPage.getContent().stream().parallel().map(limit -> {
                limit.setUsedAmount(new BigDecimal(0));
                Notification notification = new Notification();
                notification.setDescription(String.format("%s limit amount has been reset to 0. Expenses can be added", limit.getName()));
                notification.setHeading(String.format("%s limit amount reset", limit.getName()));
                notification.setUnread(true);
                notification.setUserId(limit.getUserid());
                notificationDao.save(notification);
                return limit;
            }).collect(Collectors.toList());
            limitDao.saveAll(limits);
            page = PageRequest.of(++pageNo, 10);
            limitPage = this.limitService.fetchAllLimit(recursive, page);
        }
    }
}
