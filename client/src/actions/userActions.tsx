import axios from 'axios';
import { Dispatch } from 'redux';

interface registerInterface {
    email: string;
    password: string;
}

export const register = (user: registerInterface) => {
    return function(dispatch: Dispatch) {
    axios.post("/users/register", user)
    .then(res => {
        console.log(res.data);
        dispatch({
            type: 'AUTH_REGISTER'
        })
    })
    .catch(err => dispatch({
        type: 'AUTH_ERROR',
        payload: 'Email is already in use'
    }));
    }
}

export const checkAuth = () => {
    return (dispatch: Dispatch) => {
        axios.get("/users/checkAuth")
        .then(() => 
            dispatch({
                type: 'AUTH_SIGN_IN'
            }))
        .catch(() =>
            dispatch({
                type: 'AUTH_ERROR',
                payload: "Unauthorized"
            }))
    }
}

export const signOut = () => {
    /*axios.get("/users/signOut")
    .catch(() => console.log("Signed out"))
    .then(err => console.log(err));*/ 
}