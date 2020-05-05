package pprado.forum.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMethod;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@EnableSwagger2
public class Swagger {

    @Bean
    public Docket swaggerConfiguration () {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                // remove o mapeamento dos endpoints do SpringBoot
                .apis(RequestHandlerSelectors.basePackage("pprado.forum.api"))
                .paths(PathSelectors.any())
                .build()
                .directModelSubstitute(LocalDate.class, String.class)
                .genericModelSubstitutes(ResponseEntity.class)
                .useDefaultResponseMessages(false)
                .globalResponseMessage(RequestMethod.GET, getDefaultResponseMessages())
                .apiInfo(getApiInfo());
    }

    /**
     * As mensagens para os HTTP status codes
     * default de todos os endpoints da aplicação para {@link RequestMethod#GET}.
     */
    private List<ResponseMessage> getDefaultResponseMessages () {
        final List<ResponseMessage> responseMessages = new ArrayList<>();

        responseMessages.add(new ResponseMessageBuilder()
                .code(HttpStatus.NO_CONTENT.value())
                .message("Nenhum valor encontrado.")
                .build());

        responseMessages.add(new ResponseMessageBuilder()
                .code(HttpStatus.BAD_REQUEST.value())
                .message("Requisição realizada indevidamente.")
                .build());

        responseMessages.add(new ResponseMessageBuilder()
                .code(HttpStatus.BAD_GATEWAY.value())
                .message("Serviços dependentes com erro.")
                .build());

        responseMessages.add(new ResponseMessageBuilder()
                .code(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message("Erro interno.")
                .build());

        return responseMessages;
    }

    private ApiInfo getApiInfo () {

        return new ApiInfoBuilder()
                .title("API Fórum.")
                .description("API que busca informações de perguntas e respostas do fórum.")
                .contact(new Contact("Pedro Prado", "", "phsprado@gmail.com"))
                .build();
    }
}
