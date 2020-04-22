import reducer from './auth';
import {  AUTH_START, AUTH_FAILED, AUTH_SUCCESS, AUTH_LOGOUT, SET_AUTH_REDIRECT } from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the init state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            isLoading: false,
            redirectPath: '/'
        });
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            isLoading: false,
            redirectPath: '/'
        }, {
            type: AUTH_SUCCESS,
            token: 'some-token',
            userId: 'some-userId'
        })).toEqual({
            token: 'some-token',
            userId: 'some-userId',
            error: null,
            isLoading: false,
            redirectPath: '/'
        });
    });
});