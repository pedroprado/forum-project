package pprado.forum.api.model;

import pprado.forum.api.document.Answer;
import pprado.forum.api.document.Like;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class QuestionResponse {

    private String id;
    private String text;
    private String user;
    private String creationDate;
    private List<Answer> answers = new ArrayList<>();
    private List<Like> likes = new ArrayList<>();

    public QuestionResponse(final String id,
                            final String text,
                            final String user,
                            final String creationDate,
                            final List<Answer> answers,
                            final List<Like> likes) {
        this.id = id;
        this.text = text;
        this.user = user;
        this.creationDate = creationDate;
        this.answers = answers;
        this.likes = likes;
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

    public List<Answer> getAnswers() {
        return answers;
    }

    public List<Like> getLikes() {
        return likes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuestionResponse that = (QuestionResponse) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(text, that.text) &&
                Objects.equals(user, that.user) &&
                Objects.equals(creationDate, that.creationDate) &&
                Objects.equals(answers, that.answers) &&
                Objects.equals(likes, that.likes);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, text, user, creationDate, answers, likes);
    }
}
