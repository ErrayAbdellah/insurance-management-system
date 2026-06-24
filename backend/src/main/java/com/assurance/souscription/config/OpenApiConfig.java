package com.assurance.souscription.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI insuranceApi() {
        return new OpenAPI()
                .info(
                        new Info()
                                .title("Insurance Subscription API")
                                .version("1.0")
                                .description("Mini insurance subscription system")
                );
    }
}