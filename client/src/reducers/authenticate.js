import {
    AUTH_VALIDATION,
    LOGGED_IN_STATUS_CHANGED,
    LOGIN_USER,
    LOGIN_USER_FAILED,
    LOGIN_USER_SUCCESS,
    LOGOUT,
} from './types';

export function isAuthenticated(state = false, action) {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return action.isAuthenticated;
        
        default:
            return state;
    }
}

export function isAuthenticating(state = true, action) {
    switch (action.type) {
        case LOGIN_USER:
            return action.isAuthenticating;
        
        default:
            return state;
    }
}