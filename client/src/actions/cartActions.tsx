import axios from "axios"
import { Dispatch } from "redux"

interface itemInterface {
    dish: string;
    quantity: number;
}

export const addToCart = (item: itemInterface) => {
    return function(dispatch: Dispatch) {
        axios.post(`/cart`, item)
        .then(res => {
            console.log(res.data.cart);
            dispatch({
                type: "ADD_TO_CART",
                payload: res.data.cart
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const getCart = () => {
    return function(dispatch: Dispatch) {
        axios.get(`/cart`)
        .then(res => {
            dispatch({
                type: "GET_CART",
                payload: res.data.cart
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const removeItem = (itemId: string) => {
    return function(dispatch: Dispatch) {
        axios.put(`/cart/removeItem`, {itemId: itemId})
        .then(res => {
            dispatch({
                type: "REMOVE_ITEM",
                payload: res.data.cart
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const incrementQuantity = (itemId: string) => {
    return function(dispatch: Dispatch) {
        axios.put(`/cart/incrementQuantity`, { itemId: itemId })
        .then(res => {
            dispatch({
                type: "INCREMENT_QUANTITY",
                payload: res.data.cart
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
}

export const decrementQuantity = (itemId: string) => {
    return function(dispatch: Dispatch) {
        axios.put(`/cart/decrementQuantity`, { itemId: itemId })
        .then(res => {
            dispatch({
                type: "DECREMENT_QUANTITY",
                payload: res.data.cart
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
}
