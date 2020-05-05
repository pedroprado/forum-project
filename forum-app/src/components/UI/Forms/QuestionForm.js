import React from 'react';
import PropTypes from 'prop-types';
import styles from './Forms.module.css';

const questionForm = props => {

    return(
        <form 
            data-testid='questionFormId'
            onSubmit={(event) => props.onNewQuestionSubmit(event, props.username)}>
            <p>Quer fazer um pergunta?</p>
            <textarea 
                data-testid='questionChangeId'
                value={props.newQuestion}
                onChange={event => props.onNewQuestionChange(event.target.value)}
                className={styles.FormsTextArea}
                placeholder="Sua pergunta"   
            />
            <input type="submit" value="Enviar" />
        </form>
    );
}

questionForm.propTypes = {
    newQuestion: PropTypes.string,
    onNewQuestionChange: PropTypes.func,
    onNewQuestionSubmit: PropTypes.func,
    username: PropTypes.string
};

export default questionForm;