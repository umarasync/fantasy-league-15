// Player POSITIONS
import {POSITION_DEF, POSITION_FWD, POSITION_GK, POSITION_MID} from "constants/data/filters";

// Utils
import {clone} from "utils/helpers";

// Constants
import {ELEVEN, ZERO} from "constants/arrayIndexes";
import {ANIMATE} from "constants/animations";

export const TRANSFER_ICON = '/images/transfer.png'
export const DIAMOND_UP_GREEN = '/images/diamond_up_green.png'
export const DIAMOND_DOWN_RED = '/images/diamond_down_red.png'
export const TOTAL_POINTS = 'Total pts'
export const PRICES = 'Price'
export const MATCHES = 'Matches'
export const CAPTAIN = 'captain'
export const VICE_CAPTAIN = 'viceCaptain'

export const setPlayersAdditionalData = (pickedPlayersObject) => {

    const $pickedPlayersObject = clone(pickedPlayersObject)

    // Set icon for GKs
    const GKs = $pickedPlayersObject[POSITION_GK].map((player, index) => {
        if(index === $pickedPlayersObject[POSITION_GK].length - 1){
            player.clickedIcon = TRANSFER_ICON
        }else{ player.clickedIcon = false }
        return player
    })

    // Set icon for DEFS
    const DEFs = $pickedPlayersObject[POSITION_DEF].map((player, index) => {

        if(index === $pickedPlayersObject[POSITION_DEF].length - 1 || index === $pickedPlayersObject[POSITION_DEF].length - 2){
            player.clickedIcon = TRANSFER_ICON
        }else{
            player.clickedIcon = false
        }

        return player
    })

    // Set icon for MIDs
    const MIDs = $pickedPlayersObject[POSITION_MID].map((player, index) => {

        if(index === $pickedPlayersObject[POSITION_MID].length - 1){
            player.clickedIcon = TRANSFER_ICON
        }else{
            player.clickedIcon = false
        }
        return player
    })

    // Set icon for FWDs
    const FWDs = $pickedPlayersObject[POSITION_FWD].map((player) => {
        player.clickedIcon = false
        return player
    })

    const players = [
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

    return players.map((player, index) => {

        player.isSubstitutePlayer = !!player.clickedIcon;

        player.opacity = 1
        player.animationState = true
        player.activeFilter = TOTAL_POINTS
        player.disableIconClick = false
        player.captain = false
        player.viceCaptain = false

        // making a captain and vice captain, eventually it will come from backend
        if (index === 5) {player.captain = true}
        if(index === 6) {player.viceCaptain = true}

        return player
    })
}

const readyPlayerBeforeTransfer = (p1, p2) => {
    return {
        ...p1,
        animationState: !p1.animationState,
        alreadyTransferred: true,
        captain: p2.captain,
        viceCaptain: p2.viceCaptain,
        isSubstitutePlayer: p2.isSubstitutePlayer
    }
}

export const handlePlayerTransfer = ({
    player,
    arrayIndex,
    pickedPlayers,
    setChangeFormation,
    setTransferInProgress
}) => {

    const pp = clone(pickedPlayers)
    setTransferInProgress(true)

    // Transfer Player
    if(player.clickedIcon === DIAMOND_DOWN_RED) {

        // Replaced-Player-Index
        const rpIndex = pp.findIndex(p => p.id === player.id)
        // Added-Player-Index
        const apIndex = pp.findIndex(p => p.latestToBeAdded)

        const replacedPlayer = readyPlayerBeforeTransfer(pp[rpIndex], pp[apIndex])
        const addedPlayer = readyPlayerBeforeTransfer(pp[apIndex], pp[rpIndex])

        const transferredPlayers = [...pp]

        transferredPlayers[rpIndex] = addedPlayer
        transferredPlayers[apIndex] = replacedPlayer

        if([4,5,6,7,8,9,10].includes(arrayIndex)) { setChangeFormation(ANIMATE) }

        return transferredPlayers.map((p, index) => {
            p.opacity = 1;
            p.disableIconClick = !!p.alreadyTransferred;

            if(!p.alreadyTransferred && ![11,12,13,14].includes(index)) {
                p.clickedIcon = false
            }

            return p
        })
    }

    // For goal keeper transfer
    if(arrayIndex === ELEVEN) {
       return pp.map((p, index) => {
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
        // For other players transfer
        return pp.map((p, index) => {
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
                    p.alreadyTransferred = false
                    p.animationState = true
                }
                p.opacity = 1
            }

            return p
        })
    }
}

export const resetPlayers = ({players, activeFilter}) => {
    return players.map((player, index) => {

        if([11,12,13,14].includes(index)) {
            player.clickedIcon = TRANSFER_ICON
            player.isSubstitutePlayer = true
        }else {
            player.clickedIcon = false
            player.isSubstitutePlayer = false
        }

        player.opacity = 1
        player.animationState = true
        player.activeFilter = activeFilter
        player.disableIconClick = false
        player.alreadyTransferred = false
        player.latestToBeAdded = false

        return player
    })
}

const readyCaptainBeforeChange = (p1, p2) => {
    return {
        ...p1,
        captain: p2.captain,
        viceCaptain: p2.viceCaptain
    }
}

export const makeCaptain = ({
    $pickedPlayers,
    player,
    captainType
}) => {

    const pp = [...$pickedPlayers]
    // Previous Captain or Vice Captain Index
    const pIndex = pp.findIndex(p => p[captainType] === true)
    // Next Captain or Vice Captain Index
    const nIndex = pp.findIndex(p => p.id === player.id)

    const previousCaptain = readyCaptainBeforeChange(pp[pIndex], pp[nIndex])
    const newCaptain = readyCaptainBeforeChange(pp[nIndex], pp[pIndex])

    const changedPlayers = [...pp]

    changedPlayers[pIndex] = previousCaptain
    changedPlayers[nIndex] = newCaptain

    return changedPlayers
}

export const getButtonBGColor = (player) => {
    if (player.captain && player.tripleCaptainApplied) {
        return 'bg-heliotrope-purple'
    } else if (player.isSubstitutePlayer && player.benchBoostApplied) {
        return 'bg-torquoise-niagara'
    }
    return 'primary-button-color'
}