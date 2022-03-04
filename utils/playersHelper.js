// Packages
import {v4 as uuidv4} from 'uuid';

import {nFormatter} from "./helpers";

// Players
const getPlayerPosition = (position) => {
  let p = "";
  switch (position) {
    case "FORWARD":
      p = "FWD";
      break;
    case "DEFENDER":
      p = "DEF";
      break;
    case "MIDFIELDER":
      p = "MID";
      break;
    case "GOALKEEPER":
      p = "GK";
      break;
  }
  return p;
};

export const buildPlayers = (playersData) => {
  return playersData.map((p, i) => {
            return {
                  id: p.id,
                  image: p.photo,
                  clubImage: p.team.logo,
                  clubName: p.team.name,
                  status: p.state ? p.state : "fit", // Currently checking due to data sync gaps
                  name: p.matchName,
                  price: parseInt(p.value),
                  formattedPrice: nFormatter(p.value),
                  position: getPlayerPosition(p.position),
                  points: p.totalPoints,
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