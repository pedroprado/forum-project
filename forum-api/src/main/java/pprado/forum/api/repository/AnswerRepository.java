package pprado.forum.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pprado.forum.api.document.Answer;

import java.util.List;

public interface AnswerRepository extends MongoRepository<Answer, String> {

    List<Answer> findAll();
    List<Answer> findByQuestionId(String questionId);
}
