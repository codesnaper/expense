package com.expense.expensemanagement.scheduler;

import com.expense.expensemanagement.fxrates.FXConversion;
import com.expense.expensemanagement.model.LogExecutionTime;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.io.IOException;
import java.net.URISyntaxException;

@Component
@Slf4j
@AllArgsConstructor
public class FXConversionScheduler {

    private final FXConversion fxConversion;

    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    @LogExecutionTime
    public void scheduleLimitAmountOnDailyReset() throws URISyntaxException, IOException {
        log.info("Running FXConversion Task");
        fxConversion.loadFXRate();
        log.info("FXConversion scheduler task completed !!!");
    }
}
