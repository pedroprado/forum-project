package pprado.forum.api.service;

import org.junit.jupiter.api.Test;
import pprado.forum.api.document.Answer;
import pprado.forum.api.repository.AnswerRepository;
import pprado.forum.api.utils.DateUtils;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class AnswerServiceTest {

    private AnswerRepository mockAnswerRepository = mock(AnswerRepository.class);
    private DateUtils mockDateUtils = mock(DateUtils.class);

    private AnswerService answerService = spy(new AnswerService(mockAnswerRepository, mockDateUtils));

    @Test
    public void listAnswersTest(){
        var answers = mock(List.class);

        doReturn(answers).when(mockAnswerRepository).findAll();

        var expectedResponse = answers;

        var actualResponse = answerService.listAnswers();

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void findByIdTest(){
        var id = "id";
        var answer = Optional.of(mock(Answer.class));

        doReturn(answer).when(mockAnswerRepository).findById(id);

        var expectedResponse = answer;

        var actualResponse = answerService.findById(id);

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void findAllByQuestionIdTest(){
        var questionId = "id";
        var answers = mock(List.class);

        doReturn(answers).when(mockAnswerRepository).findByQuestionId(questionId);

        var expectedResponse = answers;

        var actualResponse = answerService.findAllByQuestionId(questionId);

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void createTest(){
        var date = "2019-04-04";
        var answer = new Answer("text", "user", "date", "id");
        var answerSaved = new Answer("text", "user", date, "id");
        var answerResponse = mock(Answer.class);

        doReturn(date).when(mockDateUtils).getCurrentLocalDateTime();

        doReturn(answerResponse).when(mockAnswerRepository).save(answerSaved);

        var expectedResponse = answerResponse;

        var actualResponse = answerService.create(answer);

        assertEquals(expectedResponse, actualResponse);
    }

}
