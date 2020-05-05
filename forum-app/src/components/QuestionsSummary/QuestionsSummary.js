import React from 'react';
import PropTypes from 'prop-types';
import QuestionSummaryItem from './QuestionSummaryItem';
import QuestionArea from './QuestionArea';
import styles from  './QuestionsSummary.module.css';

const questionsSummary = props => {
    const questionSummaryItems = props.questions.map( question => {
        return <QuestionSummaryItem 
                onQuestionSelected = {props.onQuestionSelected}
                onLikeQuestionClicked = {props.onLikeQuestionClicked}
                question = {question.text}
                answers = {question.answers.length}
                likes = {question.likes}
                id = {question.id}
                key={question.id}/>;
    });

    return (
        <div className={styles.questionSummary} data-testid='questionsSummaryId'>
            <p>Perguntas</p> 
            {questionSummaryItems}
            <QuestionArea 
                newQuestion={props.newQuestion}
                onNewQuestionChange={props.onNewQuestionChange}
                onNewQuestionSubmit={props.onNewQuestionSubmit} />
        </div>
    );
};

questionsSummary.defaultProps = {
    questions: []
}

questionsSummary.propTypes = {
    onQuestionSelected: PropTypes.func,
    onLikeQuestionClicked: PropTypes.func,
    newQuestion: PropTypes.string,
    onNewQuestionChange: PropTypes.func,
    onNewQuestionSubmit: PropTypes.func,  
    questions: PropTypes.array
};

export default questionsSummary;