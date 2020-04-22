import {  AUTH_START, AUTH_FAILED, AUTH_SUCCESS, AUTH_LOGOUT, SET_AUTH_REDIRECT } from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    isLoading: false,
    redirectPath: '/'
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_START:
            return updateObject(state, { error: null, isLoading: true });
        case AUTH_SUCCESS:
            return updateObject(state, {
                    token: action.token,
                    userId: action.userId,
                    error: null,
                    isLoading: false
                }
            );
        case AUTH_FAILED:
            return updateObject(state, { error: action.error, isLoading: false});
        case AUTH_LOGOUT:
            return updateObject(state, { token: null, userId: null });
        case SET_AUTH_REDIRECT:
            return updateObject(state, { redirectPath: action.path });
        default:
            return state;
    }
};

export default reducer;