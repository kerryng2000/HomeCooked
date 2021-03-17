import axios from "axios"
import { Dispatch } from "redux"

interface itemInterface {
    dish: string;
    quantity: number;
}

export const addToCart = (item: itemInterface) => {
    return function(dispatch: Dispatch) {
        axios.post("/cart", item)
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
        axios.get("/cart")
        .then(res => {
            console.log(res.data.cart);
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
        axios.put("/cart/removeItem", {itemId: itemId})
        .then(res => {
            console.log(res.data.cart);
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

export const incrementQuantity = (dishId: string) => {
    return function(dispatch: Dispatch) {
        axios.put("/cart/incrementQuantity", { dish: dishId })
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

export const decrementQuantity = (dishId: string) => {
    return function(dispatch: Dispatch) {
        axios.put("/cart/decrementQuantity", { dish: dishId })
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