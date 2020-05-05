package pprado.forum.api.service;

import org.springframework.stereotype.Service;
import pprado.forum.api.document.Like;
import pprado.forum.api.repository.AggregateLikes;
import pprado.forum.api.repository.LikeRepository;
import pprado.forum.api.utils.DateUtils;

import java.util.List;

@Service
public class LikeService {

    private LikeRepository likeRepository;
    private AggregateLikes aggregateLikes;
    private DateUtils dateUtils;

    public LikeService(LikeRepository likeRepository,
                       AggregateLikes aggregateLikes,
                       DateUtils dateUtils){
        this.likeRepository = likeRepository;
        this.aggregateLikes = aggregateLikes;
        this.dateUtils = dateUtils;
    }

    public List<Like> listLikes() {
        return likeRepository.findAll();
    }

    public Like create(final Like like) {
        final var likeSave = new Like(like.getItemId(), like.getType(), like.getUser(),
                like.getLiked(),
                dateUtils.getCurrentLocalDateTime());
        return likeRepository.save(likeSave);
    }

    public Long findByIdAndUpdateLikes(String id, Boolean liked) {
        return  aggregateLikes.findByIdAndUpdateLikes(id, liked);
    }
}
