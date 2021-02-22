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
    axios.post("/users/register", user)
    .then(res => {
        console.log(res.data);
        dispatch({
            type: 'AUTH_REGISTER',
            payload: res.data.user
        }) 
        history.push("/home");
    })
    .catch(err => dispatch({
        type: 'AUTH_ERROR',
        errorMsg: 'Email is already in use'
    }));
    }
}

export const signIn = (user: signInInterface, history: any) => {
    return function(dispatch: Dispatch) {
    axios.post("/users/signIn", user)
    .then(res => {
        console.log(res.data);
        dispatch({
            type: 'AUTH_SIGN_IN',
            payload: res.data.user
        }) 
        history.push("/home");
    })
    .catch(err => dispatch({
        type: 'AUTH_ERROR',
        errorMsg: 'Invalid email/password'
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
                errorMsg: "Unauthorized"
            }))
    }
}

export const signOut = () => {
    return (dispatch: Dispatch) => {
        axios.get("/users/signOut")
        .then(() => {
            dispatch({
                type: 'AUTH_SIGN_OUT'
            })
        })
        .catch(err => console.log(err))
    }
}