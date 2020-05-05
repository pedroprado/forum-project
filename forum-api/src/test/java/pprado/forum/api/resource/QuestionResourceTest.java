package pprado.forum.api.resource;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtensionContextException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pprado.forum.api.document.Question;
import pprado.forum.api.service.QuestionService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class QuestionResourceTest {

    private QuestionService mockQuestionService = mock(QuestionService.class);

    private QuestionResource questionResource = new QuestionResource(mockQuestionService);

    @Test
    public void listQuestionsTest(){
        var listQuestions = mock(List.class);

        doReturn(listQuestions).when(mockQuestionService).listQuestions();

        var expectedResponse = new ResponseEntity<>(listQuestions, HttpStatus.OK);

        var actualResponse = questionResource.listQuestions();

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void listQuestionsTest_Empty(){
        var listQuestions = new ArrayList<>();

        doReturn(listQuestions).when(mockQuestionService).listQuestions();

        var expectedResponse = new ResponseEntity<>(HttpStatus.NO_CONTENT);

        var actualResponse = questionResource.listQuestions();

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void listQuestionsTest_Exception(){
        when(mockQuestionService.listQuestions()).thenThrow(new ExtensionContextException("Exception"));

        var expectedResponse = new ResponseEntity<>("Exception", HttpStatus.INTERNAL_SERVER_ERROR);

        var actualResponse = questionResource.listQuestions();

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void findByIdTest(){
        var mockID = "id";
        var question = Optional.of(mock(Question.class));

        doReturn(question).when(mockQuestionService).findById(mockID);

        var expectedResponse = new ResponseEntity<>(question.get(), HttpStatus.OK);

        var actualResponse = questionResource.findById(mockID);

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void findByIdTest_Empty(){
        var mockID = "id";
        var question = Optional.empty();

        doReturn(question).when(mockQuestionService).findById(mockID);

        var expectedResponse = new ResponseEntity<>(HttpStatus.NO_CONTENT);

        var actualResponse = questionResource.findById(mockID);

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void findByIdTest_Exception(){
        var mockId = "id";

        when(mockQuestionService.findById(mockId)).thenThrow(new ExtensionContextException("Exception"));

        var expectedResponse = new ResponseEntity<>("Exception", HttpStatus.INTERNAL_SERVER_ERROR);

        var actualResponse = questionResource.findById(mockId);

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void createTest(){
        var question = mock(Question.class);
        var questionResponse = mock(Question.class);

        doReturn(questionResponse).when(mockQuestionService).create(question);

        var expectedResponse = new ResponseEntity<>(questionResponse, HttpStatus.CREATED);

        var actualResponse = questionResource.create(question);

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    public void createTest_Exception(){
        var question = mock(Question.class);

        when(mockQuestionService.create(question)).thenThrow(new ExtensionContextException("Exception"));

        var expectedResponse = new ResponseEntity<>("Exception", HttpStatus.INTERNAL_SERVER_ERROR);

        var actualResponse = questionResource.create(question);

        assertEquals(expectedResponse, actualResponse);
    }
}
