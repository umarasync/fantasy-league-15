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

export const setPlayersAdditionalData1 = ($squad) => {

    const squad = clone($squad)

    // Set icon for GKs
    const GKs = squad[POSITION_GK].map((player, index) => {
        if(index === squad[POSITION_GK].length - 1){
            player.clickedIcon = TRANSFER_ICON
        }else{ player.clickedIcon = false }
        return player
    })

    // Set icon for DEFS
    const DEFs = squad[POSITION_DEF].map((player, index) => {

        if(index === squad[POSITION_DEF].length - 1 || index === squad[POSITION_DEF].length - 2){
            player.clickedIcon = TRANSFER_ICON
        }else{
            player.clickedIcon = false
        }

        return player
    })

    // Set icon for MIDs
    const MIDs = squad[POSITION_MID].map((player, index) => {

        if(index === squad[POSITION_MID].length - 1){
            player.clickedIcon = TRANSFER_ICON
        }else{
            player.clickedIcon = false
        }
        return player
    })

    // Set icon for FWDs
    const FWDs = squad[POSITION_FWD].map((player) => {
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
        player.toggleAnimation = true
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

export const setPlayersAdditionalData = ($squad) => {

    const squad = clone($squad)

    const squadNew = squad.map((player, index) => {

        if(player.isSubstitute) {
            player.isSubstitutePlayer = true
            player.clickedIcon = TRANSFER_ICON
        }else {
            player.clickedIcon = false
        }

        player.opacity = 1
        player.toggleAnimation = true
        player.activeFilter = TOTAL_POINTS
        player.disableIconClick = false

        return player
    })


    return [

        // Playing 11
        ...squadNew.filter(p => !p.isSubstitutePlayer && p.position ===  POSITION_GK),
        ...squadNew.filter(p => !p.isSubstitutePlayer && p.position ===  POSITION_DEF),
        ...squadNew.filter(p => !p.isSubstitute && p.position ===  POSITION_MID),
        ...squadNew.filter(p => !p.isSubstitute && p.position ===  POSITION_FWD),

        // Substitutes
        ...squadNew.filter(p => p.isSubstitutePlayer && p.position ===  POSITION_GK),
        ...squadNew.filter(p => p.isSubstitutePlayer && p.position ===  POSITION_DEF),
        ...squadNew.filter(p => p.isSubstitutePlayer && p.position ===  POSITION_MID),
        ...squadNew.filter(p => p.isSubstitutePlayer && p.position ===  POSITION_FWD),
    ]
}

const readyPlayerBeforeSwapping = (p1, p2) => {
    return {
        ...p1,
        toggleAnimation: !p2.toggleAnimation,
        alreadySwapped: true,
        captain: p2.captain,
        viceCaptain: p2.viceCaptain,
        isSubstitutePlayer: p2.isSubstitutePlayer
    }
}

// Player Swapping Handling
const handlesP11Click = ({
    player,
    arrayIndex,
    pickedPlayers,
    setChangeFormation,
}) => {
    const squad = clone(pickedPlayers)

    const swapOutIndex = squad.findIndex(p => p.id === player.id)
    const swapInIndex = squad.findIndex(p => p.latestToBeSwappedIn)

    const swappedPlayers = [...squad]

    const swapOut = readyPlayerBeforeSwapping(squad[swapInIndex], squad[swapOutIndex])
    const swapIn = readyPlayerBeforeSwapping(squad[swapOutIndex], squad[swapInIndex])

    swappedPlayers[swapOutIndex] = swapOut
    swappedPlayers[swapInIndex] = {
        ...swapIn,
        clickedIcon: TRANSFER_ICON
    }

    // console.log("swappedPlayers ------------", swappedPlayers)

    if([4,5,6,7,8,9,10].includes(arrayIndex)) { setChangeFormation(ANIMATE) }

    return swappedPlayers.map((p, index) => {
        p.opacity = 1;
        p.disableIconClick = false

        if(!p.alreadySwapped && ![11,12,13,14].includes(index)) {
            p.clickedIcon = false
        }

        return p
    })
}

const handlesSubstituteClick = ({
    player,
    arrayIndex,
    pickedPlayers,
}) => {

    const squad = clone(pickedPlayers)

    /**** If Goalkeeper **/
    if(arrayIndex === ELEVEN) {
       return squad.map((p, index) => {
            if(arrayIndex === ELEVEN && [ZERO, ELEVEN].includes(index)){
                if(index === ELEVEN) {
                    p.clickedIcon = DIAMOND_UP_GREEN
                    p.latestToBeSwappedIn = true
                }else {
                    p.clickedIcon = DIAMOND_DOWN_RED
                    p.latestToBeSwappedIn = false
                }
                p.opacity = 1
            }else {
                p.opacity = 0.5
                p.disableIconClick = true
                p.latestToBeSwappedIn = false
            }
            return p
        })
    }else {
        /**** Non-Goal Keeper *******/
        return squad.map((p, index) => {

            /***** Disable Goal-Keeper and Other non-clicked Substitutes ******/
            if([0, 11, 12, 13, 14].includes(index) && (p.id !== player.id)){
                p.opacity = 0.5
                p.disableIconClick = true
                p.latestToBeSwappedIn = false
            } else { // Attach Icons & other data to clicked substitute and relevant p11
                if(p.id === player.id) {
                    p.clickedIcon = DIAMOND_UP_GREEN
                    p.latestToBeSwappedIn = true
                }else {
                    p.clickedIcon = DIAMOND_DOWN_RED
                    p.latestToBeSwappedIn = false
                    p.disableIconClick = false
                    p.alreadySwapped = false
                    p.toggleAnimation = true
                }
                p.opacity = 1
            }

            return p
        })
    }
}

export const playerSwapHandler = (props) => {
    const {
        player,
        setTransferInProgress
    } = props

    setTransferInProgress(true)

    if(player.clickedIcon === DIAMOND_DOWN_RED) {
        return handlesP11Click({...props})
    }
    return handlesSubstituteClick({...props})
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
        player.toggleAnimation = true
        player.activeFilter = activeFilter
        player.disableIconClick = false
        player.alreadySwapped = false
        player.latestToBeSwappedIn = false

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