import {
    PURCHASE_BURGER_SUCCESS, PURCHASE_BURGER_FAILED,
    PURCHASE_BURGER_START, PURCHASE_INIT, FETCH_ORDERS_START,
    FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILED, PURCHASE_BURGER, 
    FETCH_ORDERS
} from '../actions/actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: PURCHASE_BURGER_SUCCESS,
        id: id,
        orderData: orderData
    };
};

export const purchaseBurgerFailed = (error) => {
    return {
        type: PURCHASE_BURGER_FAILED,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return {
        type: PURCHASE_BURGER,
        orderData: orderData,
        token: token
    };
};

export const purchaseInit = () => {
    return {
        type: PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFailed = (error) => {
    return {
        type: FETCH_ORDERS_FAILED,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: FETCH_ORDERS_START
    };
};

export const fetchOrders = (token, userId) => {
    return {
        type: FETCH_ORDERS,
        token: token,
        userId: userId
    };
};