package pprado.forum.api.resource;

import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.extension.ExtensionContextException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pprado.forum.api.document.Answer;
import pprado.forum.api.service.AnswerService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class AnswerResourceTest {

    private AnswerService mockAnswerService = mock(AnswerService.class);

    private AnswerResource answerResource = new AnswerResource(mockAnswerService);


    @Test
    public void listAnswersTest(){
        var listAnswers = mock(List.class);

        doReturn(listAnswers).when(mockAnswerService).listAnswers();

        var expectedResponse = new ResponseEntity<>(listAnswers, HttpStatus.OK);

        var actualResponse = answerResource.listAnswers();

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void listAnswersTest_Empty(){
        var listAnswers = new ArrayList<>();

        doReturn(listAnswers).when(mockAnswerService).listAnswers();

        var expectedResponse = new ResponseEntity<>(HttpStatus.NO_CONTENT);

        var actualResponse = answerResource.listAnswers();

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void listAnswersTest_Exception(){
        when(mockAnswerService.listAnswers()).thenThrow(new ExtensionContextException("Exception"));

        var expectedResponse = new ResponseEntity<>("Exception", HttpStatus.INTERNAL_SERVER_ERROR);

        var actualResponse = answerResource.listAnswers();

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void findByIdTest(){
        var id = "id";
        var answer = Optional.of(mock(Answer.class));

        doReturn(answer).when(mockAnswerService).findById(id);

        var expectedResponse = new ResponseEntity<>(answer.get(), HttpStatus.OK);

        var actualResponse = answerResource.findById(id);

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void findByIdTest_Empty(){
        var id = "id";
        var answer = Optional.empty();

        doReturn(answer).when(mockAnswerService).findById(id);

        var expectedResponse = new ResponseEntity<>(HttpStatus.NO_CONTENT);

        var actualResponse = answerResource.findById(id);

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void findByIdTest_Exception(){
        var id = "id";

        when(mockAnswerService.findById(id)).thenThrow(new ExtensionContextException("Exception"));

        var expectedResponse = new ResponseEntity<>("Exception", HttpStatus.INTERNAL_SERVER_ERROR);

        var actualResponse = answerResource.findById(id);

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void findAllByQuestionIdTest(){
        var questionId = "id";
        var listAnswers = mock(List.class);

        doReturn(listAnswers).when(mockAnswerService).findAllByQuestionId(questionId);

        var expectedResponse = new ResponseEntity<>(listAnswers, HttpStatus.OK);

        var actualResponse = answerResource.findAllByQuestionId(questionId);

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void findAllByQuestionIdTest_Empty(){
        var questionId = "id";
        var listAnswers = new ArrayList<>();

        doReturn(listAnswers).when(mockAnswerService).findAllByQuestionId(questionId);

        var expectedResponse = new ResponseEntity<>(HttpStatus.NO_CONTENT);

        var actualResponse = answerResource.findAllByQuestionId(questionId);

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void findAllByQuestionIdTest_Exception(){
        var questionId = "id";

        when(mockAnswerService.findAllByQuestionId(questionId)).thenThrow(new ExtensionContextException("Exception"));

        var expectedResponse = new ResponseEntity<>("Exception", HttpStatus.INTERNAL_SERVER_ERROR);

        var actualResponse = answerResource.findAllByQuestionId(questionId);

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void createTest(){
        var answer = mock(Answer.class);
        var answerResponse = mock(Answer.class);

        doReturn(answerResponse).when(mockAnswerService).create(answer);

        var expectedResponse = new ResponseEntity<>(answerResponse, HttpStatus.CREATED);

        var actualResponse = answerResource.create(answer);

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void createTest_Exception(){
        var answer = mock(Answer.class);

        when(mockAnswerService.create(answer)).thenThrow(new ExtensionContextException("Exception"));

        var expectedResponse = new ResponseEntity<>("Exception", HttpStatus.INTERNAL_SERVER_ERROR);

        var actualResponse = answerResource.create(answer);

        assertEquals(expectedResponse, actualResponse);
    }

}

