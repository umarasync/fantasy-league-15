export const TOGGLE_SIDE_DRAWER = "TOGGLE_SIDE_DRAWER"

export const handleToggleSideDrawer = (payload) => {
    return {
        type: TOGGLE_SIDE_DRAWER,
        payload: payload
    }
}