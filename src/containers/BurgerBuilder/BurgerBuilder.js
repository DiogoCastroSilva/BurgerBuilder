import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import { addIngredient, removeIngredient, getIngredients, purchaseInit } from '../../store/actions/index';
import { setRedirectPath } from '../../store/actions/auth';

export const BurgerBuilder = ({
    // getIngredients,
    // onSetRedirectPath,
    // onInitPurchase,
    // onIngredientAdded,
    // onIngredientRemoved,
    // isAuth,
    history,
    // ingredients,
    // totalPrice,
    // error
}) => {
    const [pusrchasing, setPusrchasing] = useState(false);

    const {ingredients, totalPrice, error, isAuth} = useSelector(state => {
        return {
            isAuth: state.auth.token !== null,
            ...state.burgerBuilder
        }
    });

    const dispatch = useDispatch();
    const onIngredientAdded = name => dispatch(addIngredient(name));
    const onIngredientRemoved = name => dispatch(removeIngredient(name));
    const onGetIngredients = useCallback(() => dispatch(getIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(purchaseInit());
    const onSetRedirectPath = path => dispatch(setRedirectPath(path));

    useEffect(() => {
        onGetIngredients();
    }, [onGetIngredients]);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    };

    const purchaseHandler = () => {
        if (isAuth) {
            setPusrchasing(true);
        } else {
            onSetRedirectPath('/checkout');
            history.push('/auth');
        }
        
    };

    const purchaseCancelHandler = () => {
        setPusrchasing(false);
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        history.push('/checkout');
    };

    const disableInfo = {
        ...ingredients
    };

    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = ingredients ?
            <OrderSummary
                ingredients={ingredients}
                purchaseCancel={purchaseCancelHandler}
                purchaseContinue={purchaseContinueHandler}
                price={totalPrice} /> :
                null;

    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (ingredients) {
        burger = (
            <Fragment>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disableInfo}
                    purchasable={updatePurchaseState(ingredients)}
                    price={totalPrice}
                    ordered={purchaseHandler}
                    isAuth={isAuth} />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Modal show={pusrchasing} modalClose={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Fragment>
    );
}

// const mapStateToProps = state => {
//     return {
//         ingredients: state.burgerBuilder.ingredients,
//         totalPrice: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuth: state.auth.token !== null
//     };
// };


// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded: (name) => dispatch(addIngredient(name)),
//         onIngredientRemoved: (name) => dispatch(removeIngredient(name)),
//         getIngredients: () => dispatch(getIngredients()),
//         onInitPurchase: () => dispatch(purchaseInit()),
//         onSetRedirectPath: (path) => dispatch(setRedirectPath(path))
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
export default withErrorHandler(BurgerBuilder, axios);