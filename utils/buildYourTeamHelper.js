// Packages
import { groupBy } from "lodash/collection";

// Constants
import {
  POSITION_ALL,
  POSITION_DEF,
  POSITION_FWD,
  POSITION_GK,
  POSITION_MID,
} from "constants/data/filters";
import { SELECTED_PLAYERS } from "constants/data/players";
import {
  MAX_PLAYERS_PER_CLUB,
  TOTAL_DEFENDERS,
  TOTAL_FORWARDS,
  TOTAL_GOALKEEPERS,
  TOTAL_MIDFIELDERS,
} from "constants/universalConstants";

// Utils
import { clone, isEmpty, shuffle, flattenObj } from "utils/helpers";

export const initialSettingsForBuildYourTeam = ({
  players,
  teamInfo,
  setTeamInfo,
}) => {
  let playersData = updatePlayersInitialData({
    playersInitial: players,
    squadInfo: teamInfo.squadInfo,
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
      $players.push(
        ...shuffle(groupByClub[key]).slice(0, MAX_PLAYERS_PER_CLUB)
      );
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

// Group By club names and then count clubs
export const getClubCount = (squad) => {
  const clubs = groupBy(flattenObj(squad), "team.name");
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

const isPositionEmpty = ({ player, squad }) => {
  const pos = player.position;
  if (
    (pos === POSITION_GK && squad[POSITION_GK].length < TOTAL_GOALKEEPERS) ||
    (pos === POSITION_DEF && squad[POSITION_DEF].length < TOTAL_DEFENDERS) ||
    (pos === POSITION_MID && squad[POSITION_MID].length < TOTAL_MIDFIELDERS) ||
    (pos === POSITION_FWD && squad[POSITION_FWD].length < TOTAL_FORWARDS)
  ) {
    return true;
  }
  return false;
};
const shouldPlayerCardBeDisabled = ({ player, squadInfo }) => {
  if (
    squadInfo.clubsCount[player.team.name] === MAX_PLAYERS_PER_CLUB ||
    !isPositionEmpty({ player, squad: squadInfo.squad })
  ) {
    return true;
  }
  return false;
};

const updatePlayersInitialData = ({ playersInitial, squadInfo }) => {
  if (isEmpty(squadInfo.clubsCount)) return [...playersInitial];

  let allPlayersIds = flattenObj(squadInfo.squad).map((p) => p.id);

  return playersInitial.map((p) => {
    p.chosen = allPlayersIds.includes(p.id);
    p.disablePlayerCard = shouldPlayerCardBeDisabled({ player: p, squadInfo });
    return p;
  });
};

export const playerSelectionHandler = ({ player, teamInfo, setTeamInfo }) => {
  const { squadInfo, playersInitial } = teamInfo;
  let { remainingBudget, totalChosenPlayers, clubsCount } = squadInfo;
  if (
    totalChosenPlayers === 15 ||
    clubsCount[player.team.name] === MAX_PLAYERS_PER_CLUB
  )
    return;

  const squad = { ...squadInfo.squad };
  const sp = squad[player.position]; // Squad position

  if (isPositionEmpty({ player, squad })) {
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
    clubsCount: getClubCount(squad),
    remainingBudget,
    totalChosenPlayers,
  };

  let updatedPlayersInitial = updatePlayersInitialData({
    playersInitial,
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

  const player = squad[position][i];

  remainingBudget = remainingBudget + player.value;
  totalChosenPlayers = totalChosenPlayers - 1;

  squad[position][i] = false;

  const updatedSquadInfo = {
    ...teamInfo.squadInfo,
    squad: { ...squad },
    clubsCount: getClubCount(squad),
    remainingBudget,
    totalChosenPlayers,
  };

  let updatedPlayersInitial = updatePlayersInitialData({
    playersInitial,
    squadInfo: updatedSquadInfo,
  });

  setTeamInfo({
    ...teamInfo,
    squadInfo: updatedSquadInfo,
    playersInitial: updatedPlayersInitial,
  });
};

export const getAllSelectedPlayersIDs = (squad) => squad.map((p) => p.id);
