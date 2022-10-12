package com.expense.expensemanagement.config.security.filter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@Order(value = Ordered.HIGHEST_PRECEDENCE)
@Profile("prod")
public class ReactRouterFilter implements Filter {

    @Value("${react.router}")
    private String[] reactRouters;
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        boolean match = false;
        Matcher matcher = null;
        for(String reactPath: reactRouters){
            Pattern pattern = Pattern.compile(reactPath);
            matcher = pattern.matcher(req.getRequestURI());
            if(matcher.find()){
                match = true;
            }
        }
        if(match){
            servletRequest.getRequestDispatcher("/em/index.html").forward(servletRequest, servletResponse);
        } else {
            filterChain.doFilter(servletRequest,servletResponse);
        }
    }
}
