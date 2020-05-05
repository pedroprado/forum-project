package pprado.forum.api.service;

import org.junit.jupiter.api.Test;
import pprado.forum.api.model.AnswerGrouped;
import pprado.forum.api.document.Question;
import pprado.forum.api.model.QuestionResponse;
import pprado.forum.api.repository.AggregateAnswers;
import pprado.forum.api.repository.AggregateLikes;
import pprado.forum.api.repository.QuestionRepository;
import pprado.forum.api.utils.DateUtils;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class QuestionServiceTest {

    private QuestionRepository questionRepository = mock(QuestionRepository.class);
    private AggregateAnswers aggregateAnswers = mock(AggregateAnswers.class);
    private AggregateLikes aggregateLikes = mock(AggregateLikes.class);
    private DateUtils dateUtils = mock(DateUtils.class);

    private QuestionService questionService = spy( new QuestionService(questionRepository,
            aggregateAnswers, aggregateLikes, dateUtils));

    @Test
    public void listQuestionsTest(){
        var question1 = mock(Question.class);
        var question2 = mock(Question.class);
        var questions = Arrays.asList(question1, question2);

        doReturn(questions).when(questionRepository).findAll();

        var groupedAnswers = mock(List.class);
        doReturn(groupedAnswers).when(aggregateAnswers).groupAnswersByQuestionId();

        var groupedLikes = mock(List.class);
        doReturn(groupedLikes).when(aggregateLikes).groupLikesByItemIdForType(1);

        var newQuestion1 = mock(QuestionResponse.class);
        var newQuestion2 = mock(QuestionResponse.class);
        doReturn(newQuestion1).when(questionService).getNewQuestion(question1, groupedAnswers, groupedLikes);
        doReturn(newQuestion2).when(questionService).getNewQuestion(question2, groupedAnswers, groupedLikes);

        var expectedQuestions = Arrays.asList(newQuestion1, newQuestion2);
        var actualQuestions = questionService.listQuestions();

        assertEquals(expectedQuestions,actualQuestions);
    }

    @Test
    public void getByIdTest(){
        var question = Optional.of(mock(Question.class));

        doReturn(question).when(questionRepository).findById("id");

        var expected = question;

        var actual = questionService.findById("id");

        assertEquals(expected, actual);
    }

    @Test
    public void createTest(){

        var question = new Question("text", "user", "11-01-2019");
        var questionSaved = mock(Question.class);

        doReturn("11-01-2019").when(dateUtils).getCurrentLocalDateTime();
        doReturn(questionSaved).when(questionRepository).save(question);

        var expectedQuestion = questionSaved;

        var actualQuestion = questionService.create(question);

        assertEquals(expectedQuestion, actualQuestion);
    }

    @Test
    public void getNewQuestionTest(){
        var answers = mock(List.class);
        var likes = mock(List.class);
        var question = new Question("id","text","user", "date");
        var groupedAnswers = mock(List.class);
        var groupedLikes= mock(List.class);

        doReturn(answers).when(questionService).getAnswersByQuestionId(question.getId(),groupedAnswers);
        doReturn(likes).when(questionService).getLikesByItemId(question.getId(), groupedLikes);

        var expectedQuestion =  new QuestionResponse(question.getId(), question.getText(),
                question.getUser(), question.getCreationDate(), answers, likes);;

        var actualQuestion = questionService.getNewQuestion(question, groupedAnswers, groupedLikes);

        assertEquals(expectedQuestion, actualQuestion);
    }

    @Test
    public void getAnswersByQuestionIdTest(){
        var answers1 = mock(List.class);
        var answers2 = mock(List.class);
        var answerResult1 = new AnswerGrouped("id1", answers1);
        var answerResult2 = new AnswerGrouped("id2", answers2);
        var groupedAnswers = Arrays.asList(answerResult1, answerResult2);

        var expectedAnswers = answers1;

        var actualAnswers = questionService.getAnswersByQuestionId("id1", groupedAnswers);

        assertEquals(expectedAnswers, actualAnswers);
    }

    @Test
    public void getAnswersByQuestionIdTest_EmptyReturn(){
        var answers1 = mock(List.class);
        var answers2 = mock(List.class);
        var answerResult1 = new AnswerGrouped("id1", answers1);
        var answerResult2 = new AnswerGrouped("id2", answers2);
        var groupedAnswers = Arrays.asList(answerResult1, answerResult2);

        var actualAnswers = questionService.getAnswersByQuestionId("id3", groupedAnswers);

        assertTrue(actualAnswers.isEmpty());
    }

}
