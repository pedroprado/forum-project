import React from 'react';
import PropTypes from 'prop-types';
import styles from './QuestionBoxItem.module.css';

const questionBoxItem = ({user, answers, text}) =>{
    return(
        <div className={styles.QuestionBoxItem} data-testid='questionBoxItemId'>
            <div data-testid='questionBoxUser'>
                <span style={{fontWeight:'bolder'}}>Usuário:</span> {user}
            </div> <br/>
            <div data-testid='questionBoxAnswers'>
                <span style={{fontWeight:'bolder'}}>Número de respostas:</span> {answers}
            </div> <br/>
            <div className={styles.QuestionBoxParagraph} data-testid='questionBoxText'>
                <span style={{fontWeight:'bolder', marginBottom:'10px'}}>Pergunta:</span><br/>
                {text}
            </div>   
        </div>
    );
};

questionBoxItem.propTypes = {
    user: PropTypes.string,
    answers: PropTypes.number,
    text: PropTypes.string
};

export default questionBoxItem;