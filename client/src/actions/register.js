import { PubSub, Auth } from "aws-amplify";
import { push } from 'react-router-redux'
import { isAuthenticated, isAuthenticating } from "./authenticate";

import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    REGISTER_USER,
    REGISTER_CONFIRMATION,
    REGISTER_FORM_UPDATE
} from './types';

export const isLoading = (bool) => ({
    type: REGISTER_USER,
    isLoading: bool
})

export const handleChange = (event) => {
    event.preventDefault();
    return({type: REGISTER_FORM_UPDATE,
    form: {
        [event.target.id]: event.target.value
    }})
}

export const signedUp = (newUser) => ({
    type: REGISTER_USER_SUCCESS,
    newUser
})

export function handleSignup(credentials) {
    return (dispatch) => {
        dispatch(isLoading(true));
        
        PubSub.subscribe(`/redux/${PubSub._pluggables[0].clientId}/SignUp/signedup`).subscribe({
            next: (result) => {
                console.log('Sign Up received', result);
                dispatch(signedUp(result.value));
                dispatch(isLoading(false));
            },
            error: error => {
                dispatch(signedUp(null));
                dispatch(isLoading(false));
            },
            close: () => console.log('Done signedUp'),
        })

        PubSub.publish('/redux/api/signUp', {
            action: {
                type: REGISTER_USER,
                credentials,
            },
            cid: PubSub._pluggables[0].clientId
        });
    }
}

export function handleConfirmation(credentials) {
    return (dispatch) => {
        dispatch(isLoading(true));
        
        PubSub.subscribe(`/redux/${PubSub._pluggables[0].clientId}/SignUp/confirmed`).subscribe({
            next: async (result) => {
                console.log('Confirmation received', result);
                const signIn = await Auth.signIn(credentials.email, credentials.password);
                console.log(signIn)
                dispatch(isAuthenticated(true))
                dispatch(isLoading(false));
                dispatch(push("/"));
            },
            error: error => {
                alert(error);
                dispatch(isLoading(false));
            },
            close: () => console.log('Done Confirmation'),
        })

        PubSub.publish('/redux/api/signUp/confirm', {
            action: {
                type: REGISTER_CONFIRMATION,
                credentials,
            },
            cid: PubSub._pluggables[0].clientId
        });
    }
}


export function errorSignup() {
    return (dispatch) => {
        dispatch(isAuthenticated(false));
        dispatch(isAuthenticating(false));
    }
}
