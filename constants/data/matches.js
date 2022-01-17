// Packages
import dayjs from 'dayjs';
import {shuffle} from "../../utils/helpers";

// Functions for test data
const getSomePreviousDate = days => dayjs().subtract(days, 'days').format('YYYY-MM-DD')
const getSomeNextDate = days => dayjs().add(days, 'days').format('YYYY-MM-DD')
const getTodayDate = () => dayjs().format('YYYY-MM-DD')
const DAYS_TO = 10
const CLUBS_GROUP_1= [
    {
        name: 'Zwolle',
        logo: 'club_zwo.png',
        players: [],
        goals: 1
    },
    {
        name: 'Fortuna Sittard',
        logo: 'club_fs.png',
        players: [],
        goals: 3
    },
    {
        name: 'Heerenven',
        logo: 'club_hee.png',
        players: [],
        goals: 2
    },
    {
        name: 'Feyenoord',
        logo: 'club_fr.png',
        players: [],
        goals: 4
    },
    {
        name: 'Waalwijk',
        logo: 'club_waa.png',
        players: [],
        goals: 5
    },
    {
        name: 'CAMBUUR',
        logo: 'club_sc.png',
        players: [],
        goals: 3
    },
]

const CLUBS_GROUP_2= [
    {
        name: 'Heracles',
        logo: 'club_her.png',
        players: [],
        goals: 1
    },
    {
        name: 'Sparta Roterdam',
        logo: 'club_sparta.png',
        players: [],
        goals: 5
    },
    {
        name: 'PSV',
        logo: 'club_psv.png',
        players: [],
        goals: 4
    },
    {
        name: 'AZ',
        logo: 'club_az.png',
        players: [],
        goals: 3
    },
    {
        name: 'Ajax',
        logo: 'club_ajax.png',
        players: [],
        goals: 2
    },
    {
        name: 'Nijmeges FC',
        logo: 'club_nij.png',
        players: [],
        goals: 1
    },
]

const matchesDates = (data) => {

    const { date, finished, clubImage} = data

    return [
        {
            date: date,
            matches: [
                {
                    id: 1,
                    time: `${date}T13:30:00`,
                    finished,
                    club1: shuffle(CLUBS_GROUP_1)[0],
                    club2: shuffle(CLUBS_GROUP_2)[0]
                },
                {
                    id: 2,
                    time: `${date}T18:30:00`,
                    finished,
                    club1: shuffle(CLUBS_GROUP_1)[0],
                    club2: shuffle(CLUBS_GROUP_2)[0]
                }
            ]
        },
        {
            date: date,
            matches: [
                {
                    id: 1,
                    time: `${date}T13:30:00`,
                    finished,
                    club1: shuffle(CLUBS_GROUP_1)[0],
                    club2: shuffle(CLUBS_GROUP_2)[0]
                },
                {
                    id: 1,
                    time: `${date}T18:30:00`,
                    finished,
                    club1: shuffle(CLUBS_GROUP_1)[0],
                    club2: shuffle(CLUBS_GROUP_2)[0]
                },
            ]
        },
    ]
}

const PREVIOUS_GAME_WEEKS = [9,8,7,6,5,4,3,2,1].map((week,index) => {
    const previousDate = getSomePreviousDate(DAYS_TO*(index + 1))
    return {
        id: week,
        week: `Gameweek ${week}`,
        date: previousDate,
        matchesDates: matchesDates({
            date: previousDate,
            finished: true,
            clubImage: 'club_zwo.png'
        })
    }
}).reverse()

const CURRENT_GAME_WEEK = {
    id: 10,
    week: 'Gameweek 10',
    date: getTodayDate(),
    matchesDates: matchesDates({
        date:  getTodayDate(),
        finished: false,
        clubImage: 'club_ajax.png'
    })
}

const NEXT_GAME_WEEKS = [11,12,13,14,15,16,17,18].map((week, index) => {
    const nextDate = getSomeNextDate(DAYS_TO * (index+1))
    return {
        id: week,
        week: `Gameweek ${week}`,
        date: nextDate,
        matchesDates: matchesDates({
            date:  nextDate,
            finished: false,
            clubImage: 'club_sc.png'
        })
    }
})

export const MATCHES = [
    ...PREVIOUS_GAME_WEEKS,
    { ...CURRENT_GAME_WEEK },
    ...NEXT_GAME_WEEKS
]