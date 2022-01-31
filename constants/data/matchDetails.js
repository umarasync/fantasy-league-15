// Constants
import {PLAYERS} from "constants/data/players";
import {CLUBS} from "constants/data/filters";

/***** Finished-Match-Details *******/
const getAwardedPlayers = () => {
    return [
        {
            player: PLAYERS[0],
            points: 46,
            award: 'Player of the match'
        },
        {
            player: PLAYERS[1],
            points: 3,
            award: ''
        },
        {
            player: PLAYERS[2],
            points: '',
            award: ''
        },
    ]
}

//HIGHLIGHTS
const getGoalsData = () => {
    return {
        team1Players: [
            {
                name: 'Jorbe Vertessen',
                value: "12’, 54’"
            },
            {
                name: 'Eran Zahavi',
                value: "45+3’"
            }
        ],
        team2Players: [
            {
                name: 'Paradise Vlut',
                value: "(AG) 8’"
            },
        ],
    }
}

const getMissesData = () => {
    return {
        team1Players: [],
        team2Players: [
            {
                name: 'Peter Verkhove',
                value: "(P) 3’"
            },
        ],
    }
}

const getSavesData = () => {
    return {
        team1Players: [
            {
                name: 'Bryan Jansen',
                value: "(6)"
            },
        ],
        team2Players: [
            {
                name: 'Koen Baker',
                value: "(4)"
            },
        ],
    }
}

const getAssistsData = () => {
    return {
        team1Players: [
            {
                name: 'Jorbe Vertessen',
                value: "(2)"
            },
        ],
        team2Players: [],
    }
}

const getYellowCardData = () => {
    return {
        team1Players: [
            {
                name: 'Jorbe Vertessen',
                value: '90+5”'
            },
        ],
        team2Players: [
            {
                name: 'Paradise Vlut',
                value: "8’"
            },
        ],
    }
}

const getRedCardData = () => {
    return {
        team1Players: [],
        team2Players: [
            {
                name: 'Paradise Vlut',
                value: "42’"
            },
        ],
    }
}

// STATISTICS
const getStatisticsObj = ({heading, team1, team2}) => {
    return {
        heading,
        team1,
        team2,
    }
}
const getStatistics = () => {
    return [
        {...getStatisticsObj({heading: 'Shots on goal', team1: 17, team2: 7})},
        {...getStatisticsObj({heading: 'Strikes on target', team1: 6, team2: 4})},
        {...getStatisticsObj({heading: 'Ball possession', team1: '54%', team2: '46%'})},
        {...getStatisticsObj({heading: 'Passes', team1: 481, team2: 424})},
        {...getStatisticsObj({heading: 'Pass accuracy', team1: '83%', team2: '81%'})},
        {...getStatisticsObj({heading: 'Fols', team1: 17, team2: 14})},
        {...getStatisticsObj({heading: 'Yellow cards', team1: 3, team2: 6})},
        {...getStatisticsObj({heading: 'Red cards', team1: 0, team2: 1})},
        {...getStatisticsObj({heading: 'Offsides', team1: 5, team2: 2})},
        {...getStatisticsObj({heading: 'Corner', team1: 4, team2: 4})},
    ]
}

export const finishedMatchDetails = {
    awardedPlayers: getAwardedPlayers(),
    highlights: [
        {
            heading: 'Goals',
            image: 'goals.png',
            data: getGoalsData()
        },
        {
            heading: 'Misses',
            image: 'misses.png',
            data: getMissesData()
        },
        {
            heading: 'Assists',
            image: 'assists.png',
            data: getAssistsData()
        },
        {
            heading: 'Saves',
            image: 'saves.png',
            data: getSavesData()
        },
        {
            heading: 'Yellow cards',
            image: 'yellow_card.png',
            data: getYellowCardData()
        },
        {
            heading: 'Red cards',
            image: 'red_card.png',
            data: getRedCardData()
        }
    ],
    statistics: getStatistics()
}


/***** Upcoming-Match-Details *******/
const getLastMatchUp = () => {
    return {
        date: 'Monday 12 October 2021',
        team1: {
            ...CLUBS[5],
            goals: 2
        },
        team2: {
            ...CLUBS[6],
            goals: 4
        }
    }
}
const getLastMatchUpsData = () => {
    return [1,2,3,4].map((match) => {
        return getLastMatchUp()
    })
}

const getHeadToHeadData = () => {
    return {
        totalMatchPlayed: 59,
        draws: 16,
        team1: {
            ...CLUBS[5],
            totalWins: 30,
            home: 8,
            away: 22,
        },
        team2: {
            ...CLUBS[6],
            totalWins: 13,
            home: 12,
            away: 1,
        }
    }
}

export const upcomingMatchDetails = () => {
    return {
        lastMatchUps: getLastMatchUpsData(),
        headToHead: getHeadToHeadData()
    }
}