interface pathInterface {
    tab: string;
}

const InitialState: pathInterface = {
    tab: "home"
}

export const pathReducer = (state = InitialState, action: any): pathInterface => {
    switch(action.type) {
        case "UPDATE_TAB":
            return {...state, tab: action.payload}
        default:
            return state
    }
}