// Constants
import {
    //POSITIONS
    POSITION_MID,
    POSITION_GK,
    POSITION_DEF,
    POSITION_FWD, POSITION_ALL,
} from "constants/data/filters";



// CALCULATIONS for AUTO PICK feature
export const ALL_PLAYERS_INDEXES = {
    [POSITION_ALL] : [],
    [POSITION_MID] : [],
    [POSITION_GK] : [],
    [POSITION_DEF] : [],
    [POSITION_FWD] : [],
}

export const SELECTED_PLAYERS = {
    [POSITION_MID]: [],
    [POSITION_GK]: [],
    [POSITION_DEF]: [],
    [POSITION_FWD]: [],
}
