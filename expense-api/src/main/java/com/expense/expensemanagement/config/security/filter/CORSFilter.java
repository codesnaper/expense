package com.expense.expensemanagement.config.security.filter;


import com.expense.expensemanagement.model.Constants;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;


import java.util.Arrays;

//TODO: need to take value from application yaml
public class CORSFilter extends CorsFilter {

    public CORSFilter() {
        super(configurationSource());
    }

    private static UrlBasedCorsConfigurationSource configurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.setMaxAge(36000L);
        config.setAllowedMethods(Arrays.asList("GET", "HEAD", "POST", "PUT","PATCH", "DELETE", "OPTIONS"));
        config.setExposedHeaders(Arrays.asList("Authorization", "expire", "refreshtoken"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
