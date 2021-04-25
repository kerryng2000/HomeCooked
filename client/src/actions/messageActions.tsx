import axios from 'axios';
import { Dispatch } from 'redux';

interface MessageInterface {
    reciever: string, 
    sender: string, 
    text: string
}

export const Add = (Mail: MessageInterface, history: any) => {
    return function(dispatch: Dispatch) {
    axios.post("/Message/SendMessage", Mail)
    .then(res => {
        console.log(res.data);
        dispatch({
            type: 'SEND_MESSAGE',
            payload: res.data.message
        }) 
        history.push("/Dish/allDishes");
    })
    }

}