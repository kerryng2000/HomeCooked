import { IonItemSliding } from "@ionic/react";

interface itemInterface {
    _id: string;
    dish: {
        _id: string,
        foodPicture: string;
        name: string;
        price: number;
        stock: number;
        chef: string;
    }
    quantity: number;
}

interface cartInterface {
    items: itemInterface[];
    user: string;
    total: number;
}

const InitialState: cartInterface = {
    items: [],
    user: "",
    total: 0
}

export const cartReducer = (state = InitialState, action: any): cartInterface => {
    switch(action.type) {
        case "ADD_TO_CART":
            return {...state, items: action.payload.items, user: action.payload.user,
                    total: action.payload.items.reduce((acc: number, item: itemInterface) => acc + item.quantity * item.dish.price, 0)};
        case "GET_CART":
            return {...state, items: action.payload.items, user: action.payload.user,
                    total: action.payload.items.reduce((acc: number, item: itemInterface) => acc + item.quantity * item.dish.price, 0)};
        case "REMOVE_ITEM":
            return {...state, items: action.payload.items,
                total: action.payload.items.reduce((acc: number, item: itemInterface) => acc + item.quantity * item.dish.price, 0)};
        case "INCREMENT_QUANTITY":
            return {...state, items: action.payload.items,
                total: action.payload.items.reduce((acc: number, item: itemInterface) => acc + item.quantity * item.dish.price, 0)};
         case "DECREMENT_QUANTITY":
            return {...state, items: action.payload.items,
            total: action.payload.items.reduce((acc: number, item: itemInterface) => acc + item.quantity * item.dish.price, 0)};
        default:
            return state;
    }
}