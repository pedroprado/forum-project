package pprado.forum.api.utils;

import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DateUtils {

    public String getCurrentLocalDateTime(){
        return LocalDateTime.now().toString();
    }
}
