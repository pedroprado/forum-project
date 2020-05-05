package pprado.forum.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pprado.forum.api.document.Like;

@Repository
public interface LikeRepository extends MongoRepository<Like, String> {
}
