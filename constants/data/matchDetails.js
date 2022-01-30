
import {PLAYERS} from "./players";

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
                dummyText: "12’, 54’"
            },
            {
                name: 'Eran Zahavi',
                dummyText: "45+3’"
            }
        ],
        team2Players: [
            {
                name: 'Paradise Vlut',
                dummyText: "(AG) 8’"
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
                dummyText: "(P) 3’"
            },
        ],
    }
}

const getSavesData = () => {
    return {
        team1Players: [
            {
                name: 'Bryan Jansen',
                dummyText: "(6)"
            },
        ],
        team2Players: [
            {
                name: 'Koen Baker',
                dummyText: "(4)"
            },
        ],
    }
}

const getAssistsData = () => {
    return {
        team1Players: [
            {
                name: 'Jorbe Vertessen',
                dummyText: "(2)"
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
                dummyText: '90+5”'
            },
        ],
        team2Players: [
            {
                name: 'Paradise Vlut',
                dummyText: "8’"
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
                dummyText: "42’"
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
            heading: 'Saves',
            image: 'saves.png',
            data: getSavesData()
        },
        {
            heading: 'Assists',
            image: 'assists.png',
            data: getAssistsData()
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