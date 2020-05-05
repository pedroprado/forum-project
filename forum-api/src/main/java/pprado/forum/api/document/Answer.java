package pprado.forum.api.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.Objects;

@Document(collection = "Answer")
public class Answer {

    @Id
    private String id;
    private String text;
    private String user;
    private String creationDate;
    @NotNull(message = "QuestionId não pode ser nulo!")
    private String questionId;

    public Answer (){}

    public Answer(final String text,
                  final String user,
                  final String creationDate,
                  final String questionId) {
        this.text = text;
        this.user = user;
        this.creationDate = creationDate;
        this.questionId = questionId;
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

    public String getQuestionId() {
        return questionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Answer answer = (Answer) o;
        return Objects.equals(id, answer.id) &&
                Objects.equals(text, answer.text) &&
                Objects.equals(user, answer.user) &&
                Objects.equals(creationDate, answer.creationDate) &&
                Objects.equals(questionId, answer.questionId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, text, user, creationDate, questionId);
    }
}
