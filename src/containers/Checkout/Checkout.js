import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = ({history, match, ingredients, purchased}) => {

    const checkoutCancelHandler = () => {
        history.goBack();
    };

    const checkoutContinueHandler = () => {
        history.replace('/checkout/contact-data');
    };

    let summary = <Redirect to="/" />

    if (ingredients) {
        const purchaseRedirect = purchased ? <Redirect to='/' /> : null;
        summary = (
            <div>
                {purchaseRedirect}
                <CheckoutSummary
                    ingredients={ingredients}
                    checkoutCancel={checkoutCancelHandler}
                    checkoutContinue={checkoutContinueHandler} />
                <Route
                    path={match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        );
    }
    return summary;
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);