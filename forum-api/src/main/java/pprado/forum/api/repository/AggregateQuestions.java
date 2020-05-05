package pprado.forum.api.repository;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import pprado.forum.api.document.Question;

@Service
public class AggregateQuestions {

    private MongoTemplate mongoTemplate;

    public AggregateQuestions(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }

    public void findByIdAndUpdateLikes(String id, boolean increment){
        Query query;
        Update update;
        if(!increment){
            query = new Query(Criteria.where("_id").is(id).and("likes").gt(0));
            update = new Update().inc("likes", -1);

        }else{
            query = new Query(Criteria.where("_id").is(id).and("likes").gte(0));
            update = new Update().inc("likes", 1);
        };
        mongoTemplate.updateFirst(query, update, Question.class);
    }
}
