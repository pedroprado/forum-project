package pprado.forum.api.model;

import org.springframework.data.annotation.Id;
import pprado.forum.api.document.Like;

import java.util.List;

public class LikesGrouped {

    @Id
    private String itemId;
    private List<Like> likes;

    public LikesGrouped() {}

    public LikesGrouped(final String itemId,
                        final List<Like> likes) {
        this.itemId = itemId;
        this.likes = likes;
    }

    public String getItemId() {
        return itemId;
    }

    public List<Like> getLikes() {
        return likes;
    }
}

