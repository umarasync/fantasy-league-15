// Packages
import dayjs from 'dayjs';
import {v4 as uuidv4} from 'uuid';

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

const buildTeamPoints = ({
    teamName,
    weeklyPoints,
    totalPoints
}) => {
    return {
        id: uuidv4(),
        teamName,
        weeklyPoints,
        totalPoints
    }
}

const getTeamsRankWeekly = () => {
    return [
        {...buildTeamPoints({teamName: 'pangoliers', weeklyPoints: 110})},
        {...buildTeamPoints({teamName: 'crazy pandas', weeklyPoints: 108})},
        {...buildTeamPoints({teamName: 'slow fc', weeklyPoints: 105})},
        {...buildTeamPoints({teamName: 'football <3', weeklyPoints: 99})},
        {...buildTeamPoints({teamName: 'cats attack', weeklyPoints: 88})},
        {...buildTeamPoints({teamName: 'Klopps and robbers', weeklyPoints: 80})},
        {...buildTeamPoints({teamName: 'navi fc', weeklyPoints: 75})},
        {...buildTeamPoints({teamName: 'chiCken dinner', weeklyPoints: 72})},
        {...buildTeamPoints({teamName: 'Football DEvils', weeklyPoints: 69})},
        {...buildTeamPoints({teamName: 'peace and love', weeklyPoints: 50})},
    ]
}

const getTeamsRankOverall = () => {
    return [
        {...buildTeamPoints({teamName:'Klopps and robbers', weeklyPoints:130, totalPoints:3941})},
        {...buildTeamPoints({teamName:'chiCken dinner', weeklyPoints:90, totalPoints:3920})},
        {...buildTeamPoints({teamName:'Football DEvils', weeklyPoints:113, totalPoints:3913})},
        {...buildTeamPoints({teamName:'peace and love', weeklyPoints:100, totalPoints:3901})},
        {...buildTeamPoints({teamName:'slow fc', weeklyPoints:101, totalPoints:3895})},
        {...buildTeamPoints({teamName:'football <3', weeklyPoints:90, totalPoints:3850})},
        {...buildTeamPoints({teamName:'cats attack', weeklyPoints:92, totalPoints:3830})},
        {...buildTeamPoints({teamName:'pangoliers', weeklyPoints:88, totalPoints:3805})},
        {...buildTeamPoints({teamName:'crazy pandas', weeklyPoints:75, totalPoints:3799})},
        {...buildTeamPoints({teamName:'navi fc', weeklyPoints:72, totalPoints:3755})},
    ]
}

const getOverAllRanking = () => {
    return {
        id: 0,
        overall: true,
        week: 'overall',
        date: '',
        teamsRank: getTeamsRankOverall()
    }
}

const getPreviousGameWeeksRanking = () => {
    return [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((week, index) => {
        const previousDate = getSomePreviousDate(DAYS_TO * (index + 1))
        return {
            id: week,
            overall: false,
            week: week,
            date: previousDate,
            teamsRank: shuffle(getTeamsRankWeekly())
        }
    })
}

const getLeaguesGameWeeksRanking = () => {
    return [
        {...getOverAllRanking()},
        ...getPreviousGameWeeksRanking()
    ]
}

export const getMembers = () => {
    return [
        ...getTeamsRankWeekly()
    ]
}

export const getLastTeamRank = () => {
    return (
        {...buildTeamPoints({teamName: 'champions fc ', weeklyPoints: 80, totalPoints: 613})}
    )

}

export default getLeaguesGameWeeksRanking
