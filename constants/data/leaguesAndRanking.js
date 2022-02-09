// Packages
import {v4 as uuidv4} from 'uuid';

// Utils
import {shuffle} from "utils/helpers";

const buildDropDownLi = ({week, heading}) => {
    return {
        id: uuidv4(),
        week,
        heading
    }
}

export const getLeagueSettingsDropdownData = () => {

    return [
        {...buildDropDownLi({week:8, heading:'Gameweek 8'})},
        {...buildDropDownLi({week:9, heading:'Gameweek 9'})},
        {...buildDropDownLi({week:10, heading:'Gameweek 10'})},
        {...buildDropDownLi({week:11, heading:'Gameweek 11'})},
        {...buildDropDownLi({week:12, heading:'Gameweek 12'})},
        {...buildDropDownLi({week:13, heading:'Gameweek 13'})},
        {...buildDropDownLi({week:14, heading:'Gameweek 14'})},
        {...buildDropDownLi({week:'', heading:'Most transferred in last 24h'})},
    ]

}

const buildLeague = ({
    id,
    image,
    name,
    totalMembers,
    points,
}) => {
    return {
        id,
        image,
        name,
        totalMembers,
        points,
    }
}
const getPublicLeagues = () => {
    return [
        {
            ...buildLeague({
                id: 1,
                image: 'club_ajax.png',
                name: 'Eredivisie league',
                // totalMembers: shuffle([1200000, 1300060, 1003000, 1502000, 1703000, 1804000])[0],
                totalMembers: 1200000,
                points: shuffle([500, 669, 731, 822, 334, 479, 881, 663, 559])[0],
            }),
        },
        {
            ...buildLeague({
                id: 2,
                image: 'club_zwo.png',
                name: 'Fan league',
                // totalMembers: shuffle([110000, 190060, 102000, 160200, 172900, 333320])[0],
                totalMembers: 3001,
                points: shuffle([300, 882, 333, 434, 111, 321, 492])[0],
            }),
        },
    ]
}


const getPrivateLeagues = () => {
    return [
        {
            ...buildLeague({
                id: 1,
                image: 'private_league.png',
                name: 'TheRoom FC',
                // totalMembers: shuffle([3, 5, 10, 2, 4, 20, 25, 19, 29])[0],
                totalMembers: 5,
                points: shuffle([3, 10, 8, 7, 9, 7, 13, 17, 21])[0],
            }),
        },
    ]
}

export const getLeaguesInfo = () => {
    return {
        publicLeagues: getPublicLeagues(),
        privateLeagues: getPrivateLeagues()
    }
}

export const getCurrentWeekInfo = () => {
    return {
        id: 1,
        week: 10,
        weeklyPoints: 80,
        totalPoints: 1013,
        leaguesInfo: {
            ...getLeaguesInfo(),
            privateLeagues: []
        }
    }
}