import { put, delay, call } from 'redux-saga/effects';
import { logoutSucceded, logout, authStart, authSuccess, authFailed, checkAuthTimeOut } from '../actions/index';
import axios from 'axios';

export function* logoutSaga(action) {
    // More testable
    yield call([localStorage, 'removeItem'], 'token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userID');
    yield put(logoutSucceded());
}

export function* checkAuthTimeOutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(logout());
}

export function* authUserSaga(action) {
    yield put(authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };

    let url = action.isSignup ?
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXyYykiJQjUafDFB18wiFqDXo21AdZ6L8' :
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCXyYykiJQjUafDFB18wiFqDXo21AdZ6L8';

    try {
        const response = yield axios.post(url, authData);

        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userID', response.data.localId);

        yield put(authSuccess(response.data.idToken, response.data.localId));
        yield put(checkAuthTimeOut(response.data.expiresIn));
    } catch(e) {
        yield put(authFailed(e.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        put(logout());
    } else {
        const expirationTime = yield new Date(localStorage.getItem('expirationDate'));

        if (expirationTime > new Date()) {
            const userId =  yield localStorage.getItem('userID');
            yield put(authSuccess(token, userId));
            yield put(checkAuthTimeOut((expirationTime.getTime() - new Date().getTime()) / 1000));
        } else {
            put(logout());
        }
        
    }
}