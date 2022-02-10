// Utils
import {nFormatter} from "utils/helpers";

// POSITIONS
export const POSITION_ALL = 'All'
export const POSITION_GK = 'GK'
export const POSITION_DEF = 'DEF'
export const POSITION_MID = 'MID'
export const POSITION_FWD = 'FWD'
export const PLAYERS_POSITIONS = [
    {
        id: 1,
        label: POSITION_ALL,
        value: POSITION_ALL
    },
    {
        id: 2,
        label: POSITION_GK,
        value: POSITION_GK,
    },
    {
        id: 3,
        label: POSITION_DEF,
        value: POSITION_DEF,
    },
    {
        id: 4,
        label: POSITION_MID,
        value: POSITION_MID,
    },
    {
        id: 5,
        label: POSITION_FWD,
        value: POSITION_FWD,
    },
]

// PRICES
export const ALL_PRICES = 'All prices'
export const PRICES = [
    {
        id: 1,
        label: ALL_PRICES,
        value: ALL_PRICES
    },
    {
        id: 2,
        label: '< €1m',
        value: {
            from: 0,
            to: 1000000,
        }
    },
    {
        id: 3,
        label: '€1m – €5m',
        value: {
            from: 1000000,
            to: 5000000,
        }
    },
    {
        id: 4,
        label: '€10m – €20m',
        value: {
            from: 10000000,
            to: 20000000,
        }
    },
    {
        id: 5,
        label: '€10m <',
        value: {
            from: 10000000,
            to: null
        }
    },
]

// CLUBS/TEAMS
export const ALL_TEAMS = 'All Teams'
export const CLUB_AJAX = 'Ajax'
export const CLUB_AZ = 'AZ'
export const CLUB_FC = 'FC GRONINGEN'
export const CLUB_FR = 'FEYENOORD'
export const CLUB_HEE = 'SC HEERENVEEN'
export const CLUB_SC = 'CAMBUUR'
export const CLUB_ZWO = 'PEC ZWOLLE'
export const CLUBS = [
    {
        id: 1,
        label: ALL_TEAMS,
        value: ALL_TEAMS,
        checked: true
    },
    {
        id: 2,
        label: CLUB_AJAX,
        value: CLUB_AJAX,
        image: 'club_ajax.png',
        checked: false
    },
    {
        id: 3,
        label: CLUB_AZ,
        value: CLUB_AZ,
        image: 'club_az.png',
        checked: false
    },
    {
        id: 4,
        label: CLUB_FC,
        value: CLUB_FC,
        image: 'club_fc.png',
        checked: false
    },
    {
        id: 5,
        label: CLUB_FR,
        value: CLUB_FR,
        image: 'club_fr.png',
        checked: false
    },
    {
        id: 6,
        label: CLUB_HEE,
        value: CLUB_HEE,
        image: 'club_hee.png',
        checked: false
    },
    {
        id: 7,
        label: CLUB_SC,
        value: CLUB_SC,
        image: 'club_sc.png',
        checked: false
    },
    {
        id: 8,
        label: CLUB_ZWO,
        value: CLUB_ZWO,
        image: 'club_zwo.png',
        checked: false
    }
]



// STATUSES
export const ALL_STATUSES = 'All statuses'
export const STATUS_SUSPENDED = 'Suspended'
export const STATUS_INJURED = 'Injured'
export const STATUS_FIT = 'fit'

export const STATUSES = [
    {
        id: 1,
        label: ALL_STATUSES,
        value: ALL_STATUSES,
        checked: true
    },
    {
        id: 2,
        label: STATUS_SUSPENDED,
        value: STATUS_SUSPENDED,
        image: 'suspended.png',
        checked: false
    },
    {
        id: 3,
        label: STATUS_INJURED,
        value: STATUS_INJURED,
        image: 'injured.png',
        checked: false
    },
]

// RECOMMENDATION Filter
export const RECOMMENDED_PLAYERS = 'Recommended players'
export const MOST_PICKED_PLAYERS = 'Most picked players'
export const MOST_PICKED_AS_CAPTAIN = 'Most picked as captain'
export const POTENTIAL_PENALTY_TAKERS = 'Potential penalty takers'

export const RECOMMENDATIONS = [
    {
        id: 1,
        label: RECOMMENDED_PLAYERS,
        value: RECOMMENDED_PLAYERS,
    },
    {
        id: 2,
        label: MOST_PICKED_PLAYERS,
        value: MOST_PICKED_PLAYERS,
    },
    {
        id: 3,
        label: MOST_PICKED_AS_CAPTAIN,
        value: MOST_PICKED_AS_CAPTAIN,
    },
    {
        id: 4,
        label: POTENTIAL_PENALTY_TAKERS,
        value: POTENTIAL_PENALTY_TAKERS,
    },
]


// SORTING
export const TOTAL_POINTS = 'Total points'
export const PRICE_FROM_HIGH_TO_LOW = 'Price (from high to low)'
export const PRICE_FROM_LOW_TO_HIGH = 'Price (from low to high)'
export const MOST_TRANSFERRED = 'Most transferred'

export const SORTING_OPTIONS = [
    {
        id: 1,
        label: TOTAL_POINTS,
        value: TOTAL_POINTS
    },
    {
        id: 2,
        label: PRICE_FROM_HIGH_TO_LOW,
        value: PRICE_FROM_HIGH_TO_LOW
    },
    {
        id: 3,
        label: PRICE_FROM_LOW_TO_HIGH,
        value: PRICE_FROM_LOW_TO_HIGH
    },
    {
        id: 4,
        label: MOST_TRANSFERRED,
        value: MOST_TRANSFERRED
    },
]
