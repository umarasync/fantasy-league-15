
export const GET_ALL_TEAMS_SUCCESS = "GET_ALL_TEAMS_SUCCESS";
export const GET_ALL_TEAMS_FAILED = "GET_ALL_TEAMS_FAILED";
export const UPDATE_TEAM_TO_PROFILE_SUCCESS = "UPDATE_TEAM_TO_PROFILE_SUCCESS";
export const UPDATE_TEAM_TO_PROFILE_FAILED = "UPDATE_TEAM_TO_PROFILE_FAILED";
export const RESET_PAGE = "RESET_PAGE";

export const getAllTeamsSuccess = (payload) => {
    return {
        type: GET_ALL_TEAMS_SUCCESS,
        payload
    }
}

export const getAllTeamsFailed = (payload) => {
    return {
        type: GET_ALL_TEAMS_FAILED,
        payload
    }
}

export const updateTeamToProfileSuccess = (payload) => {
    return {
        type: UPDATE_TEAM_TO_PROFILE_SUCCESS,
        payload
    }
}

export const updateTeamToProfileFailed = (payload) => {
    return {
        type: UPDATE_TEAM_TO_PROFILE_FAILED,
        payload
    }
}