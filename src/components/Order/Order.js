import React from 'react';
import classes from './Order.module.css';

const Order = ({ingredients, price}) => {
    const transformedIngredients = [];
    for (let ingredientName in ingredients) {
        transformedIngredients.push({
            name: ingredientName,
            amount: ingredients[ingredientName]
        });
    }
    const ingredientsOutput = transformedIngredients.map(ingredient => {
        return <span
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        border: '1px solid #ccc',
                        padding: '5px'
                    }}
                    key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(price).toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;