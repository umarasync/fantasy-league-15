// Ge Players
export const GET_PLAYERS_START = "GET_PLAYERS_START";
export const GET_PLAYERS_SUCCESS = "GET_PLAYERS_SUCCESS";
export const GET_PLAYERS_FAILED = "GET_PLAYERS_FAILED";
export const GET_PLAYERS_LOADING_OFF = "GET_PLAYERS_LOADING_OFF";

export const RESET_PAGE = "RESET_PAGE";

export const getPlayersStart = (payload) => {
    return {
        type: GET_PLAYERS_START,
        payload
    }
}

export const getPlayersSuccess = (payload) => {
    return {
        type: GET_PLAYERS_SUCCESS,
        payload
    }
}

export const getPlayersFailed = (payload) => {
    return {
        type: GET_PLAYERS_FAILED,
        payload
    }
}

export const getPlayersLoadingOff = (payload) => {
    return {
        type: GET_PLAYERS_LOADING_OFF,
        payload
    }
}

// Pagination
export const GET_PLAYERS_NEXT_PAGE = "GET_PLAYERS_NEXT_PAGE";
export const GET_PLAYERS_PREVIOUS_PAGE = "GET_PLAYERS_PREVIOUS_PAGE";
export const CHANGE_CURRENT_PAGE_NUMBER = "CHANGE_CURRENT_PAGE_NUMBER";

export const getPlayersNextPage = (payload) => {
    return {
        type: GET_PLAYERS_NEXT_PAGE,
        payload
    }
}
export const getPlayersPreviousPage = (payload) => {
    return {
        type: GET_PLAYERS_PREVIOUS_PAGE,
        payload
    }
}

export const changeCurrentPageNumber = (payload) => {
    return {
        type: CHANGE_CURRENT_PAGE_NUMBER,
        payload
    }
}