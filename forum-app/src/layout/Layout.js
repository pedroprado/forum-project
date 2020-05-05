import React from 'react';
import Logo from '../components/UI/Logo/Logo';
import styles from './Layout.module.css';

const layout = (props) => {
    return (
    <>
        <Logo />
        <main className={styles.Content}>
            {props.children}
        </main>
    </>
)};

export default layout;