import React from 'react';
import PropTypes from 'prop-types';

import LikeButton from '../UI/LikeButton/LikeButton';
import AuthContext from '../../context/AuthContext';
import styles from './QuestionSummaryItem.module.css';

const questionSummaryItem = props => {

    const numberOfLikes = props.likes.filter( like => like.liked).length;
    return (
        <div 
            className={styles.QuestionItem} 
            data-testid="questionSummaryItemId">

            <div 
                data-testid = "questionSummaryItemTextId"
                onClick={() => props.onQuestionSelected(props.id)}
                className={styles.QuestionItemText}>
                <p className={styles.QuestionParagraph}>{props.question}</p>
            </div>
            <div className={styles.QuestionItemAnswers}>
                {props.answers} <br></br>
                <p className={styles.AnswersParagraph}>respostas</p>
            </div>
            <div className={styles.LikeButton}>
                <AuthContext.Consumer>
                    {context => <LikeButton
                        username = {context.username} 
                        items = {props.likes}
                        clicked={props.onLikeQuestionClicked}
                        questionId={props.id}/>}
                </AuthContext.Consumer>
                
            </div >
            <div className={styles.LikeNumberDiv}>
               <p className={styles.LikeNumberText}>{numberOfLikes}</p>
               <p className={styles.LikeNumberText}><span style={{fontSize:'12px'}}>likes</span></p>
            </div>
            
        </div>
    );
};

questionSummaryItem.defaultProps = {
    likes: []
}

questionSummaryItem.propTypes = {
    onQuestionSelected: PropTypes.func,
    onLikeQuestionClicked: PropTypes.func,
    question: PropTypes.string,
    answers: PropTypes.number,
    id: PropTypes.string,
    likes:PropTypes.array
};

export default questionSummaryItem;