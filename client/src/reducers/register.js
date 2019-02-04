const initialState = { 
    isLoading: false,
    form: {
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
    },
    newUser: null
}

export const signUp = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state,
                isLoading: action.isLoading
            }
        
        case REGISTER_FORM_UPDATE:
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.form
                }
            }

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                newUser: action.newUser
            }
        
        default:
            return state;
    }
}
