package pprado.forum.api.repository;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.stereotype.Service;
import pprado.forum.api.document.Answer;
import pprado.forum.api.model.AnswerGrouped;

import java.util.List;

@Service
public class AggregateAnswers {

    private MongoTemplate mongoTemplate;

    public AggregateAnswers(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }

    public List<AnswerGrouped> groupAnswersByQuestionId(){
        TypedAggregation<Answer> answerAggregation = Aggregation.newAggregation(
                Answer.class,
                Aggregation.group("questionId").push("$$ROOT").as("answers"));

        AggregationResults<AnswerGrouped> results = mongoTemplate.aggregate(answerAggregation, AnswerGrouped.class);

        return results.getMappedResults();
    }
}
