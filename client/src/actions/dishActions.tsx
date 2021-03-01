import axios from 'axios';
import { Dispatch } from 'redux';

interface DishInterface {
    name: String,
    price: Number,
    chef: String
   
}


export const Add = (dish: DishInterface, history: any) => {
    return function(dispatch: Dispatch) {
    axios.post("/Dishes/AddDish", dish)
    .then(res => {
        console.log(res.data);
        dispatch({
            type: 'ADD_DISHES',
            payload: res.data.dish
        }) 
        history.push("/home");
    })
    }

}







