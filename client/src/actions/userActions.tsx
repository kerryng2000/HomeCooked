import axios from 'axios';
import { Dispatch } from 'redux';
import { SERVER_URL } from '../apiConfig';

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
        axios.post(`${SERVER_URL}/users/register`, user)
        .then(res => {
            localStorage.setItem("jwt", res.data.token)
            dispatch({
                type: 'AUTH_REGISTER',
                payload: res.data.user
            }) 
            history.push("/user/account");
        })
        .catch(err => {
            dispatch(setErrorMessage(true, "Invalid signup information. Please try with again."));
        });
    }
}

export const signIn = (user: signInInterface, history: any) => {
    return function(dispatch: Dispatch) {
        axios.post(`${SERVER_URL}/users/signIn`, user)
        .then(res => {
            localStorage.setItem("jwt", res.data.token)
            dispatch({
                type: 'AUTH_SIGN_IN',
                payload: res.data.user
            }) 
            history.push("/user/account");
        })
        .catch(err => {
            dispatch(setErrorMessage(true, "Invalid login information. Check your account information."));
        });
    }
}


export const checkAuth = () => {
    return (dispatch: Dispatch) => {
        axios.get(`${SERVER_URL}/users/checkAuth`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        })
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
        axios.get(`${SERVER_URL}/users/signOut`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        .then(() => {
            localStorage.removeItem("jwt");
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
                
        axios.put(`${SERVER_URL}/users/updateProfPic`, formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
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
    axios.post(`${SERVER_URL}/users/addFavorite/${id}`, {}, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    })
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
    axios.post(`${SERVER_URL}/users/removeFavorite/${id}`, {}, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    })
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
