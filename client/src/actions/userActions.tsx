import axios from 'axios';
import { Dispatch } from 'redux';

interface registerInterface {
    email: string;
    password: string;
}

export const register = (user: registerInterface) => {
    return function(dispatch: Dispatch) {
    axios.post("/users/register", user, { withCredentials: true })
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
    /*axios.get("/users/checkAuth")
    .catch(() => console.log("User is authenticated"))
    .then(err => console.log(err));*/
}

export const signOut = () => {
    /*axios.get("/users/signOut")
    .catch(() => console.log("Signed out"))
    .then(err => console.log(err));*/ 
}