// Packages
import {v4 as uuidv4} from 'uuid';

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

export const getPublicLeagues = () => {
    return [
        {
            id: 1,
            image: 'club_ajax.png',
            name: 'Eredivisie league',
            totalMembers: 1200000,
            points: 8413,
        },
        {
            id: 2,
            image: 'club_zwo.png',
            name: 'Fan league',
            totalMembers: 3000,
            points: 2138,
        },
    ]
}
