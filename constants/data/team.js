// Utils
import {nFormatter} from "utils/helpers";

// POSITIONS
export const POSITION_ALL = 'All'
const POSITION_GK = 'GK'
const POSITION_DEF = 'DEF'
const POSITION_MID = 'MID'
const POSITION_FWD = 'FWD'
export const PLAYERS_POSITIONS = [
    {
        title: POSITION_ALL
    },
    {
        title: POSITION_GK
    },
    {
        title: POSITION_DEF
    },
    {
        title: POSITION_MID
    },
    {
        title: POSITION_FWD
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
const CLUB_AJAX = 'Ajax'
const CLUB_AZ = 'AZ'
const CLUB_FC = 'FC GRONINGEN'
const CLUB_FR = 'FEYENOORD'
const CLUB_HEE = 'SC HEERENVEEN'
const CLUB_SC = 'CAMBUUR'
const CLUB_ZWO = 'PEC ZWOLLE'
export const CLUBS = [
    {
        id: 1,
        name: ALL_TEAMS,
        label: ALL_TEAMS,
        checked: true
    },
    {
        id: 2,
        name: CLUB_AJAX,
        label: CLUB_AJAX,
        image: 'club_ajax.svg',
        checked: false
    },
    {
        id: 3,
        name: CLUB_AZ,
        label: CLUB_AZ,
        image: 'club_az.svg',
        checked: false
    },
    {
        id: 4,
        name: CLUB_FC,
        label: CLUB_FC,
        image: 'club_fc.svg',
        checked: false
    },
    {
        id: 5,
        name: CLUB_FR,
        label: CLUB_FR,
        image: 'club_fr.svg',
        checked: false
    },
    {
        id: 6,
        name: CLUB_HEE,
        label: CLUB_HEE,
        image: 'club_hee.svg',
        checked: false
    },
    {
        id: 7,
        name: CLUB_SC,
        label: CLUB_SC,
        image: 'club_sc.svg',
        checked: false
    },
    {
        id: 8,
        name: CLUB_ZWO,
        label: CLUB_ZWO,
        image: 'club_zwo.svg',
        checked: false
    }
]

// PLAYERS
const PLAYER1_PRICE = 6400000
const PLAYER2_PRICE = 36000000
const PLAYER3_PRICE = 15000000
const PLAYER4_PRICE = 7300000
const PLAYER5_PRICE = 9100000
const PLAYER6_PRICE = 19000000
const PLAYER7_PRICE = 670000
const PLAYER8_PRICE = 6400000
const PLAYER9_PRICE = 29000000
const PLAYER10_PRICE = 100000

export const PLAYERS = [
    {
        id: 1,
        image: 'player1.svg',
        clubImage: 'club_fc.svg',
        clubName: CLUB_FC,
        name: 'R. Nelson',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN'
        },
        price: PLAYER1_PRICE,
        formattedPrice: nFormatter(PLAYER1_PRICE),
        position: 'MID',
        points: 14,
        most_transferred: 2
    },
    {
        id: 2,
        image: 'player2.svg',
        clubImage: 'club_az.svg',
        clubName: CLUB_AZ,
        name: 'H. Veerman',
        nextMatch: {
            club: 'AZ',
            vs: 'GRO'
        },
        price: PLAYER2_PRICE,
        formattedPrice: nFormatter(PLAYER2_PRICE),
        position: 'DEF',
        points: 19,
        most_transferred: 4
    },
    {
        id: 3,
        image: 'player3.svg',
        clubImage: 'club_hee.svg',
        clubName: CLUB_HEE,
        name: 'L. Sane',
        nextMatch: {
            club: 'HEE',
            vs: 'FOR'
        },
        price: PLAYER3_PRICE,
        formattedPrice: nFormatter(PLAYER3_PRICE),
        position: 'DEF',
        points: 32,
        most_transferred: 6
    },
    {
        id: 4,
        image: 'player4.svg',
        clubImage: 'club_ajax.svg',
        clubName: CLUB_AJAX,
        name: 'N. Bannis',
        nextMatch: {
            club: 'GRO',
            vs: 'AZ'
        },
        price: PLAYER4_PRICE,
        formattedPrice: nFormatter(PLAYER4_PRICE),
        position: 'FWD',
        points: 31,
        most_transferred: 8
    },
    {
        id: 5,
        image: 'player5.svg',
        clubImage: 'club_zwo.svg',
        clubName: CLUB_ZWO,
        name: 'T. Tekie',
        nextMatch: {
            club: 'ZWO',
            vs: 'AJA'
        },
        price: PLAYER5_PRICE,
        formattedPrice: nFormatter(PLAYER5_PRICE),
        position: 'MID',
        points: 59,
        most_transferred: 1
    },
    {
        id: 6,
        image: 'player6.svg',
        clubImage: 'club_fr.svg',
        clubName: CLUB_FR,
        name: 'M. Nelom',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN'
        },
        price: PLAYER6_PRICE,
        formattedPrice: nFormatter(PLAYER6_PRICE),
        position: 'FWD',
        points: 13,
        most_transferred: 3
    },
    {
        id: 7,
        image: 'player7.svg',
        clubImage: 'club_fr.svg',
        clubName: CLUB_FR,
        name: 'B. Nygren',
        nextMatch: {
            club: 'BAY',
            vs: 'BEN'
        },
        price: PLAYER7_PRICE,
        formattedPrice: nFormatter(PLAYER7_PRICE),
        position: 'MID',
        points: 42,
        most_transferred: 5
    },
    {
        id: 8,
        image: 'player1.svg',
        clubImage: 'club_fc.svg',
        clubName: CLUB_FC,
        name: 'R. Nelson',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN'
        },
        price: PLAYER8_PRICE,
        formattedPrice: nFormatter(PLAYER8_PRICE),
        position: 'MID',
        points: 24,
        most_transferred: 7
    },
    {
        id: 9,
        image: 'player2.svg',
        clubImage: 'club_az.svg',
        clubName: CLUB_AZ,
        name: 'H. Veerman',
        nextMatch: {
            club: 'AZ',
            vs: 'GRO'
        },
        price: PLAYER9_PRICE,
        formattedPrice: nFormatter(PLAYER9_PRICE),
        position: 'DEF',
        points: 13,
        most_transferred: 9
    },
    {
        id: 10,
        image: 'player3.svg',
        clubImage: 'club_hee.svg',
        clubName: CLUB_HEE,
        name: 'L. Sane',
        nextMatch: {
            club: 'HEE',
            vs: 'FOR'
        },
        price: PLAYER10_PRICE,
        formattedPrice: nFormatter(PLAYER10_PRICE),
        position: 'DEF',
        points: 16,
        most_transferred: 10
    },
    {
        id: 11,
        image: 'player5.svg',
        clubImage: 'club_zwo.svg',
        clubName: CLUB_ZWO,
        name: 'T. Tekie',
        nextMatch: {
            club: 'ZWO',
            vs: 'AJA'
        },
        price: PLAYER5_PRICE,
        formattedPrice: nFormatter(PLAYER5_PRICE),
        position: 'MID',
        points: 29,
        most_transferred: 1
    },
    {
        id: 12,
        image: 'player6.svg',
        clubImage: 'club_fr.svg',
        clubName: CLUB_FR,
        name: 'M. Nelom',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN'
        },
        price: PLAYER6_PRICE,
        formattedPrice: nFormatter(PLAYER6_PRICE),
        position: 'FWD',
        points: 13,
        most_transferred: 3
    },
    {
        id: 13,
        image: 'player3.svg',
        clubImage: 'club_hee.svg',
        clubName: CLUB_HEE,
        name: 'L. Sane',
        nextMatch: {
            club: 'HEE',
            vs: 'FOR'
        },
        price: PLAYER3_PRICE,
        formattedPrice: nFormatter(PLAYER3_PRICE),
        position: 'DEF',
        points: 60,
        most_transferred: 6
    },
    {
        id: 14,
        image: 'player4.svg',
        clubImage: 'club_ajax.svg',
        clubName: CLUB_AJAX,
        name: 'N. Bannis',
        nextMatch: {
            club: 'GRO',
            vs: 'AZ'
        },
        price: PLAYER4_PRICE,
        formattedPrice: nFormatter(PLAYER4_PRICE),
        position: 'FWD',
        points: 20,
        most_transferred: 8
    },
    {
        id: 15,
        image: 'player1.svg',
        clubImage: 'club_fc.svg',
        clubName: CLUB_FC,
        name: 'R. Nelson',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN'
        },
        price: PLAYER1_PRICE,
        formattedPrice: nFormatter(PLAYER1_PRICE),
        position: 'MID',
        points: 54,
        most_transferred: 2
    },
    {
        id: 16,
        image: 'player2.svg',
        clubImage: 'club_az.svg',
        clubName: CLUB_AZ,
        name: 'H. Veerman',
        nextMatch: {
            club: 'AZ',
            vs: 'GRO'
        },
        price: PLAYER2_PRICE,
        formattedPrice: nFormatter(PLAYER2_PRICE),
        position: 'DEF',
        points: 41,
        most_transferred: 4
    },
    {
        id: 17,
        image: 'player2.svg',
        clubImage: 'club_az.svg',
        clubName: CLUB_AZ,
        name: 'H. Veerman',
        nextMatch: {
            club: 'AZ',
            vs: 'GRO'
        },
        price: PLAYER9_PRICE,
        formattedPrice: nFormatter(PLAYER9_PRICE),
        position: 'DEF',
        points: 30,
        most_transferred: 9
    },
    {
        id: 18,
        image: 'player3.svg',
        clubImage: 'club_hee.svg',
        clubName: CLUB_HEE,
        name: 'L. Sane',
        nextMatch: {
            club: 'HEE',
            vs: 'FOR'
        },
        price: PLAYER10_PRICE,
        formattedPrice: nFormatter(PLAYER10_PRICE),
        position: 'DEF',
        points: 11,
        most_transferred: 10
    },
    {
        id: 19,
        image: 'player7.svg',
        clubImage: 'club_fr.svg',
        clubName: CLUB_FR,
        name: 'B. Nygren',
        nextMatch: {
            club: 'BAY',
            vs: 'BEN'
        },
        price: PLAYER7_PRICE,
        formattedPrice: nFormatter(PLAYER7_PRICE),
        position: 'MID',
        points: 12,
        most_transferred: 5
    },
    {
        id: 20,
        image: 'player1.svg',
        clubImage: 'club_fc.svg',
        clubName: CLUB_FC,
        name: 'R. Nelson',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN'
        },
        price: PLAYER8_PRICE,
        formattedPrice: nFormatter(PLAYER8_PRICE),
        position: 'MID',
        points: 10,
        most_transferred: 7
    },
]
