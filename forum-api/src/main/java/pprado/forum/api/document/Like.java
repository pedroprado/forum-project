package pprado.forum.api.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

@Document(collection = "Like")
public class Like {

    @Id
    private String id;
    @NotNull(message = "ItemId não pode ser nulo! O like precisa estar vinculado à um item!")
    private String itemId;
    private Integer type;  //1 question 2 answer
    private String user;
    private Boolean liked;
    private String creationDate;

    public Like(){}

    public Like(final String itemId,
                final Integer type,
                final String user,
                final Boolean liked,
                final String creationDate) {
        this.itemId = itemId;
        this.type = type;
        this.user = user;
        this.liked = liked;
        this.creationDate = creationDate;
    }

    public String getId() {
        return id;
    }

    public String getItemId() {
        return itemId;
    }

    public Integer getType() {
        return type;
    }

    public String getUser() {
        return user;
    }

    public Boolean getLiked() {
        return liked;
    }

    public String getCreationDate() {
        return creationDate;
    }
}
