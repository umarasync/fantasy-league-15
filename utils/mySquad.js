// Player POSITIONS
import {POSITION_DEF, POSITION_FWD, POSITION_GK, POSITION_MID} from "constants/data/filters";

// Utils
import {clone} from "utils/helpers";
import {ELEVEN, ZERO} from "../constants/arrayIndexes";
const CLICKED_ICON = 'transfer.png'
export const DIAMOND_UP_GREEN = 'diamond_up_green.png'
export const DIAMOND_DOWN_RED = 'diamond_down_red.png'

export const setInitialClickedIcons = (pickedPlayersObject) => {

    const $pickedPlayersObject = clone(pickedPlayersObject)

    // Set icon for GKs
    const GKs = $pickedPlayersObject[POSITION_GK].map((player, index) => {

        if(index === $pickedPlayersObject[POSITION_GK].length - 1){
            player.clickedIcon = CLICKED_ICON
        }else{
            player.clickedIcon = false
        }

        player.opacity = 1
        player.animationState = true
        return player
    })

    // Set icon for DEFS
    const DEFs = $pickedPlayersObject[POSITION_DEF].map((player, index) => {

        if(index === $pickedPlayersObject[POSITION_DEF].length - 1 || index === $pickedPlayersObject[POSITION_DEF].length - 2){
            player.clickedIcon = CLICKED_ICON
        }else{
            player.clickedIcon = false
        }
        player.opacity = 1
        player.animationState = true

        return player
    })

    // Set icon for MIDs
    const MIDs = $pickedPlayersObject[POSITION_MID].map((player, index) => {

        if(index === $pickedPlayersObject[POSITION_MID].length - 1){
            player.clickedIcon = CLICKED_ICON
        }else{
            player.clickedIcon = false
        }
        player.opacity = 1
        player.animationState = true

        return player
    })

    // Set icon for FWDs
    const FWDs = $pickedPlayersObject[POSITION_FWD].map((player) => {
        player.clickedIcon = false
        player.opacity = 1
        player.animationState = true
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


export const handlePlayerTransfer = ({
    player,
    arrayIndex,
    pickedPlayers
}) => {

    const $pickedPlayers = clone(pickedPlayers)

    if(player.clickedIcon === DIAMOND_DOWN_RED) {

        const replacedPlayerIndex = $pickedPlayers.findIndex(p => p.id === player.id)
        const addedPlayerIndex = $pickedPlayers.findIndex(p => p.latestToBeAdded)

        const replacedPlayer = {
            ...$pickedPlayers[replacedPlayerIndex],
            animationState: !$pickedPlayers[replacedPlayerIndex].animationState,
            alreadyTransferred: true
        }
        const addedPlayer = {
            ...$pickedPlayers[addedPlayerIndex],
            animationState: !$pickedPlayers[addedPlayerIndex].animationState,
            alreadyTransferred: true
        }

        const transferredPlayers = [...$pickedPlayers]

        transferredPlayers[replacedPlayerIndex] = addedPlayer
        transferredPlayers[addedPlayerIndex] = replacedPlayer

        return transferredPlayers.map(p => {
            p.opacity = 1;
            p.disableIconClick = !!p.alreadyTransferred;
            return p
        })

    }

    // For goal keeper transfer
    if(arrayIndex === ELEVEN) {
       return $pickedPlayers.map((p, index) => {
            if(arrayIndex === ELEVEN && [ZERO, ELEVEN].includes(index)){
                if(index === ELEVEN) {
                    p.clickedIcon = DIAMOND_UP_GREEN
                    p.latestToBeAdded = true
                }else {
                    p.clickedIcon = DIAMOND_DOWN_RED
                    p.latestToBeAdded = false
                }
                p.opacity = 1
            }else {
                p.opacity = 0.5
                p.disableIconClick = true
                p.latestToBeAdded = false
            }
            return p
        })
    }else {

        return $pickedPlayers.map((p, index) => {
            if([0, 11, 12, 13, 14].includes(index) && (p.id !== player.id)){
                p.opacity = 0.5
                p.disableIconClick = true
                p.latestToBeAdded = false
            }else {
                if(p.id === player.id) {
                    p.clickedIcon = DIAMOND_UP_GREEN
                    p.latestToBeAdded = true
                }else {
                    p.clickedIcon = DIAMOND_DOWN_RED
                    p.latestToBeAdded = false
                    p.disableIconClick = false
                }
                p.opacity = 1
            }

            return p
        })
    }

}