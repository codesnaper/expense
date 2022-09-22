package com.expense.expensemanagement.config.batch;

import com.expense.expensemanagement.dao.AccountUserDAO;
import com.expense.expensemanagement.entity.AccountUser;
import lombok.AllArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.data.RepositoryItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.LineMapper;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.core.task.TaskExecutor;

@Configuration
@EnableBatchProcessing
@AllArgsConstructor
public class SpringBatchConfig  {

   private JobBuilderFactory jobBuilderFactory;

   private StepBuilderFactory stepBuilderFactory;

   private AccountUserDAO accountUserDAO;

    /**
     *
     * @return itemReader
     */
   @Bean
  public FlatFileItemReader<AccountUser> reader(){
       FlatFileItemReader<AccountUser> itemReader = new FlatFileItemReader<>();
       itemReader.setResource(new FileSystemResource(this.getClass().getClassLoader().getResource("account.csv").getFile()));
       //itemReader.setStrict(false);
       itemReader.setName("csvReader");
       itemReader.setLinesToSkip(1);
       itemReader.setLineMapper(linemapper());
      return itemReader;
   }

    /**
     *
     * @return defaultLineMapper
     */

    private LineMapper<AccountUser> linemapper() {
        DefaultLineMapper<AccountUser> defaultLineMapper =new DefaultLineMapper();

        DelimitedLineTokenizer delimitedLineTokenizer= new DelimitedLineTokenizer();
        delimitedLineTokenizer.setDelimiter(",");
        delimitedLineTokenizer.setStrict(false);
        delimitedLineTokenizer.setNames("id","firstName","lastName","email","gender","contactNo","country","dob");

        BeanWrapperFieldSetMapper<AccountUser> beanWrapperFieldSetMapper =new BeanWrapperFieldSetMapper();
        beanWrapperFieldSetMapper.setTargetType(AccountUser.class);


        defaultLineMapper.setLineTokenizer(delimitedLineTokenizer);
        defaultLineMapper.setFieldSetMapper(beanWrapperFieldSetMapper);

        return defaultLineMapper;


    }

    @Bean
    public AccountProcessor processor(){
        return  new AccountProcessor();

    }

    @Bean
    public RepositoryItemWriter<AccountUser> writer(){
        RepositoryItemWriter<AccountUser> repositoryItemWriter= new RepositoryItemWriter<>();

        repositoryItemWriter.setRepository(accountUserDAO);
        repositoryItemWriter.setMethodName("save");
        return  repositoryItemWriter;

    }
    @Bean
    public Step stepOne(){
        return stepBuilderFactory.get("csv-step-one").<AccountUser,AccountUser>chunk(10)
                .reader(reader()).processor(processor())
                .writer(writer())
                .taskExecutor(taskExecutor())
                .build();

    }

    @Bean
    public Job runjob(){
        return jobBuilderFactory.get("add").flow(stepOne()).end().build();

    }

    @Bean
    public TaskExecutor taskExecutor(){

        SimpleAsyncTaskExecutor simpleAsyncTaskExecutor= new SimpleAsyncTaskExecutor();
        simpleAsyncTaskExecutor.setConcurrencyLimit(10);
        return simpleAsyncTaskExecutor;

    }







}
