// Packages
import dayjs from 'dayjs';
import {v4 as uuidv4} from 'uuid';

// Constants
import otherTeamPlayers from "./otherTeamPlayers";
import {getLeaguesInfo} from "./leaguesAndRanking";

// Utils
import {shuffle} from "utils/helpers";

// Functions for test data
const getSomePreviousDate = days => dayjs().subtract(days, 'days').format('YYYY-MM-DD')

const DAYS_TO = 10

const getPlayersForEachGameWeek = () => {
    return JSON.parse(otherTeamPlayers)
}



export const getOtherTeamData = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((week, index) => {
        const previousDate = getSomePreviousDate(DAYS_TO * (index + 1))

        // Making week 10 current active week
        let active = week === 10

        return {
            id: uuidv4(),
            week: week,
            active,
            date: previousDate,
            weeklyPoints: shuffle([80, 50, 69, 45, 90])[0],
            totalPoints: shuffle([1013, 800, 732, 619, 880, 999])[0],
            players: [...getPlayersForEachGameWeek()],
            leaguesInfo: getLeaguesInfo()
        }
    })
}


