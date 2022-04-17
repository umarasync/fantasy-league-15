// Packages
import {v4 as uuidv4} from 'uuid';

// Constants
import {POSITION_ALL, POSITION_DEF, POSITION_FWD, POSITION_GK, POSITION_MID} from "constants/data/filters";

// Players
export const positionAbbr = (position) => {
  let p = "";
  switch (position) {
    case POSITION_FWD:
      p = "FWD";
      break;
    case POSITION_DEF:
      p = "DEF";
      break;
    case POSITION_MID:
      p = "MID";
      break;
    case POSITION_GK:
      p = "GK";
      break;
    case POSITION_ALL:
        p = "ALL";
        break;
  }
  return p;
};

export const buildPlayers = (playersData) => {
  return playersData.map(p => {
            return {
                  ...p,
                  nextMatch: {
                    club: 'GRO',
                    vs: "BEN",
                    matchType: "H",
                  },
                  most_transferred: 2,
                  picked: 12,
                  pickedAsCaptain: 6,
                  recommended: true,
                  penaltyTaker: false,
            };
          })
}

export const mapSquadToPositions = (squad) => {
    return {
        [POSITION_GK]: squad.filter(p => p.position === POSITION_GK),
        [POSITION_FWD]: squad.filter(p => p.position === POSITION_FWD),
        [POSITION_DEF]: squad.filter(p => p.position === POSITION_DEF),
        [POSITION_MID]: squad.filter(p => p.position === POSITION_MID),
    }
}

// Teams
export const ALL_TEAMS = 'All Teams'
export const buildClubs = (teams) => {
    const $teams = teams.map(team => {
        return {
            id: team.id,
            label: team.name,
            value: team.name,
            image: team.logo,
            checked: false
        }
    })

    $teams.unshift({
        id: uuidv4(),
        label: ALL_TEAMS,
        value: ALL_TEAMS,
        checked: true
    })

    return $teams
}

export const buildClubs1 = (teams) => {
    return teams.map((t) => {
        return {
          id: t.id,
          image: {
            name: t.logo,
          },
          heading: {
            title: t.name,
          },
          subHeading: {
            title: t.venue,
          },
        };
    })
}