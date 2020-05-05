package pprado.forum.api.repository;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.TypedAggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import pprado.forum.api.document.Answer;
import pprado.forum.api.document.Like;
import pprado.forum.api.document.Question;
import pprado.forum.api.model.AnswerGrouped;
import pprado.forum.api.model.LikesGrouped;

import java.util.List;

@Service
public class AggregateLikes {

    private MongoTemplate mongoTemplate;

    public AggregateLikes(MongoTemplate mongoTemplate){
        this.mongoTemplate = mongoTemplate;
    }

    public List<LikesGrouped> groupLikesByItemIdForType(Integer type){
        //1 questions 2 answers

        TypedAggregation<Like> aggregation = Aggregation.newAggregation(
                Like.class,
                Aggregation.match(Criteria.where("type").is(type)),
                Aggregation.group("itemId").push("$$ROOT").as("likes"));

        AggregationResults<LikesGrouped> results = mongoTemplate.aggregate(aggregation, LikesGrouped.class);

        return results.getMappedResults();
    }

    public long findByIdAndUpdateLikes(String id, Boolean liked){
        Query query  = new Query(Criteria.where("_id").is(id));
        Update update = new Update().set("liked", liked);
        var response = mongoTemplate.updateFirst(query, update, Like.class);
        return response.getMatchedCount();
    }

}
