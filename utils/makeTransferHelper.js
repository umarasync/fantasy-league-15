// Packages
import { groupBy } from "lodash/collection";

// Utils
import { clone, isEmpty, flattenObj } from "utils/helpers";
import { getAllSelectedPlayersIDs } from "utils/buildYourTeamHelper";

// Constants
import {
  POSITION_DEF,
  POSITION_FWD,
  POSITION_GK,
  POSITION_MID,
} from "constants/data/filters";
import { MAX_PLAYERS_PER_CLUB } from "constants/universalConstants";

export const putSquadUnderPositions = (squad) => {
  return {
    [POSITION_GK]: squad.filter((p) => p.position === POSITION_GK),
    [POSITION_DEF]: squad.filter((p) => p.position === POSITION_DEF),
    [POSITION_MID]: squad.filter((p) => p.position === POSITION_MID),
    [POSITION_FWD]: squad.filter((p) => p.position === POSITION_FWD),
  };
};

export const initialSettingsForTransferWindows = ({
  players,
  squad,
  teamInfo,
  setTeamInfo,
  transferInfoInitialState,
  remainingBudget,
}) => {
  const $squad = clone(squad);
  const allPlayerIds = getAllSelectedPlayersIDs(flattenObj($squad));

  const updatedPlayers = players.map((p) => {
    p.chosen = !!allPlayerIds.includes(p.id);
    p.readyToBeTransferOut = false;
    p.toggleAnimation = false;
    p.disablePlayerCard = true;
    return p;
  });

  // Updated squad info
  const updatedSquadInfo = {
    ...teamInfo.squadInfo,
    squad: { ...$squad },
    clubsCount: getClubCount($squad),
    remainingBudget,
  };

  const updatedTransferInfo = {
    ...transferInfoInitialState,
    initialRendered: true,
  };

  setTeamInfo({
    ...teamInfo,
    squadInfo: updatedSquadInfo,
    transferInfo: updatedTransferInfo,
    players: [...updatedPlayers],
    playersInitial: [...updatedPlayers],
  });
};

export const handleTransferWindowOnPlayerDataUpdate = ({
  players,
  squad,
  teamInfo,
  setTeamInfo,
}) => {
  const $squad = clone(squad);
  const flatteredSquad = flattenObj($squad);
  const allPlayerIds = getAllSelectedPlayersIDs(flatteredSquad);

  const updatedPlayers = players.map((p) => {
    p.chosen = !!allPlayerIds.includes(p.id);
    p.readyToBeTransferOut = false;
    p.toggleAnimation = false;
    p.disablePlayerCard = p.id !== readyToBeTransferOutPlayer;
    return p;
  });

  let updatedPlayersInitial = [...updatedPlayers];

  // Updated squad info
  const updatedSquadInfo = {
    ...teamInfo.squadInfo,
    squad: { ...$squad },
    clubsCount: getClubCount($squad),
  };

  /****
   * Check if any player is already selected to be transferred
   * then enable or disable players card according to that
   *****/
  const readyToBeTransferOutPlayer = flatteredSquad.find(
    (p) => p.readyToBeTransferOut
  );

  if (!isEmpty(readyToBeTransferOutPlayer)) {
    updatedPlayersInitial = updatePlayersInitialData({
      playersInitial: updatedPlayers,
      player: readyToBeTransferOutPlayer,
      updatedSquadInfo,
    });
  }

  setTeamInfo({
    ...teamInfo,
    squadInfo: updatedSquadInfo,
    players: [...updatedPlayers],
    playersInitial: [...updatedPlayersInitial],
  });
};

// Group By club names and then count clubs
const getClubCount = (squad) => {
  const flatteredSquad = flattenObj(squad).filter(
    (p) => !p.readyToBeTransferOut
  );

  const clubs = groupBy(flatteredSquad, "team.name");
  let $clubsCount = {};
  for (let key in clubs) {
    if (clubs.hasOwnProperty(key)) {
      $clubsCount[key] = clubs[key].length;
    }
  }

  return $clubsCount;
};

// Player transfer deselection
export const playerTransferDeselectHandler = ({
  teamInfo,
  setTeamInfo,
  player: playerProp,
}) => {
  const { squadInfo, playersInitial } = teamInfo;
  const { position, index } = playerProp;

  const squad = { ...squadInfo.squad };
  let { remainingBudget } = squadInfo;

  const player = squad[position][index];
  const $player = squad[position][index];

  $player.toggleAnimation = !$player.toggleAnimation;
  $player.readyToBeTransferOut = true;

  remainingBudget = remainingBudget + player.value;

  const updatedSquadInfo = {
    ...squadInfo,
    squad: { ...squad },
    clubsCount: getClubCount(squad),
    remainingBudget: remainingBudget,
  };

  const updatedPlayersInitial = updatePlayersInitialData({
    playersInitial,
    updatedSquadInfo,
  });

  setTeamInfo({
    ...teamInfo,
    squadInfo: updatedSquadInfo,
    playersInitial: updatedPlayersInitial,
    transferInfo: {
      ...teamInfo.transferInfo,
      transferResetDisabled: false,
    },
  });
};

