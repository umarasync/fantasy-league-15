// Packages
import dayjs from 'dayjs';
import {v4 as uuidv4} from 'uuid';
import otherTeamPlayers from "./otherTeamPlayers";

// Functions for test data
const getSomePreviousDate = days => dayjs().subtract(days, 'days').format('YYYY-MM-DD')

const DAYS_TO = 10

const getPlayersForEachGameWeek = () => {
    return JSON.parse(otherTeamPlayers)
}

export const getOtherTeamData = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((week, index) => {
        const previousDate = getSomePreviousDate(DAYS_TO * (index + 1))
        return {
            id: uuidv4(),
            week: week,
            date: previousDate,
            players: [...getPlayersForEachGameWeek()]
        }
    })
}


