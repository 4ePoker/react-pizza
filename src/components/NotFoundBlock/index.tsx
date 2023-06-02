import React from 'react';

import styles from './NotFoundBlock.module.scss'
import {Link} from "react-router-dom";

const NotFoundBlock: React.FC = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>😕</span>
                <br/>
                Something went wrong
            </h1>
            <p className={styles.description}>I'm sorry but you entered an incorrect link, <Link className={styles.linkHome} to="/">click here</Link> to return back home</p>
        </div>
    );
};

export default NotFoundBlock;