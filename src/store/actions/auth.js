import { AUTH_START, AUTH_FAILED, AUTH_SUCCESS, SET_AUTH_REDIRECT, AUTH_INITIATE_LOGOUT, AUTH_LOGOUT, AUTH_CHECK_TIMEOUT, AUTH_USER, AUTH_CHECK_INIT_STATE } from './actionTypes';

export const authStart = () => {
    return {
        type: AUTH_START
    }
};

export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        token: token,
        userId: userId
    }
};

export const authFailed = (error) => {
    return {
        type: AUTH_FAILED,
        error: error
    };
};

export const logoutSucceded = () => {
    return {
        type: AUTH_LOGOUT
    };
};

export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userID');
    return {
        type: AUTH_INITIATE_LOGOUT
    };
};

export const checkAuthTimeOut = (expirationTime) => {
    return {
        type: AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    };
};

export const auth = (email, password, isSignup = false) => {
    // return dispatch => {
    //     dispatch(authStart());
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     };

    //     let url = isSignup ?
    //         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXyYykiJQjUafDFB18wiFqDXo21AdZ6L8' :
    //         'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCXyYykiJQjUafDFB18wiFqDXo21AdZ6L8';

    //     axios.post(url, authData)
    //         .then(resp => {
    //             const expirationDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000);
    //             localStorage.setItem('token', resp.data.idToken);
    //             localStorage.setItem('expirationDate', expirationDate);
    //             localStorage.setItem('userID', resp.data.localId)
    //             dispatch(authSuccess(resp.data.idToken, resp.data.localId));
    //             dispatch(checkAuthTimeOut(resp.data.expiresIn));
    //         })
    //         .catch(e => {
    //             dispatch(authFailed(e.response.data.error));
    //         });
    // };

    return {
        type: AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    };
};

export const setRedirectPath = (path) => {
    return {
        type: SET_AUTH_REDIRECT,
        path: path
    };
};

export const authCheckState = () => {
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         dispatch(logout());
    //     } else {
    //         const expirationTime = new Date(localStorage.getItem('expirationDate'));

    //         if (expirationTime > new Date()) {
    //             const userId =  localStorage.getItem('userID');
    //             dispatch(authSuccess(token, userId));
    //             dispatch(checkAuthTimeOut((expirationTime.getTime() - new Date().getTime()) / 1000));
    //         } else {
    //             dispatch(logout());
    //         }
            
    //     }

    // };

    return {
        type: AUTH_CHECK_INIT_STATE
    };
};