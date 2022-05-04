// Packages
import { ceil } from "lodash/math";

import {
  GET_PLAYERS_SUCCESS,
  GET_PLAYERS_FAILED,
  RESET_PAGE,
  GET_PLAYERS_NEXT_PAGE,
  GET_PLAYERS_PREVIOUS_PAGE,
  GET_PLAYERS_START,
  GET_PLAYERS_LOADING_OFF,
  CHANGE_CURRENT_PAGE_NUMBER,
} from "./actionsCreators";

function playersReducer(
  state = {
    loadingPlayersGetting: false,
    playersData: null,
    totalPlayers: null,
    totalPages: null,
    // Pagination
    playersPerPage: 30,
    currentPage: 0,
  },
  action
) {
  switch (action.type) {
    // Get Players
    case GET_PLAYERS_START:
      return {
        ...state,
        loadingPlayersGetting: true,
      };
    case GET_PLAYERS_SUCCESS:
      return {
        ...state,
        totalPlayers: action.payload.totalPlayers,
        totalPages: ceil(action.payload.totalPlayers / state.playersPerPage),
        playersData: action.payload.players,
        loadingPlayersGetting: false,
      };
    case GET_PLAYERS_FAILED:
      return {
        ...state,
        loadingPlayersGetting: false,
      };
    case GET_PLAYERS_LOADING_OFF:
      return {
        ...state,
        loadingPlayersGetting: false,
      };
    case RESET_PAGE:
      return {
        playersData: null,
      };
    // Pagination
    case GET_PLAYERS_NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case GET_PLAYERS_PREVIOUS_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    case CHANGE_CURRENT_PAGE_NUMBER:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
}

export default playersReducer;
