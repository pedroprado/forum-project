import React from 'react';
import PropTypes from 'prop-types';
import styles from './Forms.module.css';

const answerForm = props => {

    return(
        <form
            data-testid='answerFormId'
            onSubmit={event => props.onNewAnswerSubmit(event, props.username, props.questionId)}>
            <p>Quer adicionar uma resposta?</p>
            <textarea
                data-testid='answerChangeId' 
                value={props.newAnswer}
                onChange={event => props.onNewAnswerChange(event.target.value)}
                className={styles.FormsTextArea}
                placeholder="Sua resposta"   
            />
            <input type="submit" value="Enviar"/>
        </form>
    );
}

answerForm.propTypes = {
    questionId: PropTypes.string,
    username: PropTypes.string,
    newAnswer: PropTypes.string,
    onNewAnswerChange: PropTypes.func,
    onNewAnswerSubmit: PropTypes.func
};

export default answerForm;