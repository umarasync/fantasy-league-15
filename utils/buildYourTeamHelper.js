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
import { clone, isEmpty, shuffle } from "utils/helpers";

export const initialSettingsForBuildYourTeam = ({
  players,
  teamInfo,
  setTeamInfo,
}) => {
  const { squadInfo } = teamInfo;
  const { squad, clubsCount } = squadInfo;

  const allPlayerIds = getAllSelectedPlayersIDs(flattenSquad(squad));

  let playersData = players.map((p) => {
    p.chosen = !!allPlayerIds.includes(p.id);
    p.disablePlayerCard = false;
    return p;
  });

  playersData = disablePlayersIfClubLimitReached({
    players: playersData,
    clubsCount,
  });

  setTeamInfo({
    ...teamInfo,
    players: [...playersData],
    playersInitial: [...playersData],
  });
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

// Flatten squad into single array
export const flattenSquad = ($squad) => {
  let squad = [];
  for (let key in $squad) {
    if ($squad.hasOwnProperty(key)) {
      squad.push(...$squad[key]);
    }
  }
  return squad.filter((p) => !isEmpty(p));
};

// Group By club names and then count clubs
export const getClubCount = (squad) => {
  const clubs = groupBy(squad, "team.name");
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
  const $$players = $players.map((p) => {
    if (max3PlayersPerClubIds.includes(p.id) && p.value < remainingBudget) {
      p.chosen = true;
      chosenPlayersWithinBudget[p.position].push(p);
      remainingBudget = remainingBudget - p.value;
      totalChosenPlayers += 1;
      return p;
    }
    return p;
  });

  return {
    squad: chosenPlayersWithinBudget,
    remainingBudget,
    totalChosenPlayers,
    players: $$players,
  };
};

const disablePlayersIfClubLimitReached = ({ players, clubsCount }) => {
  if (isEmpty(clubsCount)) return [...players];
  return players.map((p) => {
    p.disablePlayerCard = clubsCount[p.team.name] === 3;
    return p;
  });
};
const updatePlayersDataAfterSelectionOrDeselection = ({
  playersInitial,
  player,
  value,
  squadInfo,
}) => {
  let players = clone(playersInitial);
  const { clubsCount } = squadInfo;
  const playerIndex = players.findIndex((p) => p.id === player.id);
  if (playerIndex !== -1) {
    players[playerIndex].chosen = value;
  }

  players = disablePlayersIfClubLimitReached({ players, clubsCount });

  return players;
};

export const playerSelectionHandler = ({ player, teamInfo, setTeamInfo }) => {
  const { squadInfo, playersInitial } = teamInfo;
  let { remainingBudget, totalChosenPlayers, clubsCount } = squadInfo;
  if (totalChosenPlayers === 15 || clubsCount[player.team.name] === 3) return;

  let updatedPlayersInitial = [];

  const pos = player.position;
  const squad = { ...squadInfo.squad };
  const sp = squad[pos];

  if (
    (pos === POSITION_GK && squad[POSITION_GK].length < 2) ||
    (pos === POSITION_FWD && squad[POSITION_FWD].length < 3) ||
    (pos === POSITION_MID && squad[POSITION_MID].length < 5) ||
    (pos === POSITION_DEF && squad[POSITION_DEF].length < 5)
  ) {
    if (!sp.length || (sp.length > 0 && !sp.some((p) => p.id === player.id))) {
      remainingBudget = remainingBudget - player.value;
      totalChosenPlayers = totalChosenPlayers + 1;
      sp.push(player);
    }
  } else if (!sp.some((p) => p.id === player.id)) {
    const indexOfEmptyPosition = sp.findIndex((x) => x === false);
    if (indexOfEmptyPosition === -1) return;
    sp[indexOfEmptyPosition] = player;

    remainingBudget = remainingBudget - player.value;
    totalChosenPlayers = totalChosenPlayers + 1;
  }

  const updatedSquadInfo = {
    ...teamInfo.squadInfo,
    squad: { ...squad },
    clubsCount: getClubCount(flattenSquad(squad)),
    remainingBudget,
    totalChosenPlayers,
  };

  updatedPlayersInitial = updatePlayersDataAfterSelectionOrDeselection({
    playersInitial,
    player,
    value: true,
    squadInfo: updatedSquadInfo,
  });

  setTeamInfo({
    ...teamInfo,
    squadInfo: updatedSquadInfo,
    playersInitial: updatedPlayersInitial,
  });
};

export const playerDeselectionHandler = ({
  position,
  i,
  teamInfo,
  setTeamInfo,
}) => {
  const { squadInfo, playersInitial } = teamInfo;
  const squad = { ...squadInfo.squad };

  let { remainingBudget, totalChosenPlayers } = squadInfo;

  let updatedPlayersInitial = [];

  const player = squad[position][i];

  remainingBudget = remainingBudget + player.value;
  totalChosenPlayers = totalChosenPlayers - 1;

  squad[position][i] = false;

  const updatedSquadInfo = {
    ...teamInfo.squadInfo,
    squad: { ...squad },
    clubsCount: getClubCount(flattenSquad(squad)),
    remainingBudget,
    totalChosenPlayers,
  };

  updatedPlayersInitial = updatePlayersDataAfterSelectionOrDeselection({
    playersInitial,
    player,
    value: false,
    squadInfo: updatedSquadInfo,
  });

  setTeamInfo({
    ...teamInfo,
    squadInfo: updatedSquadInfo,
    playersInitial: updatedPlayersInitial,
  });
};

export const sortingHandler = ({ players, selectedSortingOption }) => {
  let playersDataI = [...players];

  if (selectedSortingOption.value === PRICE_FROM_HIGH_TO_LOW) {
    playersDataI = playersDataI.sort((a, b) => (a.value < b.value ? 1 : -1));
  } else if (selectedSortingOption.value === PRICE_FROM_LOW_TO_HIGH) {
    playersDataI = playersDataI.sort((a, b) => (a.value > b.value ? 1 : -1));
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
