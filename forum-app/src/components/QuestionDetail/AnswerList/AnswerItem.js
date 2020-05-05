import React from 'react';
import PropTypes from 'prop-types';
import { formatLocalDateTime } from './fn';
import styles from './AnswerItem.module.css';

const answerItem = ({text, user, creationDate}) =>{
    

    return(
        <div 
            className={styles.AnswerItem}
            data-testid="answerItemId">
            <div className={styles.AnswerItemText}>
                <span style={{fontWeight:'bolder'}}>Resposta:</span>
                <p data-testid="answerItemTextId" >{text}</p>
            </div>
            <div className={styles.AnswerItemPersonInfo}>
                <p data-testid="answerItemUserId"><span style={{fontWeight:'bolder'}}>Usuário:</span> {user}</p>
                <p data-testid="answerItemCreationDateId"><span style={{fontWeight:'bolder'}}>Data:</span> {formatLocalDateTime(creationDate)}</p>
            </div>  
        </div>
    );
};

answerItem.propTypes = {
    text: PropTypes.string,
    user: PropTypes.string,
    creationDate: PropTypes.string
};

export default answerItem;