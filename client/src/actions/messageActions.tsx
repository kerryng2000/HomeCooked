import axios from 'axios';
import { Dispatch } from 'redux';
import { SERVER_URL } from '../apiConfig';

interface MessageInterface {
    reciever: string, 
    sender: string, 
    text: string
}

export const Add = (Mail: MessageInterface, history: any) => {
    return function(dispatch: Dispatch) {
    axios.post(`${SERVER_URL}/Message/SendMessage`, Mail)
    .then(res => {
        dispatch({
            type: 'SEND_MESSAGE',
            payload: res.data.message
        }) 
        history.push("/Dish/allDishes");
    })
    }

}
