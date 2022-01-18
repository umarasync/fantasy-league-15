// Player POSITIONS
import {POSITION_DEF, POSITION_FWD, POSITION_GK, POSITION_MID} from "constants/data/filters";

// Utils
import {clone} from "utils/helpers";
const CLICKED_ICON = 'transfer.png'

export const setInitialClickedIcons1 = (pickedPlayersObject) => {

    const $pickedPlayersObject = clone(pickedPlayersObject)

    // Set icon for GKs
    const GKs = $pickedPlayersObject[POSITION_GK].map((player, index) => {

        if(index === $pickedPlayersObject[POSITION_GK].length - 1){
            player.clickedIcon = CLICKED_ICON
        }else{
            player.clickedIcon = false
        }

        return player
    })

    // Set icon for DEFS
    const DEFs = $pickedPlayersObject[POSITION_DEF].map((player, index) => {

        if(index === $pickedPlayersObject[POSITION_DEF].length - 1 || index === $pickedPlayersObject[POSITION_DEF].length - 2){
            player.clickedIcon = CLICKED_ICON
        }else{
            player.clickedIcon = false
        }

        return player
    })

    // Set icon for MIDs
    const MIDs = $pickedPlayersObject[POSITION_MID].map((player, index) => {

        if(index === $pickedPlayersObject[POSITION_MID].length - 1){
            player.clickedIcon = CLICKED_ICON
        }else{
            player.clickedIcon = false
        }

        return player
    })

    // Set icon for FWDs
    const FWDs = $pickedPlayersObject[POSITION_FWD].map((player, index) => {
        player.clickedIcon = false
        return player
    })

    return {
        [POSITION_GK]: GKs,
        [POSITION_DEF]: DEFs,
        [POSITION_MID]: MIDs,
        [POSITION_FWD]: FWDs,
    }
}

export const setInitialClickedIcons = (pickedPlayersObject) => {

    const $pickedPlayersObject = clone(pickedPlayersObject)

    // Set icon for GKs
    const GKs = $pickedPlayersObject[POSITION_GK].map((player, index) => {

        if(index === $pickedPlayersObject[POSITION_GK].length - 1){
            player.clickedIcon = CLICKED_ICON
        }else{
            player.clickedIcon = false
        }

        return player
    })

    // Set icon for DEFS
    const DEFs = $pickedPlayersObject[POSITION_DEF].map((player, index) => {

        if(index === $pickedPlayersObject[POSITION_DEF].length - 1 || index === $pickedPlayersObject[POSITION_DEF].length - 2){
            player.clickedIcon = CLICKED_ICON
        }else{
            player.clickedIcon = false
        }

        return player
    })

    // Set icon for MIDs
    const MIDs = $pickedPlayersObject[POSITION_MID].map((player, index) => {

        if(index === $pickedPlayersObject[POSITION_MID].length - 1){
            player.clickedIcon = CLICKED_ICON
        }else{
            player.clickedIcon = false
        }

        return player
    })

    // Set icon for FWDs
    const FWDs = $pickedPlayersObject[POSITION_FWD].map((player, index) => {
        player.clickedIcon = false
        return player
    })

    return [
        GKs[0],
        DEFs[0],
        DEFs[1],
        DEFs[2],
        MIDs[0],
        MIDs[1],
        MIDs[2],
        MIDs[3],
        FWDs[0],
        FWDs[1],
        FWDs[2],
        GKs[1],
        DEFs[3],
        DEFs[4],
        MIDs[4],
    ]
}