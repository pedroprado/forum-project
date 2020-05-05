package pprado.forum.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import pprado.forum.api.config.Swagger;

@Configuration
@Import({Swagger.class})
@SpringBootApplication
public class ForumApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ForumApiApplication.class, args);
	}

}
