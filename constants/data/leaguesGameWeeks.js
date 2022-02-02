// Packages
import dayjs from 'dayjs';

// Utils
import {clone, shuffle} from "utils/helpers";

// Data
import {PLAYERS} from "constants/data/players";
import {finishedMatchDetails, upcomingMatchDetails} from "constants/data/matchDetails";

// Functions for test data
const getSomePreviousDate = days => dayjs().subtract(days, 'days').format('YYYY-MM-DD')
const getSomeNextDate = days => dayjs().add(days, 'days').format('YYYY-MM-DD')
const getTodayDate = () => dayjs().format('YYYY-MM-DD')
const TIMES = ['13:30:00', '18:00:00', '05:00:00', '07:45:00', '15:20:00', '14:30:00', '17:30:00', '23:45:00', '19:10:00']
const DAYS_TO = 10


const getPreviousGameWeeksRanking = () => {
    return [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((week, index) => {
        const previousDate = getSomePreviousDate(DAYS_TO * (index + 1))
        return {
            id: week,
            week: `Gameweek ${week}`,
            date: previousDate,
        }
    })
}

const getOverAllRanking = () => {
    return {
        id: 0,
        week: 'overall',
        date: ''
    }
}

const getLeaguesGameWeeksRanking = () => {
    return [
        {...getOverAllRanking()},
        ...getPreviousGameWeeksRanking()
    ]
}



export default getLeaguesGameWeeksRanking
