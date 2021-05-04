interface userInterface {
    isAuthenticated: boolean;
    errorMessage?: string;
    profile?: {
        _id?: string;
        profilePicture?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        favoriteChefs?: any[];
    };
    showError: boolean,
}

const InitialState: userInterface = {
    isAuthenticated: false,
    errorMessage: '',
    profile: {
        _id: '',
        profilePicture: '',
        firstName: '',
        lastName: '',
        email: '',
        favoriteChefs: []
    },
    showError: false,
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
                    email: '',
                    favoriteChefs: []
                }};
        case 'UPDATE_PROF_PIC':
            return {...state, profile: {...state.profile, profilePicture: action.payload.profilePicture} }
        case 'AUTH_ERROR':
            return {...state, isAuthenticated: false, errorMessage: action.errorMsg};
        case 'ADD_FAVORITE':
            return {...state, profile: {...state.profile, favoriteChefs: action.payload}}
        case 'REMOVE_FAVORITE':
            return {...state, profile: {...state.profile, favoriteChefs: action.payload}}
        case "SET_AUTH_ERROR_MESSAGE": {
            return {
                ...state,
                showError: action.payload.flag,
                errorMessage: action.payload.message,
            }
        }
        default:
            return state;
    }
}
