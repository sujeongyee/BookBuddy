package book.project.bookbuddy.config;


import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // @Override
    // public void addCorsMappings(CorsRegistry registry) {
    //     registry.addMapping("/**")
    //             .allowedOrigins("http://localhost:3000") 
    //             .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
    //             .allowedHeaders("*") 
    //             .allowCredentials(true); 
    // }

    // @Bean
    // public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean(){
    //     CorsConfiguration config = new CorsConfiguration();

    //     config.setAllowCredentials(false);
    //     config.addAllowedOrigin("*");
    //     config.addAllowedMethod("*");
    //     config.setMaxAge(6000L);

    //     UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();    
    //     source.registerCorsConfiguration("/**", config);

    //     FilterRegistrationBean<CorsFilter> filterBean = new FilterRegistrationBean<>(new CorsFilter(source));    
    //     filterBean.setOrder(0);

    //     return filterBean;
    // }

    
}
