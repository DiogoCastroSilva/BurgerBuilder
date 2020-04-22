import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = ({
    ingredients,
    purchaseCancel,
    purchaseContinue,
    price
}) => {
    const ingredientsSummary = Object.keys(ingredients)
        .map(key => (
            <li key={key}>
                <span style={{'textTransform': 'capitalize'}}>{key}</span>: {ingredients[key]}
            </li>
        ));
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious Burguer with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>TOTAL PRICE: {price.toFixed(2)}</strong></p>
            <p>Continue to checkout</p>
            <Button type='Danger' clicked={purchaseCancel}>CANCEL</Button>
            <Button clicked={purchaseContinue}>CONTINUE</Button>
        </Fragment>
    );
};

export default OrderSummary;