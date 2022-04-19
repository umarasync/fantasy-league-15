// Utils
import { clone } from "utils/helpers";
import { getAllSelectedPlayersIDs } from "utils/buildYourTeamHelper";

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
  setPickedPlayers,
  // Budget
  remainingBudget,
  setRemainingBudget,
  // Players-Data
  setPlayersData,
  playersDataInitial,
  setPlayersDataInitial,
  // Transfer Window
  freeTransfers,
  setIsOneFreeTransferWindow,
  setTransferInProgress,
  setCurrentTransferredToBePlayer,
  setAdditionalTransferredPlayers,
  setTransferResetDisabled,
  setNoOfFreeTransfersLeft,
  setTransferConfirmDisabled,
  setTransferredPlayers,
  // Footer
  setShowFooterBar,
}) => {
  let playersData = [];
  const $squad = clone(squad);
  setIsOneFreeTransferWindow(true);

  const allPlayerIds = getAllSelectedPlayersIDs($squad);

  playersData = playersDataInitial.map((p) => {
    p.chosen = !!allPlayerIds.includes(p.id);
    p.disablePlayerCard = true;
    p.animateState = false;
    p.readyToBeTransferOut = false;
    return p;
  });

  setPlayersData(playersData);
  setPlayersDataInitial(playersData);
  setPickedPlayers(putSquadUnderPositions($squad));
  setRemainingBudget(remainingBudget);
  setTransferInProgress(false);
  setCurrentTransferredToBePlayer({
    position: null,
    index: null,
  });
  setAdditionalTransferredPlayers(0);
  setNoOfFreeTransfersLeft(freeTransfers);
  setTransferResetDisabled(true);
  setTransferConfirmDisabled(true);
  setTransferredPlayers([]);
  setShowFooterBar(true);
};

const updatePlayersDataAfterTransferDeselectionClicked = ({
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

// Player-Transfer Deselection
export const playerTransferDeselectHandler = ({
  // Position
  position,
  i,
  // Picked-Players
  pickedPlayers,
  setPickedPlayers,
  // Remaining-Budget
  remainingBudget,
  setRemainingBudget,
  // Players-Data-Initial
  playersDataInitial,
  setPlayersDataInitial,
  // Continue=Button
  setContinueDisabled,
}) => {
  const $pickedPlayers = { ...pickedPlayers };

  const player = $pickedPlayers[position][i];

  const $remainingBudget = remainingBudget + player.value;
  setRemainingBudget($remainingBudget);
  setContinueDisabled(true);

  $pickedPlayers[position][i].animateState =
    !$pickedPlayers[position][i].animateState;
  $pickedPlayers[position][i].readyToBeTransferOut = true;

  setPickedPlayers($pickedPlayers);

  setPlayersDataInitial(
    updatePlayersDataAfterTransferDeselectionClicked({
      playersDataInitial,
      player,
      remainingBudget: $remainingBudget,
    })
  );
};

// Player-Transfer Selection
export const playerTransferSelectionHandler = ({
  // Player
  player,
  // Players-Data-Initial
  playersDataInitial,
  setPlayersDataInitial,
  // Picked-Players
  pickedPlayers,
  setPickedPlayers,
  // Remaining-Budget
  remainingBudget,
  setRemainingBudget,
  // Transfer
  setTransferInProgress,
  noOfFreeTransfersLeft,
  setNoOfFreeTransfersLeft,
  additionalTransferredPlayers,
  setAdditionalTransferredPlayers,
  transferredPlayers,
  setTransferredPlayers,
  // Buttons
  setTransferResetDisabled,
  setTransferConfirmDisabled,
}) => {
  const pp = { ...pickedPlayers };
  const position = player.position;

  // readyToBeTransferOut Player
  const toIndex = pp[position].findIndex((p) => p.readyToBeTransferOut);

  setRemainingBudget(remainingBudget - player.value);

  if (noOfFreeTransfersLeft) {
    setNoOfFreeTransfersLeft(noOfFreeTransfersLeft - 1);
  } else {
    setAdditionalTransferredPlayers(additionalTransferredPlayers + 1);
  }

  setTransferredPlayers([
    ...transferredPlayers,
    {
      transferOut: { ...pp[position][toIndex] },
      transferIn: { ...player },
    },
  ]);

  pp[position][toIndex] = {
    ...player,
    animateState: false,
    chosen: true,
  };

  setPickedPlayers(pp);
  setTransferInProgress(false);
  setTransferResetDisabled(false);
  setTransferConfirmDisabled(false);

  setPlayersDataInitial(
    updatePlayersDataAfterTransferSelectionDone({
      playersDataInitial,
      player,
    })
  );
};

const updatePlayersDataAfterTransferSelectionDone = ({
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
