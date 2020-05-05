package pprado.forum.api.model;

import org.springframework.data.annotation.Id;
import pprado.forum.api.document.Answer;

import java.util.List;

public class AnswerGrouped {

    @Id
    private String questionId;
    private List<Answer> answers;

    public AnswerGrouped() {
    }

    public AnswerGrouped(String questionId, List<Answer> answers) {
        this.questionId = questionId;
        this.answers = answers;
    }

    public String getQuestionId() {
        return questionId;
    }

    public List<Answer> getAnswers() {
        return answers;
    }
}
