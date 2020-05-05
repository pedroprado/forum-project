import React from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../../context/AuthContext';
import QuestionForm from '../UI/Forms/QuestionForm';
import styles from './QuestionArea.module.css';

const questionArea = (props) =>{

    return(
        <AuthContext.Consumer>
            {(context) => <div className={styles.QuestionArea} data-testid='DivQuestionForm'>
               <QuestionForm
                    data-testid='QuestionForm' 
                    newQuestion={props.newQuestion}
                    onNewQuestionChange={props.onNewQuestionChange}
                    onNewQuestionSubmit={props.onNewQuestionSubmit}
                    username={context.username}/>
            </div>
            }
        </AuthContext.Consumer>
    );
};

questionArea.propTypes = {
    newQuestion: PropTypes.string,
    onNewQuestionChange: PropTypes.func,
    onNewQuestionSubmit: PropTypes.func
};

export default questionArea;