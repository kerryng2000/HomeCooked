import axios from 'axios';
import { Dispatch } from 'redux';
import { SERVER_URL } from '../apiConfig';

export interface AuthInterface {
    _id?: string;
    profilePicture?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    favoriteChefs?: any[];
}
interface DishInterface {
    name: string,
    price: string,
    stock: string,
    foodPicture: Blob,
}

export const Add = (dish: DishInterface, history: any, imageFormat: string) => {
    return function(dispatch: Dispatch, getState: any) {
        const formData = new FormData();

        formData.append("name", dish.name);
        formData.append("price", dish.price);
        formData.append("stock", dish.stock);
        formData.append("foodPicture", dish.foodPicture, `.${imageFormat}`);

        axios.post(`${SERVER_URL}/Dishes/AddDish`, formData, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
        .then(res => {
            dispatch({
                type: 'ADD_DISHES',
                payload: res.data.dish
            }) 
            
            history.push("/dish/allDishes");
        })
    }
}

export const setErrorFlag = (flag: boolean, message: String) => {
    return {
        type: 'SET_ERROR_FLAG',
        payload: {
            flag: flag,
            message: message,
        }
    }
}







