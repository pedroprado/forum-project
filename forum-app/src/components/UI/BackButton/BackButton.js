import React from 'react';
import PropTypes from 'prop-types';
import backImg from '../../../assets/images/backimage.png';
import styles from './BackButton.module.css';

const backButton = props => {
    return(
        <div 
            className={styles.BackButton} 
            onClick={() => props.clicked()}
            data-testid='backButtonId'>
             <img src={backImg} alt='BackImg'/>
        </div>
    );
};

backButton.propTypes = {
    clicked: PropTypes.func
};

export default backButton;

