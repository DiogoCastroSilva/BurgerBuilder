import React from 'react';
import classes from './Button.module.css';

const Button = ({children, clicked, type = 'Success', disabled}) => (
    <button
        className={[classes.Button, classes[type]].join(' ')}
        onClick={clicked}
        disabled={disabled}>
            {children}
    </button>
);

export default Button;