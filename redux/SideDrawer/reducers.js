// Action Creators
import {TOGGLE_SIDE_DRAWER} from "./actionCreators";

const INITIAL_STATE = {
    showSideDrawer: false
}

function sideDrawerReducer(state = INITIAL_STATE, action) {
    switch (action.type){
        case TOGGLE_SIDE_DRAWER:
            return {
                ...state,
                showSideDrawer: !state.showSideDrawer
            };
        default:
            return {
                ...state
            }
    }
}

export default sideDrawerReducer