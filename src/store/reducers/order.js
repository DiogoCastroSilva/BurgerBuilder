import { PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILED, PURCHASE_BURGER_START, PURCHASE_INIT, FETCH_ORDERS_START, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILED } from '../actions/actionTypes';
import { updateObject } from '../../shared//utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PURCHASE_INIT:
            return updateObject(state, { purchased: false});
        case PURCHASE_BURGER_START:
            return  updateObject(state, { loading: true });
        case PURCHASE_BURGER_SUCCESS:
            const newOrder = updateObject(action.orderData, { id: action.id });
            return updateObject(state, {
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            });
        case PURCHASE_BURGER_FAILED:
            return updateObject(state, { loading: false });
        case FETCH_ORDERS_START:
            return updateObject(state, { loading: true });
        case FETCH_ORDERS_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loading: false
            });
        case FETCH_ORDERS_FAILED:
            return updateObject(state, { loading: false });
        default:
            return state;
    };
};

export default reducer;