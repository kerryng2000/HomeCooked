import axios from 'axios';
import { Dispatch } from 'redux';

interface DishInterface {
    name: string,
    price: string,
    stock: string,
    foodPicture: Blob
}

export const Add = (dish: DishInterface, history: any, imageFormat: string) => {
    return function(dispatch: Dispatch) {
    const formData = new FormData();

    formData.append("name", dish.name);
    formData.append("price", dish.price);
    formData.append("stock", dish.stock);
    formData.append("foodPicture", dish.foodPicture, `.${imageFormat}`);

    axios.post("/Dishes/AddDish", formData)
    .then(res => {
        console.log(res.data);
        dispatch({
            type: 'ADD_DISHES',
            payload: res.data.dish
        }) 
        
        history.push("/dish/allDishes");
    })
    }

}







