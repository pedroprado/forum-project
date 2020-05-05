package pprado.forum.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pprado.forum.api.document.Question;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {


}
