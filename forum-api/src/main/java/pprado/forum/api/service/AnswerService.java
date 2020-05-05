package pprado.forum.api.service;

import org.springframework.stereotype.Service;
import pprado.forum.api.document.Answer;
import pprado.forum.api.repository.AnswerRepository;
import pprado.forum.api.utils.DateUtils;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {

    private AnswerRepository answerRepository;
    private DateUtils dateUtils;

    public AnswerService(AnswerRepository answerRepository,
                         DateUtils dateUtils){
        this.answerRepository = answerRepository;
        this.dateUtils = dateUtils;
    }

    public List<Answer> listAnswers() {
        return answerRepository.findAll();
    }

    public Optional<Answer> findById(final String id) {
        return  answerRepository.findById(id);
    }

    public  List<Answer> findAllByQuestionId(final String questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    public Answer create(final Answer answer) {
        final var answerSaved = new Answer(answer.getText(), answer.getUser(),
                dateUtils.getCurrentLocalDateTime(), answer.getQuestionId());
        return answerRepository.save(answerSaved);
    }

    public void deleteById(final String id) {
        answerRepository.deleteById(id);
    }

}