// const toBeTransferredOutPlayersHasMaxClubLimit = ({ player, squadInfo }) => {
//   const { clubsCount, squad } = squadInfo;
//
//   const position = toBeTransferredOutPlayers.position;
//   const i = toBeTransferredOutPlayers.index;
//
//   const p = squad[position][i];
//
//   if (clubsCount[player.team.name] === 3 && p.team.name === player.team.name) {
//     return false;
//   }
//
//   return true;
// };

const returnBack = (squadInfo, player) => {
  const { clubsCount } = squadInfo;
  return (
    clubsCount[player.team.name] === MAX_PLAYERS_PER_CLUB
    // &&
    // toBeTransferredOutPlayersHasMaxClubLimit({
    //   player,
    //   squadInfo,
    // })
  );
};
// Player Transfer Selection
export const playerTransferSelectionHandler = ({
  player,
  teamInfo,
  setTeamInfo,
}) => {
  if (returnBack(teamInfo.squadInfo, player)) return;

  const { squadInfo, transferInfo, playersInitial } = teamInfo;

  const squad = { ...squadInfo.squad };
  const position = player.position;
  let { remainingBudget } = squadInfo;
  let {
    noOfFreeTransfersLeft,
    additionalTransferredPlayers,
    transferredPlayers,
  } = transferInfo;

  // readyToBeTransferOut Player
  const toIndex = squad[position].findIndex((p) => p.readyToBeTransferOut);
  remainingBudget = remainingBudget - player.value;

  // Logic regarding noOfFreeTransfersLeft / additionalTransferredPlayers
  let obj = {};
  if (noOfFreeTransfersLeft) {
    obj = { noOfFreeTransfersLeft: noOfFreeTransfersLeft - 1 };
  } else {
    obj = { additionalTransferredPlayers: additionalTransferredPlayers + 1 };
  }

  const updatedTransferredPlayers = [
    ...transferredPlayers,
    {
      transferOut: { ...squad[position][toIndex] },
      transferIn: { ...player },
    },
  ];

  squad[position][toIndex] = {
    ...player,
    toggleAnimation: false,
    chosen: true,
    readyToBeTransferOut: false,
  };

  const updatedSquadInfo = {
    ...squadInfo,
    squad: { ...squad },
    clubsCount: getClubCount(squad),
    remainingBudget: remainingBudget,
  };

  const updatedTransferInfo = {
    ...transferInfo,
    ...obj,
    transferredPlayers: updatedTransferredPlayers,
    transferResetDisabled: false,
    transferConfirmDisabled: false,
  };

  const updatedPlayersInitial = updatePlayersInitialData({
    playersInitial,
    updatedSquadInfo,
  });

  setTeamInfo({
    ...teamInfo,
    squadInfo: updatedSquadInfo,
    transferInfo: updatedTransferInfo,
    playersInitial: updatedPlayersInitial,
  });
};

const updatePlayersInitialData = ({ playersInitial, updatedSquadInfo }) => {
  const { remainingBudget, clubsCount, squad } = updatedSquadInfo;
  const flatteredSquad = flattenObj(squad);
  const playerIds = flattenObj(squad).map((p) => p.id);

  const toBeTransferredOutPlayers = {
    positions: [],
    teamNames: [],
    ids: [],
  };
  flatteredSquad.forEach((p) => {
    if (p.readyToBeTransferOut) {
      toBeTransferredOutPlayers.positions.push(p.position);
      toBeTransferredOutPlayers.teamNames.push(p.team.name);
      toBeTransferredOutPlayers.ids.push(p.id);
    }
  });

  const players = playersInitial.map((p) => {
    // Only enable card if these conditions met
    if (
      toBeTransferredOutPlayers.positions.includes(p.position) &&
      !toBeTransferredOutPlayers.ids.includes(p.id) &&
      p.value <= remainingBudget &&
      /***** If club is not in the team = undefined
       *  Or If clubs are less than 3
       *  or If clubs is equal to 3 but club is deselected one
       */
      (clubsCount[p.team.name] === undefined ||
        clubsCount[p.team.name] < MAX_PLAYERS_PER_CLUB ||
        (clubsCount[p.team.name] === MAX_PLAYERS_PER_CLUB &&
          toBeTransferredOutPlayers.teamNames.includes(p.team.name)))
    ) {
      p.disablePlayerCard = false;
    } else {
      p.disablePlayerCard = true;
    }

    if (playerIds.includes(p.id)) {
      p.chosen = true;
    } else {
      p.chosen = false;
    }

    return p;
  });

  // // Make currently deselected player also disable in list
  // const playerIndex = players.findIndex((p) => p.id === player.id);
  // if (playerIndex !== -1) {
  //   const $player = players[playerIndex];
  //   $player.chosen = false;
  //   $player.disablePlayerCard = true;
  // }

  return players;
};
