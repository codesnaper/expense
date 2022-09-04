package com.expense.expensemanagement.util;

import com.expense.expensemanagement.config.security.auth.JwtAuthenticationToken;
import com.expense.expensemanagement.model.UserContext;

import java.security.Principal;

public class ExpenseUtil {

    public static String getUserId(Principal principal){
        return ((UserContext)((JwtAuthenticationToken) principal).getPrincipal()).getUsername();
    }
}
