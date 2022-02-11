// Action Creators
import {handleToggleSideDrawer} from "./actionCreators";

export const toggleSideDrawer = () => {
    return (dispatch) => {
        try {
            dispatch(handleToggleSideDrawer())
        }catch (e){}
    }
}