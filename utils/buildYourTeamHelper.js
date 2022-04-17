// Constants
import {
  MOST_TRANSFERRED, POSITION_ALL,
  POSITION_DEF,
  POSITION_FWD,
  POSITION_GK,
  POSITION_MID,
  PRICE_FROM_HIGH_TO_LOW,
  PRICE_FROM_LOW_TO_HIGH,
  TOTAL_POINTS,
} from "constants/data/filters";
import {ALL_PLAYERS_INDEXES, PLAYERS, SELECTED_PLAYERS} from "constants/data/players";

// Utils
import { clone, shuffle } from "utils/helpers";

export const resetMultiSelectsDataState = (option, data) => {
  const { setSelectedOptions, setOptions } = data;

  let STATE_INITIAL_I = [...data.initialState];

  if (option.fromBackSpace || option.checked) {
    setSelectedOptions([]);
    STATE_INITIAL_I[0].checked = false;
  } else {
    setSelectedOptions([STATE_INITIAL_I[0]]);
  }

  setOptions([...STATE_INITIAL_I]);
};

// Handles multi selections filters
export const handleMultiSelectionDropDowns = (option, data) => {
  if (option.value === data.firstOption) {
    return resetMultiSelectsDataState(option, data);
  }

  const { setSelectedOptions, setOptions } = data;

  let newStateI = [...data.state];

  let firstOption = newStateI[0];

  if (firstOption.checked) {
    firstOption.checked = false;
  }

  let objIndex = newStateI.findIndex((obj) => obj.id === option.id);

  newStateI[objIndex].checked = !newStateI[objIndex].checked;

  const selectedOptions = newStateI.filter((option) => option.checked);

  setSelectedOptions([...selectedOptions]);
  setOptions([...newStateI]);
};

const getAllPlayersIndex = (players) => {
  const ALL_PLAYERS_INDEXES = {
      [POSITION_ALL] : [],
      [POSITION_MID] : [],
      [POSITION_GK] : [],
      [POSITION_DEF] : [],
      [POSITION_FWD] : [],
  }
  return players.reduce(function(a, e, i) {
      ALL_PLAYERS_INDEXES[e.position].push(i);
      return ALL_PLAYERS_INDEXES;
  }, []);
}

export const handleAutoPick = ({
  players,
  // allPlayersObjectIndexes,
  totalBudget,
}) => {
  let remainingBudget = totalBudget;

  let playersI = clone(players);

  const allPlayersObjectIndexes = getAllPlayersIndex(playersI)

  const GKsIndexes = shuffle(allPlayersObjectIndexes[POSITION_GK]);
  const FWDsIndexes = shuffle(allPlayersObjectIndexes[POSITION_FWD]);
  const MIDsIndexes = shuffle(allPlayersObjectIndexes[POSITION_MID]);
  const DEFsIndexes = shuffle(allPlayersObjectIndexes[POSITION_DEF]);

  let chosenGKsIndexes = [];
  for (let i = 0; i < 2; i++) {
    chosenGKsIndexes.push(GKsIndexes[i]);
  }

  let chosenFWDsIndexes = [];
  for (let i = 0; i < 3; i++) {
    chosenFWDsIndexes.push(FWDsIndexes[i]);
  }

  let chosenMIDsIndexes = [];
  for (let i = 0; i < 5; i++) {
    chosenMIDsIndexes.push(MIDsIndexes[i]);
  }

  let chosenDEFsIndexes = [];
  for (let i = 0; i < 5; i++) {
    chosenDEFsIndexes.push(DEFsIndexes[i]);
  }

  let fifteenChosenPlayersIndex = [
    ...chosenGKsIndexes,
    ...chosenFWDsIndexes,
    ...chosenMIDsIndexes,
    ...chosenDEFsIndexes,
  ];

  let shuffledFifteenChosenPlayersIndex = shuffle(
    fifteenChosenPlayersIndex
  ).filter((x) => x !== undefined);

  let chosenPlayersWithinBudget = clone(SELECTED_PLAYERS) ;

  let totalChosenPlayers = 0;

  for (let i = 0; i < shuffledFifteenChosenPlayersIndex.length; i++) {
    let player = playersI[shuffledFifteenChosenPlayersIndex[i]];

    if (player.value < remainingBudget) {

      player.chosen = true;
      chosenPlayersWithinBudget[player.position].push(player);
      remainingBudget = remainingBudget - player.value;
      totalChosenPlayers += 1;

    } else {
      chosenPlayersWithinBudget[player.position].push(false);
    }
  }

  return {
    chosenPlayersWithinBudget,
    remainingBudget,
    totalChosenPlayers,
    players: playersI,
  };
};

const updatePlayersDataAfterSelectionOrDeselection = (
  players,
  player,
  value
) => {
  const $players = clone(players);
  const playerIndex = $players.findIndex((p) => p.id === player.id);
  if (playerIndex !== -1) {
    $players[playerIndex].chosen = value;
  }
  return $players;
};

