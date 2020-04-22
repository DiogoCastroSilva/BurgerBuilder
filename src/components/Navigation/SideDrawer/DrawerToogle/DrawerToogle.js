import React from 'react';
import classes from './DrawerToogle.module.css';

const DrawerToogle = ({cliked}) => {
    return (
        <div onClick={cliked} className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default DrawerToogle;