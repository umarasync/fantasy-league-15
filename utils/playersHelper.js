import {nFormatter} from "./helpers";

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