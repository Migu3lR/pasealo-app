import { PubSub } from "aws-amplify";

import {
    AUTH_VALIDATION,
    LOGGED_IN_STATUS_CHANGED,
    LOGIN_USER,
    LOGIN_USER_FAILED,
    LOGIN_USER_SUCCESS,
    LOGOUT,
} from './types';

export function isAuthenticated(bool) {
    return {
        type: LOGIN_USER_SUCCESS,
        isAuthenticated: bool
    };
}

export function isAuthenticating(bool) {
    return {
        type: LOGIN_USER,
        isAuthenticating: bool
    };
}

export function authValidation(credentials) {
    return (dispatch) => {
        dispatch(isAuthenticating(true));
        
        PubSub.subscribe(`/redux/${PubSub._pluggables[0].clientId}/authValidated`).subscribe({
            next: (result) => {
                console.log('Auth validation received', result);
                dispatch(isAuthenticated(result.value.validation));
                dispatch(isAuthenticating(false));
            },
            error: error => {
                dispatch(isAuthenticated(false));
                dispatch(isAuthenticating(false));
            },
            close: () => console.log('Done'),
        })

        PubSub.publish('/redux/api/authValidation', {
            action: {
                type: AUTH_VALIDATION,
                credentials,
            },
            cid: PubSub._pluggables[0].clientId
        });
    }
}

export function errorAuthenticating() {
    return (dispatch) => {
        dispatch(isAuthenticated(false));
        dispatch(isAuthenticating(false));
    }
}
