import React from 'react';
import PropTypes from 'prop-types';
import QuestionBoxItem from './QuestionBoxItem';
import styles from './QuestionBox.module.css';

const questionBox = ({ user, answers, question}) =>{
    return(
        <div className={styles.QuestionBox} data-testid='questionBoxId'>
            <QuestionBoxItem 
                user={user} 
                answers={answers}
                text={question}/>
        </div>
    );
};

questionBox.propTypes = {
    user: PropTypes.string,
    answers: PropTypes.number,
    question: PropTypes.string
};

export default questionBox;