import React from 'react';
import PropTypes from 'prop-types';
import likeImage from '../../../assets/images/likeicon.png';
import likeFilled from '../../../assets/images/likeiconfilled.png'
import styles from './LikeButton.module.css';

const likeButton = props => {

    const myLike = () => props.items.filter(item => item.user === props.username);

    const isLiked = () => {
        const likeItem = props.items.filter(item => item.user === props.username);
        if(myLike().length === 0 || myLike()[0] === undefined){
            return false;
        }else{
            return likeItem[0].liked;
        }   
    }

    return(
        <div 
            className={styles.LikeButton} 
            onClick={() => props.clicked(myLike(), props.questionId, props.username)}
            data-testid='likeButtonId'>
             <img
                data-testid='likeButtonImgId'
                src={isLiked()? likeFilled : likeImage} alt='LikeImg'/>
        </div>
    );
};

likeButton.defaultProps = {
    items: []
};

likeButton.propTypes = {
    clicked: PropTypes.func,
    username: PropTypes.string,
    questionId: PropTypes.string,
    items: PropTypes.array

};

export default likeButton;
