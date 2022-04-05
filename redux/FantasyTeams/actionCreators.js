export const FANTASY_TEAM_CHOSEN = "FANTASY_TEAM_CHOSEN";

export const fantasyTeamChosen = (payload) => {
    return {
        type: FANTASY_TEAM_CHOSEN,
        payload
    }
}