//package com.expense.expensemanagement.config;
//
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.csrf()
//                .and()
//                .authorizeRequests(authz -> authz.mvcMatchers("/")
//                        .permitAll()
//                        .anyRequest()
//                        .authenticated())
//                .oauth2Login()
//                .and()
//                .logout()
//                .logoutSuccessUrl("/");
//    }
//}