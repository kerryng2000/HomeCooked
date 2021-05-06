import axios from "axios"
import { Dispatch } from "redux"
import { SERVER_URL } from "../apiConfig"

interface itemInterface {
    dish: string;
    quantity: number;
}

export const addToCart = (item: itemInterface) => {
    return function(dispatch: Dispatch) {
        axios.post(`${SERVER_URL}/cart`, item, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
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
        axios.get(`${SERVER_URL}/cart`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
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
        axios.put(`${SERVER_URL}/cart/removeItem`, {itemId: itemId}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
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
        axios.put(`${SERVER_URL}/cart/incrementQuantity`, { itemId: itemId }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
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
        axios.put(`${SERVER_URL}/cart/decrementQuantity`, { itemId: itemId }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("jwt")}`
            }
        })
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
