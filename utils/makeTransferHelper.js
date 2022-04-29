// Packages
import { groupBy } from "lodash/collection";

// Utils
import { clone, flattenObj } from "utils/helpers";
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
  // Updated squad info
  const updatedSquadInfo = {
    ...teamInfo.squadInfo,
    squad: { ...squad },
    clubsCount: getClubCount(squad),
  };

  // Updated players
  let updatedPlayers = updatePlayersInitialData({
    playersInitial: players,
    updatedSquadInfo,
  });

  // Updated team info
  setTeamInfo({
    ...teamInfo,
    squadInfo: updatedSquadInfo,
    players: [...updatedPlayers],
    playersInitial: [...updatedPlayers],
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

const returnBack = (squadInfo, player) =>
  squadInfo.clubsCount[player.team.name] === MAX_PLAYERS_PER_CLUB;

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

const shouldPlayerCardBeDisabled = ({
  toBeTransferredOutPlayers,
  p,
  updatedSquadInfo,
}) => {
  const { remainingBudget, clubsCount } = updatedSquadInfo;
  const $clubsCount = clubsCount[p.team.name];

  if (
    toBeTransferredOutPlayers.positions.includes(p.position) &&
    !toBeTransferredOutPlayers.ids.includes(p.id) &&
    p.value <= remainingBudget &&
    ($clubsCount === undefined || $clubsCount < MAX_PLAYERS_PER_CLUB)
  ) {
    return false;
  }

  return true;
};

/****
 * 1. Provides all player ids that are chosen
 * 2. Provides required information about players that are ready to be transferred
 * *****/
const getRelevantPlayersData = (squad) => {
  const playersData = {
    allPlayersIds: [],
    toBeTransferredOutPlayers: {
      positions: [],
      teamNames: [],
      ids: [],
    },
  };
  const { allPlayersIds, toBeTransferredOutPlayers } = playersData;
  flattenObj(squad).forEach((p) => {
    allPlayersIds.push(p.id);
    if (p.readyToBeTransferOut) {
      toBeTransferredOutPlayers.positions.push(p.position);
      toBeTransferredOutPlayers.teamNames.push(p.team.name);
      toBeTransferredOutPlayers.ids.push(p.id);
    }
  });

  return playersData;
};

const updatePlayersInitialData = ({ playersInitial, updatedSquadInfo }) => {
  const { allPlayersIds, toBeTransferredOutPlayers } = getRelevantPlayersData(
    updatedSquadInfo.squad
  );

  return playersInitial.map((p) => {
    p.chosen = allPlayersIds.includes(p.id);
    p.toggleAnimation = false;
    p.disablePlayerCard = shouldPlayerCardBeDisabled({
      toBeTransferredOutPlayers,
      p,
      updatedSquadInfo,
    });
    return p;
  });
};
