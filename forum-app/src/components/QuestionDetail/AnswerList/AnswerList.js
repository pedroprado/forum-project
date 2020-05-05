import React from 'react';
import PropTypes from 'prop-types';
import AnswerItem from './AnswerItem';

const answerList = props =>{
    const answerList = props.answerList.map( answer =>{
        return <AnswerItem 
            text={answer.text} 
            user={answer.user}
            creationDate={answer.creationDate}
            key={answer.id}/>
    } );
    return(
        <div data-testid="answerListId">
            {answerList}
        </div>
    );
};

answerList.defaultProps = {
    answerList: [] 
};

answerList.propTypes = {
    answerList: PropTypes.array
};

export default answerList;