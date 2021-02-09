import axios from 'axios';
import userInterface from '../interfaces/userInterface'

export const register = (user: userInterface) => {
    axios.post("/users/register", user, { withCredentials: true })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => console.log(err));
}

export const checkAuth = () => {
    axios.get("/users/checkAuth")
    .catch(() => console.log("User is authenticated"))
    .then(err => console.log(err));
}

export const signOut = () => {
    axios.get("/users/signOut")
    .catch(() => console.log("Signed out"))
    .then(err => console.log(err));
}