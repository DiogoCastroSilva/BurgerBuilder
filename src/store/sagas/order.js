
import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';
import {
    purchaseBurgerStart, purchaseBurgerSuccess,
    purchaseBurgerFailed, fetchOrdersStart,
    fetchOrdersSuccess, fetchOrdersFailed
} from '../actions/index';

export function* purchaseBurgerSaga(action) {
    yield put(purchaseBurgerStart());
    try {
        const response = yield axios.post(`/orders.json?auth=${action.token}`, action.orderData);
        yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch(e) {
        yield put(purchaseBurgerFailed());
    }
}

export function* fetchOrdersSaga(action) {
    yield put(fetchOrdersStart());
    const queryParams = `auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
    try {
        const response = yield axios.get(`/orders.json?${queryParams}`);
        const fetchOrders = [];
        for (let key in response.data) {
            fetchOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(fetchOrdersSuccess(fetchOrders));
    } catch(e) {
        yield put(fetchOrdersFailed(e));
    }
}