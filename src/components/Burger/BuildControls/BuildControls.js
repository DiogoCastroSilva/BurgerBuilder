import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const BuildControls = ({
    ingredientAdded,
    ingredientRemoved,
    disabled,
    price,
    purchasable,
    ordered,
    isAuth
}) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{price.toFixed(2)}</strong></p>
            {controls.map(control => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    add={() => ingredientAdded(control.type)}
                    remove={() => ingredientRemoved(control.type)}
                    disabled={disabled[control.type]} />
            ))}
            <button
                disabled={!purchasable}
                className={classes.OrderButton}
                onClick={ordered}>{isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
        </div>
    );
};

export default BuildControls;