import React from 'react';
import { Link } from "react-router-dom";
import styles from './initialPage.module.css';

const InitialPage = () => {
    return (
        <>
            <header className={styles.header}>
                <h1>CinemaHome</h1>
                <div className={styles.buttonContainer}>
                    <Link to="/signin">
                        <button className={styles.button}>Sign Up</button>
                    </Link>
                    <Link to="/login">
                        <button className={styles.button}>Log In</button>
                    </Link>
                </div>
            </header>
            <div className={styles.contentContainer}>
                <img className={styles.backgroundImage} src="https://blog.zegocloud.com/wp-content/uploads/2023/05/watch-movies-together-online.jpg" alt="Full page background image" />
                <div className={styles.textContainer}>
                    <h2>Watch movies</h2>
                    <h2>Meet new people</h2>
                    <h2>Have fun</h2>
                </div>
            </div>
        </>
    );
};

export default InitialPage;
