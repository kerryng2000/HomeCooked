import axios from 'axios';
import { Dispatch } from 'redux';

interface registerInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface signInInterface {
    email: string;
    password: string;
}

export const register = (user: registerInterface, history: any) => {
    return function(dispatch: Dispatch) {
        axios.post(`/users/register`, user)
        .then(res => {
            console.log(res.data);
            dispatch({
                type: 'AUTH_REGISTER',
                payload: res.data.user
            }) 
            history.push("/user/account");
        })
        .catch(err => {
            dispatch(setErrorMessage(true, "Invalid signup information. Please try with another information."));
        });
    }
}

export const signIn = (user: signInInterface, history: any) => {
    return function(dispatch: Dispatch) {
        axios.post(`/users/signIn`, user)
        .then(res => {
            dispatch({
                type: 'AUTH_SIGN_IN',
                payload: res.data.user
            }) 
            history.push("/user/account");
        })
        .catch(err => {
            dispatch(setErrorMessage(true, "Invalid login information. Please make sure your account information."));
        });
    }
}


export const checkAuth = () => {
    return (dispatch: Dispatch) => {
        axios.get(`/users/checkAuth`)
        .then((res) => 
            dispatch({
                type: 'AUTH_SIGN_IN',
                payload: res.data.user
            }))
        .catch(() =>
            dispatch({
                type: 'AUTH_ERROR',
                errorMsg: "Unauthorized"
            }))
    }
}

export const signOut = (history: any) => {
    return (dispatch: Dispatch) => {
        axios.get(`/users/signOut`)
        .then(() => {
            dispatch({
                type: 'AUTH_SIGN_OUT'
            })
            history.push("/user/signIn")
        })
        .catch(err => console.log(err))
    }
}

export const updateProfPic = (file: Blob, format: String) => {
    return (dispatch: Dispatch) => {
        const formData = new FormData();

        formData.append("profilePicture", file, `.${format}`);
                
        axios.put(`/users/updateProfPic`, formData)
        .then((res) => {
            dispatch({
                type: 'UPDATE_PROF_PIC',
                payload: { profilePicture: res.data }
            })
        })
        .catch(err => console.log(err))
    }
}

export const addFavorite = (id: string) => {
    return (dispatch: Dispatch) => {
    axios.post(`/users/addFavorite/${id}`)
    .then(res => {
        dispatch({
            type: 'ADD_FAVORITE',
            payload: res.data.favoriteChefs
        })
    })
    .catch(err => console.log(err))
    }
}

export const removeFavorite = (id: string) => {
    return (dispatch: Dispatch) => {
    axios.post(`/users/removeFavorite/${id}`)
    .then(res => {
        dispatch({
            type: 'REMOVE_FAVORITE',
            payload: res.data.favoriteChefs
        })
    })
    .catch(err => console.log(err))
    }
}

export const setErrorMessage = (flag: boolean, message: String) => {
    return {
        type: 'SET_AUTH_ERROR_MESSAGE',
        payload: {
            flag: flag,
            message: message,
        }
    }
}
