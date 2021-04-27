import { Dispatch } from "redux"

export const updateTab = (tab: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: "UPDATE_TAB",
            payload: tab
        })
    }
}