/** Fantasy Team Creation **/
export const SAVE_FANTASY_TEAM_TO_REDUX = "SAVE_FANTASY_TEAM_TO_REDUX";
export const FANTASY_TEAM_CREATION_START = "FANTASY_TEAM_CREATION_START"
export const FANTASY_TEAM_CREATION_SUCCESS = "FANTASY_TEAM_CREATION_SUCCESS"
export const FANTASY_TEAM_CREATION_FAILED = "FANTASY_TEAM_CREATION_FAILED"

export const saveFantasyTeamToRedux = (payload) => {
    return {
        type: SAVE_FANTASY_TEAM_TO_REDUX,
        payload
    }
}

export const fantasyTeamCreationStart = (payload) => {
    return {
        type: FANTASY_TEAM_CREATION_START,
        payload
    }
}

export const fantasyTeamCreationSuccess = (payload) => {
    return {
        type: FANTASY_TEAM_CREATION_SUCCESS,
        payload
    }
}

export const fantasyTeamCreationFailed = (payload) => {
    return {
        type: FANTASY_TEAM_CREATION_FAILED,
        payload
    }
}

// Fantasy-Team-Transfer
export const FANTASY_TEAM_TRANSFER_START = "FANTASY_TEAM_TRANSFER_START"
export const FANTASY_TEAM_TRANSFER_SUCCESS = "FANTASY_TEAM_TRANSFER_SUCCESS"
export const FANTASY_TEAM_TRANSFER_FAILED = "FANTASY_TEAM_TRANSFER_FAILED"

export const fantasyTeamTransferStart = (payload) => {
    return {
        type: FANTASY_TEAM_TRANSFER_START,
        payload
    }
}

export const fantasyTeamTransferSuccess = (payload) => {
    return {
        type: FANTASY_TEAM_TRANSFER_SUCCESS,
        payload
    }
}

export const fantasyTeamTransferFailed = (payload) => {
    return {
        type: FANTASY_TEAM_TRANSFER_FAILED,
        payload
    }
}