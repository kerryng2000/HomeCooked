interface itemInterface {
    _id: string;
    dish: {
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
}

const InitialState: cartInterface = {
    items: [],
    user: ""
}

export const cartReducer = (state = InitialState, action: any): cartInterface => {
    switch(action.type) {
        case "ADD_TO_CART":
            return {...state, items: action.payload.items, user: action.payload.user};
        case "GET_CART":
            return {...state, items: action.payload.items, user: action.payload.user};
        case "REMOVE_ITEM":
            return {...state, items: action.payload.items};
        default:
            return state;
    }
}