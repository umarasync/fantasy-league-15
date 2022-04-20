// Utils
import { clone } from "utils/helpers";
import {
  flattenSquad,
  getAllSelectedPlayersIDs,
  getClubCount,
} from "utils/buildYourTeamHelper";

// Constants
import {
  POSITION_DEF,
  POSITION_FWD,
  POSITION_GK,
  POSITION_MID,
} from "constants/data/filters";

const putSquadUnderPositions = (squad) => {
  return {
    [POSITION_GK]: squad.filter((p) => p.position === POSITION_GK),
    [POSITION_DEF]: squad.filter((p) => p.position === POSITION_DEF),
    [POSITION_MID]: squad.filter((p) => p.position === POSITION_MID),
    [POSITION_FWD]: squad.filter((p) => p.position === POSITION_FWD),
  };
};

export const initialSettingsForTransferWindows = ({
  squad,
  // Picked Players
  setSquadInfo,
  // Budget
  remainingBudget,
  // Players-Data
  setPlayersData,
  playersDataInitial,
  setPlayersDataInitial,
  // Transfer Info
  freeTransfers,
  transferInfo,
  setTransferInfo,
}) => {
  const $squad = clone(squad);

  const allPlayerIds = getAllSelectedPlayersIDs($squad);

  const playersData = playersDataInitial.map((p) => {
    p.chosen = !!allPlayerIds.includes(p.id);
    p.disablePlayerCard = true;
    p.animateState = false;
    p.readyToBeTransferOut = false;
    return p;
  });

  // Updates squad info
  const updatedSquadInfo = {
    squad: { ...putSquadUnderPositions($squad) },
    clubsCount: getClubCount($squad),
    remainingBudget,
    totalChosenPlayers: 15,
  };

  setSquadInfo(updatedSquadInfo);
  setPlayersData(playersData);
  setPlayersDataInitial(playersData);

  // Update transfer info
  setTransferInfo({
    ...transferInfo,
    transferredPlayers: [],
    isOneFreeTransferWindow: true,
    currentTransferredToBePlayer: {
      position: null,
      index: null,
    },
    additionalTransferredPlayers: 0,
    noOfFreeTransfersLeft: freeTransfers,
    transferInProgress: false,
    transferResetDisabled: true,
    transferConfirmDisabled: true,
  });
};

const updatePlayersDataAfterDeselectionClicked = ({
  playersDataInitial,
  player,
  remainingBudget,
}) => {
  const $players = playersDataInitial.map((p) => {
    if (
      p.position === player.position &&
      p.value <= remainingBudget &&
      !p.chosen
    ) {
      p.disablePlayerCard = false;
    }
    return p;
  });

  // Make currently deselected player also disable in list
  const playerIndex = $players.findIndex((p) => p.id === player.id);

  if (playerIndex !== -1) {
    const $player = $players[playerIndex];
    $player.chosen = false;
    $player.disablePlayerCard = true;
  }

  return $players;
};

// Player transfer deselection
export const playerTransferDeselectHandler = ({
  transferInfo,
  squadInfo,
  setSquadInfo,
  playersDataInitial,
  setPlayersDataInitial,
}) => {
  const squad = { ...squadInfo.squad };
  let { remainingBudget } = squadInfo;

  const position = transferInfo.currentTransferredToBePlayer.position;
  const i = transferInfo.currentTransferredToBePlayer.index;

  const player = squad[position][i];
  const $player = squad[position][i];

  $player.animateState = !$player.animateState;
  $player.readyToBeTransferOut = true;

  remainingBudget = remainingBudget + player.value;

  // Updates squad info

  setSquadInfo({
    ...squadInfo,
    squad: { ...squad },
    clubsCount: getClubCount(flattenSquad(squad)),
    remainingBudget: remainingBudget,
  });

  const input = {
    playersDataInitial,
    player,
    remainingBudget: remainingBudget,
  };
  setPlayersDataInitial(updatePlayersDataAfterDeselectionClicked(input));
};

// Player-Transfer Selection
export const playerTransferSelectionHandler = ({
  player,
  // Transfer Info
  transferInfo,
  setTransferInfo,
  // Players-Data
  playersDataInitial,
  setPlayersDataInitial,
  // Squad info
  squadInfo,
  setSquadInfo,
}) => {
  const squad = { ...squadInfo.squad };

  const { clubsCount } = squadInfo;

  if (clubsCount[player.team.name] === 3) return;

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
    animateState: false,
    chosen: true,
  };

  // Update squad info
  setSquadInfo({
    ...squadInfo,
    squad: { ...squad },
    clubsCount: getClubCount(flattenSquad(squad)),
    remainingBudget: remainingBudget,
  });

  // Update transfer info
  setTransferInfo({
    ...transferInfo,
    ...obj,
    transferredPlayers: updatedTransferredPlayers,
    transferInProgress: false,
    transferResetDisabled: false,
    transferConfirmDisabled: false,
  });

  const input = {
    playersDataInitial,
    player,
  };
  setPlayersDataInitial(updatePlayersDataAfterSelectionDone(input));
};

const updatePlayersDataAfterSelectionDone = ({
  playersDataInitial,
  player,
}) => {
  return playersDataInitial.map((p) => {
    if (p.id === player.id) {
      p.chosen = true;
    }
    p.disablePlayerCard = true;
    return p;
  });
};
