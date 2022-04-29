// Packages
import { groupBy } from "lodash/collection";

// Utils
import { clone, isEmpty } from "utils/helpers";
import {
  flattenSquad,
  getAllSelectedPlayersIDs,
} from "utils/buildYourTeamHelper";

// Constants
import {
  POSITION_DEF,
  POSITION_FWD,
  POSITION_GK,
  POSITION_MID,
} from "constants/data/filters";

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
  const allPlayerIds = getAllSelectedPlayersIDs(flattenSquad($squad));

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
  const flatteredSquad = flattenSquad($squad);
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
    updatedPlayersInitial = updatePlayersDataAfterDeselectionClicked({
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
  const flatteredSquad = flattenSquad(squad).filter(
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

// const updatePlayersDataAfterDeselectionClicked = ({
//   playersInitial,
//   player,
//   updatedSquadInfo,
// }) => {
//   const { remainingBudget, clubsCount } = updatedSquadInfo;
//
//   const players = playersInitial.map((p) => {
//     // Only enable card if these conditions met
//     if (
//       p.position === player.position &&
//       p.value <= remainingBudget &&
//       !p.chosen &&
//       /***** If club is not in the team = undefined
//        *  Or If clubs are less than 3
//        *  or If clubs is equal to 3 but club is deselected one
//        */
//       (clubsCount[p.team.name] === undefined ||
//         clubsCount[p.team.name] < 3 ||
//         (clubsCount[p.team.name] === 3 && p.team.name === player.team.name))
//     ) {
//       p.disablePlayerCard = false;
//     }
//
//     return p;
//   });
//
//   // Make currently deselected player also disable in list
//   const playerIndex = players.findIndex((p) => p.id === player.id);
//   if (playerIndex !== -1) {
//     const $player = players[playerIndex];
//     $player.chosen = false;
//     $player.disablePlayerCard = true;
//   }
//
//   return players;
// };

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

  const updatedPlayersInitial = updatePlayersDataAfterDeselectionClicked({
    playersInitial,
    player,
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
    clubsCount[player.team.name] === 3
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

  // const updatedPlayersInitial = updatePlayersDataAfterSelectionDone({
  //   playersInitial,
  //   player,
  //   updatedSquadInfo,
  // });

  const updatedPlayersInitial = updatePlayersDataAfterDeselectionClicked({
    playersInitial,
    player,
    updatedSquadInfo,
  });

  setTeamInfo({
    ...teamInfo,
    squadInfo: updatedSquadInfo,
    transferInfo: updatedTransferInfo,
    playersInitial: updatedPlayersInitial,
  });
};

const updatePlayersDataAfterDeselectionClicked = ({
  playersInitial,
  player,
  updatedSquadInfo,
}) => {
  const { remainingBudget, clubsCount, squad } = updatedSquadInfo;

  // // Make currently deselected player also disable in list
  // const playerIndex = players.findIndex((p) => p.id === player.id);
  // if (playerIndex !== -1) {
  //   const $player = players[playerIndex];
  //   $player.chosen = false;
  //   $player.disablePlayerCard = true;
  // }

  return playersInitial.map((p) => {
    // Only enable card if these conditions met
    if (
      p.position === player.position &&
      p.value <= remainingBudget &&
      !p.chosen &&
      /***** If club is not in the team = undefined
       *  Or If clubs are less than 3
       *  or If clubs is equal to 3 but club is deselected one
       */
      (clubsCount[p.team.name] === undefined ||
        clubsCount[p.team.name] < 3 ||
        (clubsCount[p.team.name] === 3 && p.team.name === player.team.name))
    ) {
      p.disablePlayerCard = false;
    }

    return p;
  });
};

const updatePlayersDataAfterSelectionDone = ({
  playersInitial,
  player,
  updatedSquadInfo,
}) => {
  const { squad } = updatedSquadInfo;

  const readyToBeTransferredPlayersTeamNames = flattenSquad(squad)
    .map((p) => p.readyToBeTransferOut && p.team.name)
    .filter((p) => !isEmpty(p));

  return playersInitial.map((p) => {
    if (p.id === player.id) {
      p.chosen = true;
    }
    p.disablePlayerCard = !readyToBeTransferredPlayersTeamNames.includes(
      p.team.name
    );

    return p;
  });
};
