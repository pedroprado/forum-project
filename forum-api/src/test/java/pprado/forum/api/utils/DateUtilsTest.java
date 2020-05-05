package pprado.forum.api.utils;

import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DateUtilsTest {

    private DateUtils dateUtils = new DateUtils();

    @Test
    public void getCurrentLocalDateTimeTest(){
        var currentTime = LocalDateTime.now();

        var fetchedTime = LocalDateTime.parse( dateUtils.getCurrentLocalDateTime());

        assertEquals(currentTime.getSecond(), fetchedTime.getSecond(), 1);
    }
}
