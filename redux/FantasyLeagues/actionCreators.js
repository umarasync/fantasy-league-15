/** Fantasy Team Creation **/
export const FANTASY_LEAGUE_CREATION_START = "FANTASY_LEAGUE_CREATION_START";
export const FANTASY_LEAGUE_CREATION_SUCCESS =
  "FANTASY_LEAGUE_CREATION_SUCCESS";
export const FANTASY_LEAGUE_CREATION_FAILED = "FANTASY_LEAGUE_CREATION_FAILED";

export const fantasyLeagueCreationStart = (payload) => {
  return { type: FANTASY_LEAGUE_CREATION_START, payload };
};

export const fantasyLeagueCreationSuccess = (payload) => {
  return { type: FANTASY_LEAGUE_CREATION_SUCCESS, payload };
};

export const fantasyLeagueCreationFailed = (payload) => {
  return { type: FANTASY_LEAGUE_CREATION_FAILED, payload };
};

// Fantasy Team Transfer
export const FANTASY_LEAGUE_JOINED_START = "FANTASY_LEAGUE_JOINED_START";
export const FANTASY_LEAGUE_JOINED_SUCCESS = "FANTASY_LEAGUE_JOINED_SUCCESS";
export const FANTASY_LEAGUE_JOINED_FAILED = "FANTASY_LEAGUE_JOINED_FAILED";

export const fantasyLeaguedJoinedStart = (payload) => {
  return { type: FANTASY_LEAGUE_JOINED_START, payload };
};
export const fantasyTeamTransferSuccess = (payload) => {
  return { type: FANTASY_LEAGUE_JOINED_SUCCESS, payload };
};
export const fantasyTeamTransferFailed = (payload) => {
  return { type: FANTASY_LEAGUE_JOINED_FAILED, payload };
};
