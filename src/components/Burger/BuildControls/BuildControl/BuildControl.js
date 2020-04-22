import React from 'react';
import classes from './BuildControl.module.css';

const BuildControl = ({label, add, remove, disabled}) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{label}</div>
        <button
            className={classes.Less}
            onClick={remove}
            disabled={disabled}>Less</button>
        <button
            className={classes.More}
            onClick={add}>More</button>
    </div>
);

export default BuildControl;