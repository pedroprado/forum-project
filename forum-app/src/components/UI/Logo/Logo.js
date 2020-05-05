import React from 'react';
import logoImg from '../../../assets/images/forumimage.png';
import styles from './Logo.module.css';

const logo = props => {

    return(
        <div className={styles.Logo} data-testid='logoId'>
            <img src={logoImg} alt='Forum'/>
            <p style={{ fontSize:'20px', fontWeight:'bolder'}}>Fórum</p>
        </div>
    );
};

export default logo;