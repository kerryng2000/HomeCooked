const DEFAULT_STATE = {
    isAuthenticated: false,
    errorMessage: ''
}

interface userActionInterface {
    type: string;
    payload?: string;
}

const userReducer = (state = DEFAULT_STATE, action: userActionInterface) => {
    switch(action.type) {
        case 'AUTH_REGISTER':
            return {...state, isAuthenticated: true, errorMessage: ''};
        case 'AUTH_ERROR':
            return {...state, isAuthenticated: false, errorMessage: action.payload};
        default:
            return state;
    }
}

export default userReducer;