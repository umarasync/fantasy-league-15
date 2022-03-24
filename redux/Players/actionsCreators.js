
export const GET_PLAYERS_SUCCESS = "GET_PLAYERS_SUCCESS";
export const GET_PLAYERS_FAILED = "GET_PLAYERS_FAILED";

export const RESET_PAGE = "RESET_PAGE";

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