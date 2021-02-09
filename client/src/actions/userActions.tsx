import axios from 'axios';
import userInterface from '../interfaces/userInterface'

export const register = (user: userInterface) => {
    axios.post("/users/register", user)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}