export const playerSelectionHandler = ({
  // Player
  player,
  // Players-Data-Initial
  playersDataInitial,
  setPlayersDataInitial,
  // Total-Chosen-Players
  totalChosenPlayers,
  setTotalChosenPlayers,
  // Picked-Players
  pickedPlayers,
  setPickedPlayers,
  // Remaining-Budget
  remainingBudget,
  setRemainingBudget,
}) => {
  if (totalChosenPlayers === 15) return;

  const playerPositionI = player.position;

  const pickedPlayersI = { ...pickedPlayers };

  const pickedPlayersArray = pickedPlayersI[playerPositionI];

  if (
    (playerPositionI === POSITION_GK &&
      pickedPlayersI[POSITION_GK].length < 2) ||
    (playerPositionI === POSITION_FWD &&
      pickedPlayersI[POSITION_FWD].length < 3) ||
    (playerPositionI === POSITION_MID &&
      pickedPlayersI[POSITION_MID].length < 5) ||
    (playerPositionI === POSITION_DEF &&
      pickedPlayersI[POSITION_DEF].length < 5)
  ) {
    if (
      pickedPlayersArray.length === 0 ||
      (pickedPlayersArray.length > 0 &&
        !pickedPlayersArray.some((p) => p.id === player.id))
    ) {
      setRemainingBudget(remainingBudget - player.value);
      setTotalChosenPlayers(totalChosenPlayers + 1);
      pickedPlayersArray.push(player);

      setPlayersDataInitial(
        updatePlayersDataAfterSelectionOrDeselection(
          playersDataInitial,
          player,
          true
        )
      );
    }
  } else if (!pickedPlayersArray.some((p) => p.id === player.id)) {
    const indexOfEmptyPosition = pickedPlayersArray.findIndex(
      (x) => x === false
    );

    if (indexOfEmptyPosition === -1) return;

    pickedPlayersArray[indexOfEmptyPosition] = player;

    setRemainingBudget(remainingBudget - player.value);
    setTotalChosenPlayers(totalChosenPlayers + 1);

    setPlayersDataInitial(
      updatePlayersDataAfterSelectionOrDeselection(
        playersDataInitial,
        player,
        true
      )
    );
  }

  setPickedPlayers({ ...pickedPlayersI });
};

export const playerDeselectionHandler = ({
  // Position
  position,
  i,
  // Picked-Players
  pickedPlayers,
  setPickedPlayers,
  // Remaining-Budget
  remainingBudget,
  setRemainingBudget,
  // Total-Chosen-Players
  totalChosenPlayers,
  setTotalChosenPlayers,
  // Players-Data-Initial
  playersDataInitial,
  setPlayersDataInitial,
  // Continue=Button
  setContinueDisabled,
}) => {
  const $pickedPlayers = { ...pickedPlayers };

  const player = $pickedPlayers[position][i];

  setRemainingBudget(remainingBudget + player.value);
  setTotalChosenPlayers(totalChosenPlayers - 1);
  setContinueDisabled(true);
  $pickedPlayers[position][i] = false;

  setPickedPlayers($pickedPlayers);

  setPlayersDataInitial(
    updatePlayersDataAfterSelectionOrDeselection(
      playersDataInitial,
      player,
      false
    )
  );
};

export const sortingHandler = ({ playersData, selectedSortingOption }) => {
  let playersDataI = [...playersData];

  if (selectedSortingOption.value === PRICE_FROM_HIGH_TO_LOW) {
    playersDataI = playersDataI.sort((a, b) => (a.price < b.price ? 1 : -1));
  } else if (selectedSortingOption.value === PRICE_FROM_LOW_TO_HIGH) {
    playersDataI = playersDataI.sort((a, b) => (a.price > b.price ? 1 : -1));
  } else if (selectedSortingOption.value === TOTAL_POINTS) {
    playersDataI = playersDataI.sort((a, b) => (a.totalPoints < b.totalPoints ? 1 : -1));
  } else if (selectedSortingOption.value === MOST_TRANSFERRED) {
    playersDataI = playersDataI.sort((a, b) =>
      a.most_transferred < b.most_transferred ? 1 : -1
    );
  }

  return playersDataI;
};


const getAllSelectedPlayersIDs = (squad) => squad.map(p => p.id)
const calculateRemainingBudget = (squad) => squad.reduce((totalBudget, p) => totalBudget + p.value, 0)

const putSquadUnderPositions = (squad) => {
  return {
    [POSITION_GK]: squad.filter(p => p.position === POSITION_GK),
    [POSITION_DEF]: squad.filter(p => p.position === POSITION_DEF),
    [POSITION_MID]: squad.filter(p => p.position === POSITION_MID),
    [POSITION_FWD]: squad.filter(p => p.position === POSITION_FWD),
  }
}

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
  const $squad = clone(squad)
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
  setNoOfFreeTransfersLeft(freeTransfers)
  setTransferResetDisabled(true);
  setTransferConfirmDisabled(true);
  setTransferredPlayers([]);
  setShowFooterBar(true);
};

const allPlayersIDs = (pickedPlayers) => getAllSelectedPlayersIDs([
    ...pickedPlayers[POSITION_GK],
    ...pickedPlayers[POSITION_DEF],
    ...pickedPlayers[POSITION_MID],
    ...pickedPlayers[POSITION_FWD],
  ]);


export const initialSettingsForBuildYourTeam = ({
  setPlayersData,
  pickedPlayers,
  players,
  setPlayersDataInitial,
  setShowFooterBar,
  setRemainingBudget,
  totalBudget
}) => {
  let playersData = [];

  const allPlayerIds = allPlayersIDs(pickedPlayers)

  playersData = players.map((p) => {
    p.chosen = !!allPlayerIds.includes(p.id);
    p.disablePlayerCard = false;
    return p;
  });
  setPlayersData([...playersData]);
  setPlayersDataInitial([...playersData]);
  setShowFooterBar(true);
  setRemainingBudget(totalBudget)
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

  if(playerIndex !== -1){
    const $player = $players[playerIndex];
    $player.chosen = false;
    $player.disablePlayerCard = true;
  }

  return $players;
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
