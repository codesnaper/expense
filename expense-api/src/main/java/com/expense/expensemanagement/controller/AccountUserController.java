package com.expense.expensemanagement.controller;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/expense/api/v1/accountUser")
public class AccountUserController {


    @Autowired
    JobLauncher jobLauncher;

    @Autowired
    Job job;

    @PostMapping("/add")
    public void addCsvFileToDB(){

        JobParameters jobParameters = new JobParametersBuilder().
        addLong("startAt",System.currentTimeMillis()).toJobParameters();

        try {
            jobLauncher.run(job,jobParameters);
        } catch (JobExecutionAlreadyRunningException | JobRestartException | JobInstanceAlreadyCompleteException | JobParametersInvalidException e) {
            e.printStackTrace();
        }

    }

}
