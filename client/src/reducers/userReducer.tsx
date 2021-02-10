
const InitialState = {
    isAuthenticated: false,
    errorMessage: ''
}

interface userActionInterface {
    type: string;
    payload?: string;
}

export const userReducer = (state = InitialState, action: userActionInterface) => {
    switch(action.type) {
        case 'AUTH_REGISTER':
            return {...state, isAuthenticated: true, errorMessage: ''};
        case 'AUTH_SIGN_IN':
            return {...state, isAuthenticated: true, errorMessage: ''};
        case 'AUTH_ERROR':
            return {...state, isAuthenticated: false, errorMessage: action.payload};
        default:
            return state;
    }
}
