// Packages
import { groupBy } from "lodash/collection";

// Constants
import {
  MOST_TRANSFERRED,
  POSITION_ALL,
  POSITION_DEF,
  POSITION_FWD,
  POSITION_GK,
  POSITION_MID,
  PRICE_FROM_HIGH_TO_LOW,
  PRICE_FROM_LOW_TO_HIGH,
  TOTAL_POINTS,
} from "constants/data/filters";
import { SELECTED_PLAYERS } from "constants/data/players";

// Utils
import { clone, shuffle } from "utils/helpers";

export const initialSettingsForBuildYourTeam = ({
  setPlayersData,
  pickedPlayers,
  players,
  setPlayersDataInitial,
}) => {
  let playersData = [];

  const allPlayerIds = allPlayersIDs(pickedPlayers);
  playersData = players.map((p) => {
    p.chosen = !!allPlayerIds.includes(p.id);
    p.disablePlayerCard = false;
    return p;
  });

  setPlayersData([...playersData]);
  setPlayersDataInitial([...playersData]);
};

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

// Maximum 3 players can be chosen from 1 club
const maxThreePlayersPerClub = (players) => {
  const $players = [];
  const groupByClub = groupBy(players, "team.name");

  for (let key in groupByClub) {
    if (groupByClub.hasOwnProperty(key)) {
      $players.push(...shuffle(groupByClub[key]).slice(0, 3));
    }
  }
  return $players;
};

// 2 GKs, 5 DEFs, 5 MIDs, 3 FWDs
const cutPlayersAccordingToPositionsCount = (players) => {
  return [
    ...players.filter((p) => p.position === POSITION_GK).slice(0, 2),
    ...players.filter((p) => p.position === POSITION_DEF).slice(0, 5),
    ...players.filter((p) => p.position === POSITION_MID).slice(0, 5),
    ...players.filter((p) => p.position === POSITION_FWD).slice(0, 3),
  ];
};

export const getClubCountAfterAutoPickApplied = (clubCount) => {
  const clubs = groupBy(clubCount);
  let $clubsCount = {};
  for (let key in clubs) {
    if (clubs.hasOwnProperty(key)) {
      $clubsCount[key] = clubs[key].length;
    }
  }
  return $clubsCount;
};

export const handleAutoPick = ({ players, totalBudget }) => {
  let remainingBudget = totalBudget;
  let $players = clone(players);

  const max3PlayersPerClub = maxThreePlayersPerClub($players);

  const max3PlayersPerClubIds = cutPlayersAccordingToPositionsCount(
    max3PlayersPerClub
  ).map((p) => p.id);

  let totalChosenPlayers = 0;
  let chosenPlayersWithinBudget = clone(SELECTED_PLAYERS);
  let clubCount = [];
  const $$players = $players.map((p) => {
    if (max3PlayersPerClubIds.includes(p.id) && p.value < remainingBudget) {
      p.chosen = true;
      chosenPlayersWithinBudget[p.position].push(p);
      remainingBudget = remainingBudget - p.value;
      totalChosenPlayers += 1;
      clubCount.push(p.team.name);
      return p;
    }
    return p;
  });

  return {
    chosenPlayersWithinBudget,
    remainingBudget,
    totalChosenPlayers,
    players: $$players,
    clubCount,
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

const updateClubCount = ({
  clubsForWhichPlayersPicked,
  setClubsForWhichPlayersPicked,
  player,
  increase = true,
}) => {
  const teamName = player.team.name;

  if (!clubsForWhichPlayersPicked[teamName]) {
    setClubsForWhichPlayersPicked({
      ...clubsForWhichPlayersPicked,
      [teamName]: 1,
    });
  } else {
    setClubsForWhichPlayersPicked({
      ...clubsForWhichPlayersPicked,
      [teamName]: increase
        ? clubsForWhichPlayersPicked[teamName] + 1
        : clubsForWhichPlayersPicked[teamName] - 1,
    });
  }
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
  // Clubs For Which Players Picked
  clubsForWhichPlayersPicked,
  setClubsForWhichPlayersPicked,
  // Remaining-Budget
  remainingBudget,
  setRemainingBudget,
}) => {
  /*** If total chosen players are 15 or
   * 3 players are chosen per club then don't go further
   ****/
  if (
    totalChosenPlayers === 15 ||
    clubsForWhichPlayersPicked[player.team.name] === 3
  )
    return;

  const $position = player.position;
  const pp = { ...pickedPlayers };
  const pickedPlayersArray = pp[$position];

  if (
    ($position === POSITION_GK && pp[POSITION_GK].length < 2) ||
    ($position === POSITION_FWD && pp[POSITION_FWD].length < 3) ||
    ($position === POSITION_MID && pp[POSITION_MID].length < 5) ||
    ($position === POSITION_DEF && pp[POSITION_DEF].length < 5)
  ) {
    if (
      !pickedPlayersArray.length ||
      (pickedPlayersArray.length > 0 &&
        !pickedPlayersArray.some((p) => p.id === player.id))
    ) {
      setRemainingBudget(remainingBudget - player.value);
      setTotalChosenPlayers(totalChosenPlayers + 1);

      // Adding new player
      pickedPlayersArray.push(player);

      updateClubCount({
        clubsForWhichPlayersPicked,
        setClubsForWhichPlayersPicked,
        player,
      });

      // Update Players Data
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

    updateClubCount({
      clubsForWhichPlayersPicked,
      setClubsForWhichPlayersPicked,
      player,
    });

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

  setPickedPlayers({ ...pp });
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
  // ----
  clubsForWhichPlayersPicked,
  setClubsForWhichPlayersPicked,
}) => {
  const $pickedPlayers = { ...pickedPlayers };

  const player = $pickedPlayers[position][i];

  setRemainingBudget(remainingBudget + player.value);
  setTotalChosenPlayers(totalChosenPlayers - 1);
  $pickedPlayers[position][i] = false;

  setPickedPlayers($pickedPlayers);

  updateClubCount({
    clubsForWhichPlayersPicked,
    setClubsForWhichPlayersPicked,
    player,
    increase: false,
  });

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
    playersDataI = playersDataI.sort((a, b) =>
      a.totalPoints < b.totalPoints ? 1 : -1
    );
  } else if (selectedSortingOption.value === MOST_TRANSFERRED) {
    playersDataI = playersDataI.sort((a, b) =>
      a.most_transferred < b.most_transferred ? 1 : -1
    );
  }

  return playersDataI;
};

export const getAllSelectedPlayersIDs = (squad) => squad.map((p) => p.id);

const allPlayersIDs = (pickedPlayers) =>
  getAllSelectedPlayersIDs([
    ...pickedPlayers[POSITION_GK],
    ...pickedPlayers[POSITION_DEF],
    ...pickedPlayers[POSITION_MID],
    ...pickedPlayers[POSITION_FWD],
  ]);
