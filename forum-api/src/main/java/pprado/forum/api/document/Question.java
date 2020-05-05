package pprado.forum.api.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Min;
import javax.validation.constraints.PositiveOrZero;
import java.util.Objects;

@Document(collection = "Question")
public class Question {

    @Id
    private String id;
    private String text;
    private String user;
    private String creationDate;

    public Question(){}

    public Question(final String text,
                    final String user,
                    final String creationDate
                    ) {
        this.text = text;
        this.user = user;
        this.creationDate = creationDate;
    }

    public Question(final String id,
                    final String text,
                    final String user,
                    final String creationDate) {
        this.id = id;
        this.text = text;
        this.user = user;
        this.creationDate = creationDate;
    }

    public String getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public String getUser() {
        return user;
    }

    public String getCreationDate() {
        return creationDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Question question = (Question) o;
        return Objects.equals(id, question.id) &&
                Objects.equals(text, question.text) &&
                Objects.equals(user, question.user) &&
                Objects.equals(creationDate, question.creationDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, text, user, creationDate);
    }
}
