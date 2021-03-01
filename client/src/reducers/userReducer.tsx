interface userInterface {
    isAuthenticated: boolean;
    errorMessage?: string;
    profile?: {
        profilePicture?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
    }
}

const InitialState: userInterface = {
    isAuthenticated: false,
    errorMessage: '',
    profile: {
        profilePicture: '',
        firstName: '',
        lastName: '',
        email: ''
    }
}

export const userReducer = (state = InitialState, action: any): userInterface => {
    switch(action.type) {
        case 'AUTH_REGISTER':
            return {...state, isAuthenticated: true, errorMessage: '', profile: action.payload};
        case 'AUTH_SIGN_IN':
            return {...state, isAuthenticated: true, errorMessage: '', profile: action.payload};
        case 'AUTH_SIGN_OUT':
                return {...state, isAuthenticated: false, errorMessage: '', profile: {
                    profilePicture: '',
                    firstName: '',
                    lastName: '',
                    email: ''
                }};
        case 'UPDATE_PROF_PIC':
            return {...state, profile: {...state.profile, profilePicture: action.payload} }
        case 'AUTH_ERROR':
            return {...state, isAuthenticated: false, errorMessage: action.errorMsg};
        default:
            return state;
    }
}
