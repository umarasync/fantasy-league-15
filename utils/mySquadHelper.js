// Player POSITIONS
import {POSITION_DEF, POSITION_FWD, POSITION_GK, POSITION_MID} from "constants/data/filters";

// Utils
import {clone} from "utils/helpers";

// Constants
import {ELEVEN, ZERO} from "constants/arrayIndexes";
import {getCurrentWeekInfo} from "constants/data/leaguesAndRanking";

// Actions
import {getFantasyTeamById} from "redux/FantasyTeams/api";

export const TRANSFER_ICON = '/images/transfer.png'
export const DIAMOND_UP_GREEN = '/images/diamond_up_green.png'
export const DIAMOND_DOWN_RED = '/images/diamond_down_red.png'
export const TOTAL_POINTS = 'Total pts'
export const PRICES = 'Price'
export const MATCHES = 'Matches'
export const CAPTAIN = 'captain'
export const VICE_CAPTAIN = 'viceCaptain'


export const didMount = async ({
    // User
    user,
    // Squad Info
    setSquadInfo,
    setSavedSquadInfo,
    // Modals
    setShowPlayerInfoModal,
    setShowTripleCaptainModal,
    // Current game info
    setCurrentGameWeekInfo,
    // dispatch
    dispatch
}) => {

       const {
           success,
           data
       } = await dispatch(getFantasyTeamById({
               gameWeek: user.currentGameweek ,
               fantasyTeamId: user.fantasyTeamId,
       }))

       if(!success) return
       const $squadInfo = setPlayersAdditionalData(data)
       setSquadInfo($squadInfo)
       setSavedSquadInfo($squadInfo)
       setShowPlayerInfoModal(false)
       setShowTripleCaptainModal(false)

       // Setting-Info-Board-State
       setCurrentGameWeekInfo({
           toggleAnimation: false,
           data: clone(getCurrentWeekInfo())
       })
   }


// Initializing Initial State
const getPlayersFormation = (squad) => {

    let DEFs = squad.filter((p) => !p.isSubstitutePlayer && p.position === POSITION_DEF).length
    let MIDs = squad.filter((p) => !p.isSubstitutePlayer && p.position === POSITION_MID).length
    let FWDs = squad.filter((p) => !p.isSubstitutePlayer && p.position === POSITION_FWD).length

    let formationValue = `${DEFs}${MIDs}${FWDs}`
    return {
        formation: formationValue,
        previousFormation: formationValue,
        toggleFormation: true,
        def: DEFs,
        mid: MIDs,
        fwd: FWDs
    }
}

const setPlayersAdditionalData = ($squad) => {

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

    return {
        formationInfo: getPlayersFormation($$squad),
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
    squadInfo,
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

    // if([4,5,6,7,8,9,10].includes(arrayIndex)) { setChangeFormation(ANIMATE) }

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
        formationInfo: {
            ...getPlayersFormation($$squad),
            previousFormation: squadInfo.formationInfo.formation,
            toggleFormation: !squadInfo.formationInfo.toggleFormation,
        },
        squad: makePlayersInOrder($$squad)
    }
}

const disablePlayer = ({p, index, player, squadInfo}) => {

    const {formationInfo} = squadInfo

    return (

        // Disable non-clicked substitutes as well goal keeper from p11
        (!index || p.isSubstitutePlayer) && (p.id !== player.id)
        // Disable DEFs if Just 3 Left
        || formationInfo.def === 3 && !p.isSubstitutePlayer && p.position === POSITION_DEF
        // Disable MIDs if Just 3 Left
        || formationInfo.mid === 3 && !p.isSubstitutePlayer && p.position === POSITION_MID
        // Disable FWDs if Just 1 Left
        || formationInfo.fwd === 1 && !p.isSubstitutePlayer && p.position === POSITION_FWD
    )

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
    squadInfo,
    player,
    captainType
}) => {

    const { squad } = squadInfo

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