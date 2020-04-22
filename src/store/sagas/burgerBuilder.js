import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import { setIngredients, fetchIngredientsFailed } from '../actions/index';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('/ingredients.json');
        yield put(setIngredients(response.data))
    } catch(e) {
        yield put(fetchIngredientsFailed());
    }
}