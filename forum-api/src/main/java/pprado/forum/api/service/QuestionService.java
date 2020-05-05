package pprado.forum.api.service;

import org.springframework.stereotype.Service;
import pprado.forum.api.document.Answer;
import pprado.forum.api.document.Like;
import pprado.forum.api.model.AnswerGrouped;
import pprado.forum.api.document.Question;
import pprado.forum.api.model.LikesGrouped;
import pprado.forum.api.model.QuestionResponse;
import pprado.forum.api.repository.AggregateAnswers;
import pprado.forum.api.repository.AggregateLikes;
import pprado.forum.api.repository.AggregateQuestions;
import pprado.forum.api.repository.QuestionRepository;
import pprado.forum.api.utils.DateUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    private QuestionRepository questionRepository;
    private AggregateAnswers aggregateAnswers;
    private AggregateLikes aggregateLikes;
    private DateUtils dateUtils;

    public QuestionService(QuestionRepository questionRepository,
                           AggregateAnswers aggregateAnswers,
                           AggregateLikes aggregateLikes,
                           DateUtils dateUtils){
        this.questionRepository = questionRepository;
        this.aggregateAnswers = aggregateAnswers;
        this.aggregateLikes = aggregateLikes;
        this.dateUtils = dateUtils;
    }

    public List<QuestionResponse> listQuestions(){
        final var questions = questionRepository.findAll();
        final var groupedAnswers = aggregateAnswers.groupAnswersByQuestionId();
        final var groupedLikes = aggregateLikes.groupLikesByItemIdForType(1);
        final var newQuestionsList = new ArrayList<QuestionResponse>();
        for(var question : questions){
            final var newQuestion = this.getNewQuestion(question, groupedAnswers, groupedLikes);
            newQuestionsList.add(newQuestion);
        }
        return newQuestionsList;
    }

    public Optional<Question> findById(final String id) {
        return questionRepository.findById(id);
    }

    public Question create(final Question question) {
        final var questionSaved = new Question(question.getText(), question.getUser(),
                 dateUtils.getCurrentLocalDateTime());
        return questionRepository.save(questionSaved);
    }

    public void deleteById(final String id) {
        questionRepository.deleteById(id);
    }


    protected QuestionResponse getNewQuestion(final Question question,
                                              final List<AnswerGrouped> groupedAnswers,
                                              final List<LikesGrouped> groupedLikes) {
        final var questionId = question.getId();
        final var answers = getAnswersByQuestionId(questionId, groupedAnswers);
        final var likes = getLikesByItemId(questionId, groupedLikes);
        return new QuestionResponse(question.getId(), question.getText(),
                question.getUser(), question.getCreationDate(), answers, likes);
    }

    protected List<Answer> getAnswersByQuestionId(final String questionId,
                                                  final List<AnswerGrouped> groupedAnswers){
        return groupedAnswers.stream()
                .filter(answerGrouped -> answerGrouped.getQuestionId().equals(questionId))
                .findFirst()
                .map(answerGrouped -> answerGrouped.getAnswers())
                .orElse(new ArrayList<>());
    }

    protected List<Like> getLikesByItemId(final String itemId,
                                          final List<LikesGrouped> groupedLikes){
        return groupedLikes.stream()
                .filter(likesGrouped -> likesGrouped.getItemId().equals(itemId))
                .findFirst()
                .map(likesGrouped -> likesGrouped.getLikes())
                .orElse(new ArrayList<>());
    }


}
