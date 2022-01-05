// Constants
import {
    POSITION_DEF,
    POSITION_FWD,
    POSITION_GK,
    POSITION_MID
} from "constants/data/filters";

// Utils
import {nFormatter, shuffle} from "utils/helpers";

export const resetMultiSelectsDataState = (option, data) => {

    const {
        setSelectedOptions,
        setOptions
    } = data

    let STATE_INITIAL_I = [ ...data.initialState ]

    if(option.fromBackSpace || option.checked) {
        setSelectedOptions([])
        STATE_INITIAL_I[0].checked = false
    }else {
        setSelectedOptions([STATE_INITIAL_I[0]])
    }

    setOptions([
        ...STATE_INITIAL_I
    ])
}

// Handles multi selections filters
export const handleMultiSelectionDropDowns = (option, data) => {

    if(option.value === data.firstOption) {
        return resetMultiSelectsDataState(option, data)
    }

    const {
        setSelectedOptions,
        setOptions
    } = data

    let newStateI = [ ...data.state ]

    let firstOption = newStateI[0]

    if(firstOption.checked) {firstOption.checked = false}

    let objIndex = newStateI.findIndex((obj) => obj.id === option.id)

    newStateI[objIndex].checked =  !newStateI[objIndex].checked

    const selectedOptions = newStateI.filter((option) => option.checked)

    setSelectedOptions([...selectedOptions])
    setOptions([...newStateI])
}


export const handleAutoPick = ({
    players,
    allPlayersObjectIndexes,
    totalBudget
}) => {

    let remainingBudget = totalBudget

    const GKsIndexes = shuffle(allPlayersObjectIndexes[POSITION_GK])
    const FWDsIndexes = shuffle(allPlayersObjectIndexes[POSITION_FWD])
    const MIDsIndexes = shuffle(allPlayersObjectIndexes[POSITION_MID])
    const DEFsIndexes = shuffle(allPlayersObjectIndexes[POSITION_DEF])

    let chosenGKsIndexes = []
    for(let i = 0; i < 2; i++) {
        chosenGKsIndexes.push(GKsIndexes[i])
    }

    let chosenFWDsIndexes = []
    for(let i = 0; i < 3; i++) {
        chosenFWDsIndexes.push(FWDsIndexes[i])
    }

    let chosenMIDsIndexes = []
    for(let i = 0; i < 5; i++) {
        chosenMIDsIndexes.push(MIDsIndexes[i])
    }

    let chosenDEFsIndexes = []
    for(let i = 0; i < 5; i++) {
        chosenDEFsIndexes.push(DEFsIndexes[i])
    }

    let fifteenChosenPlayersIndex = [
        ...chosenGKsIndexes,
        ...chosenFWDsIndexes,
        ...chosenMIDsIndexes,
        ...chosenDEFsIndexes
    ]

    let shuffledFifteenChosenPlayersIndex = shuffle(fifteenChosenPlayersIndex)

    let chosenPlayersWithinBudget = {
        [POSITION_MID]: [],
        [POSITION_GK]: [],
        [POSITION_DEF]: [],
        [POSITION_FWD]: [],
    }

    let totalChosenPlayers = 0
    for(let i = 0; i < 15; i++) {
        let player = players[shuffledFifteenChosenPlayersIndex[i]]
        if(player.price < remainingBudget) {
            chosenPlayersWithinBudget[player.position].push(player)
            remainingBudget = remainingBudget - player.price
            totalChosenPlayers += 1
        }else {
            chosenPlayersWithinBudget[player.position].push(false)
        }
    }

    return {
        chosenPlayersWithinBudget,
        remainingBudget,
        totalChosenPlayers
    }

}