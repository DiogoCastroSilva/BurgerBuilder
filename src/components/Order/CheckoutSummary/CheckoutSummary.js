import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = ({ingredients, checkoutCancel, checkoutContinue}) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={ingredients} />
            </div>
            <Button
                type='Danger'
                clicked={checkoutCancel}>CANCEL</Button>
            <Button
                clicked={checkoutContinue}>CONTINUE</Button>
        </div>
    );
};

export default CheckoutSummary;