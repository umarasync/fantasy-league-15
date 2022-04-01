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

// Initializing Initial State
const getPlayersFormation = (squad) => {

    let DEFs = squad.filter((p) => !p.isSubstitutePlayer && p.position === POSITION_DEF).length
    let MIDs = squad.filter((p) => !p.isSubstitutePlayer && p.position === POSITION_MID).length
    let FWDs = squad.filter((p) => !p.isSubstitutePlayer && p.position === POSITION_FWD).length

    return {
        value: `${DEFs}${MIDs}${FWDs}`,
        def: DEFs,
        mid: MIDs,
        fwd: FWDs
    }
}

export const setPlayersAdditionalData = ($squad) => {


    const squad = clone($squad).map((player) => {

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


    let $$squad = [

        // Playing 11
        ...squad.filter(p => !p.isSubstitutePlayer && p.position ===  POSITION_GK),
        ...squad.filter(p => !p.isSubstitutePlayer && p.position ===  POSITION_DEF),
        ...squad.filter(p => !p.isSubstitutePlayer && p.position ===  POSITION_MID),
        ...squad.filter(p => !p.isSubstitutePlayer && p.position ===  POSITION_FWD),

        // Substitutes
        ...squad.filter(p => p.isSubstitutePlayer && p.position ===  POSITION_GK),
        ...squad.filter(p => p.isSubstitutePlayer && p.position ===  POSITION_DEF),
        ...squad.filter(p => p.isSubstitutePlayer && p.position ===  POSITION_MID),
        ...squad.filter(p => p.isSubstitutePlayer && p.position ===  POSITION_FWD),
    ]

    let formation = getPlayersFormation($$squad)

    return {
        formation,
        toggleFormation: true,
        squad: $$squad
    }
}

const readyPlayerBeforeSwapping = (p1, p2) => {
    return {
        ...p1,
        toggleAnimation: !p2.toggleAnimation,
        latestSwappedInSub: true,
        captain: p2.captain,
        viceCaptain: p2.viceCaptain,
        isSubstitutePlayer: p2.isSubstitutePlayer
    }
}

// Player Swapping Handling

const makePlayersInOrder = (squad) => {
    return [

            // Playing 11
            ...squad.filter(p => !p.isSubstitutePlayer && p.position ===  POSITION_GK),
            ...squad.filter(p => !p.isSubstitutePlayer && p.position ===  POSITION_DEF),
            ...squad.filter(p => !p.isSubstitutePlayer && p.position ===  POSITION_MID),
            ...squad.filter(p => !p.isSubstitutePlayer && p.position ===  POSITION_FWD),

            // Substitutes
            ...squad.filter(p => p.isSubstitutePlayer),
        ]
}

const handlesP11Click = ({
    player,
    arrayIndex,
    squadInfo,
    setChangeFormation,
}) => {
    const squad = clone(squadInfo.squad)

    const swapOutIndex = squad.findIndex(p => p.id === player.id)
    const swapInIndex = squad.findIndex(p => p.latestSubToBeSwappedIn)

    const $squad = [...squad]

    const swapOut = readyPlayerBeforeSwapping(squad[swapInIndex], squad[swapOutIndex])
    const swapIn = readyPlayerBeforeSwapping(squad[swapOutIndex], squad[swapInIndex])

    $squad[swapOutIndex] = swapOut
    $squad[swapInIndex] = {
        ...swapIn,
        clickedIcon: TRANSFER_ICON
    }

    if([4,5,6,7,8,9,10].includes(arrayIndex)) { setChangeFormation(ANIMATE) }

    const $$squad = $squad.map((p, index) => {
        p.opacity = 1;
        p.disableIconClick = false

        // Remove icons from all players except latest swapped substitute &  4 subs
        if(!p.latestSwappedInSub && !p.isSubstitutePlayer) {
            p.clickedIcon = false
        }

        return p
    })
    
    return {
        formation: getPlayersFormation($$squad),
        toggleFormation: !squadInfo.toggleFormation,
        squad: makePlayersInOrder($$squad)
    }
}

const disablePlayer = ({p, index, player, squadInfo}) => {

    // disableGoalKeepersAndAllSubstitutesExceptClickedOne
    if((!index || p.isSubstitutePlayer) && (p.id !== player.id)){
        return true
    } else if('') {

    }

    return false
}

const handlesSubstituteClick = ({
    player,
    arrayIndex,
    squadInfo,
}) => {

    const squad = clone(squadInfo.squad)

    /**** If clicked sub is a goalkeeper **/
    if(arrayIndex === ELEVEN) {
       const $squad = squad.map((p, index) => {
            if(arrayIndex === ELEVEN && [ZERO, ELEVEN].includes(index)){
                if(index === ELEVEN) {
                    p.clickedIcon = DIAMOND_UP_GREEN
                    p.latestSubToBeSwappedIn = true
                }else {
                    p.clickedIcon = DIAMOND_DOWN_RED
                    p.latestSubToBeSwappedIn = false
                }
                p.opacity = 1
            }else {
                p.opacity = 0.5
                p.disableIconClick = true
                p.latestSubToBeSwappedIn = false
            }
            return p
        })

        return {
            ...squadInfo,
            squad: $squad
        }
    }

    /**** If clicked sub is a non-goalkeeper:
     * disable certain players &
     * attach data to others players who can be clicked or interacted with
     * *******/
    const $squad = squad.map((p, index) => {

        /***** Disabling Players ******/
        if(disablePlayer({p, index, player, squadInfo})){
            p.opacity = 0.5
            p.disableIconClick = true
            p.latestSubToBeSwappedIn = false

        } else { // Attach Icons & other data to clicked substitute and relevant p11
            if(p.id === player.id) {
                p.clickedIcon = DIAMOND_UP_GREEN
                p.latestSubToBeSwappedIn = true
            }else {
                p.clickedIcon = DIAMOND_DOWN_RED
                p.latestSubToBeSwappedIn = false
                p.disableIconClick = false
                p.latestSwappedInSub = false
                p.toggleAnimation = true
            }
            p.opacity = 1
        }

        return p
    })

    return {
        ...squadInfo,
        squad: $squad
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

// Resetting Players
export const resetPlayers = ({squad, activeFilter}) => {
    return squad.map((p, index) => {

        if([11,12,13,14].includes(index)) {
            p.clickedIcon = TRANSFER_ICON
            p.isSubstitutePlayer = true
        }else {
            p.clickedIcon = false
            p.isSubstitutePlayer = false
        }

        p.opacity = 1
        p.toggleAnimation = true
        p.activeFilter = activeFilter
        p.disableIconClick = false
        p.latestSwappedInSub = false
        p.latestSubToBeSwappedIn = false

        return p
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
    $squadInfo,
    player,
    captainType
}) => {

    const { squad } = $squadInfo
    // Previous Captain or Vice Captain Index
    const pIndex = squad.findIndex(p => p[captainType] === true)
    // Next Captain or Vice Captain Index
    const nIndex = squad.findIndex(p => p.id === player.id)

    const previousCaptain = readyCaptainBeforeChange(squad[pIndex], squad[nIndex])
    const newCaptain = readyCaptainBeforeChange(squad[nIndex], squad[pIndex])

    const changedPlayers = [...squad]

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