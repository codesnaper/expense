package com.expense.expensemanagement.config.security.filter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;

@Component
@Order(value = Ordered.HIGHEST_PRECEDENCE)
public class ReactRouterFilter implements Filter {

    @Value("${react.router}")
    private String[] reactRouters;
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        if(Arrays.asList(reactRouters).indexOf(req.getRequestURI()) != -1){
            servletRequest.getRequestDispatcher("/em/index.html").forward(servletRequest, servletResponse);
        }
        filterChain.doFilter(servletRequest,servletResponse);
    }
}
