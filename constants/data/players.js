// Utils
import {nFormatter, shuffle} from "utils/helpers";

// Constants
import {
    // Clubs
    CLUB_AJAX,
    CLUB_AZ,
    CLUB_FC,
    CLUB_FR,
    CLUB_HEE,
    CLUB_ZWO,

    // Statuses
    STATUS_SUSPENDED,
    STATUS_INJURED,
    STATUS_FIT,

    //POSITIONS
    POSITION_MID,
    POSITION_GK,
    POSITION_DEF,
    POSITION_FWD, POSITION_ALL,
} from "constants/data/filters";
import PLAYER_POINTS from "constants/data/playerPoints";

const PLAYER1_PRICE = 6400000
const PLAYER2_PRICE = 23000000
const PLAYER3_PRICE = 2000000
const PLAYER4_PRICE = 7300000
const PLAYER5_PRICE = 3100000
const PLAYER6_PRICE = 1200000
const PLAYER7_PRICE = 370000
const PLAYER8_PRICE = 2400000
const PLAYER9_PRICE = 15000000
const PLAYER10_PRICE = 100000

export const PLAYERS_INITIAL = [
    {
        id: 1,
        image: '/images/player1.png',
        clubImage: '/images/club_fc.png',
        clubName: CLUB_FC,
        status: STATUS_FIT,
        name: 'R. Nelson',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN',
            matchType: 'H' //A-away H-home
        },
        price: PLAYER1_PRICE,
        formattedPrice: nFormatter(PLAYER1_PRICE),
        position: POSITION_MID,
        points: 14,
        most_transferred: 2,

        picked: 12,
        pickedAsCaptain: 6,
        recommended: true,
        penaltyTaker: false,
    },
    {
        id: 2,
        image: '/images/player2.png',
        clubImage: '/images/club_az.png',
        clubName: CLUB_AZ,
        status: STATUS_SUSPENDED,
        statusImage: '/images/suspended.png',
        name: 'H. Veerman',
        nextMatch: {
            club: 'AZ',
            vs: 'GRO',
            matchType: 'A'
        },
        price: PLAYER2_PRICE,
        formattedPrice: nFormatter(PLAYER2_PRICE),
        position: POSITION_DEF,
        points: 19,
        most_transferred: 4,

        picked: 15,
        pickedAsCaptain: 0,
        recommended: true,
        penaltyTaker: true,
    },
    {
        id: 3,
        image: '/images/player3.png',
        clubImage: '/images/club_hee.png',
        clubName: CLUB_HEE,
        status: STATUS_FIT,
        name: 'L. Sane',
        nextMatch: {
            club: 'HEE',
            vs: 'FOR',
            matchType: 'A'
        },
        price: PLAYER3_PRICE,
        formattedPrice: nFormatter(PLAYER3_PRICE),
        position: POSITION_FWD,
        points: 32,
        most_transferred: 6,

        picked: 3,
        pickedAsCaptain: 3,
        recommended: true,
        penaltyTaker: true,
    },
    {
        id: 4,
        image: '/images/player4.png',
        clubImage: '/images/club_ajax.png',
        clubName: CLUB_AJAX,
        status: STATUS_FIT,
        name: 'N. Bannis',
        nextMatch: {
            club: 'GRO',
            vs: 'AZ',
            matchType: 'H'
        },
        price: PLAYER4_PRICE,
        formattedPrice: nFormatter(PLAYER4_PRICE),
        position: POSITION_GK,
        points: 31,
        most_transferred: 8,

        picked: 2,
        pickedAsCaptain: 4,
        recommended: true,
        penaltyTaker: false,
    },
    {
        id: 5,
        image: '/images/player5.png',
        clubImage: '/images/club_zwo.png',
        clubName: CLUB_ZWO,
        status: STATUS_INJURED,
        statusImage: '/images/injured.png',
        name: 'T. Tekie',
        nextMatch: {
            club: 'ZWO',
            vs: 'AJA',
            matchType: 'A'
        },
        price: PLAYER5_PRICE,
        formattedPrice: nFormatter(PLAYER5_PRICE),
        position: POSITION_MID,
        points: 59,
        most_transferred: 1,

        picked: 20,
        pickedAsCaptain: 0,
        recommended: true,
        penaltyTaker: false,
    },
    {
        id: 6,
        image: '/images/player6.png',
        clubImage: '/images/club_fr.png',
        clubName: CLUB_FR,
        status: STATUS_FIT,
        name: 'M. Nelom',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN',
            matchType: 'H'
        },
        price: PLAYER6_PRICE,
        formattedPrice: nFormatter(PLAYER6_PRICE),
        position: POSITION_GK,
        points: 13,
        most_transferred: 3,

        picked: 16,
        pickedAsCaptain: 9,
        recommended: true,
        penaltyTaker: false,
    },
    {
        id: 7,
        image: '/images/player7.png',
        clubImage: '/images/club_fr.png',
        clubName: CLUB_FR,
        status: STATUS_INJURED,
        statusImage: '/images/injured.png',
        name: 'B. Nygren',
        nextMatch: {
            club: 'BAY',
            vs: 'BEN',
            matchType: 'A'
        },
        price: PLAYER7_PRICE,
        formattedPrice: nFormatter(PLAYER7_PRICE),
        position: POSITION_FWD,
        points: 42,
        most_transferred: 5,

        picked: 30,
        pickedAsCaptain: 0,
        recommended: true,
        penaltyTaker: false,
    },
    {
        id: 8,
        image: '/images/player1.png',
        clubImage: '/images/club_fc.png',
        clubName: CLUB_FC,
        status: STATUS_FIT,
        name: 'R. Nelson',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN',
            matchType: 'A'
        },
        price: PLAYER8_PRICE,
        formattedPrice: nFormatter(PLAYER8_PRICE),
        position: POSITION_MID,
        points: 24,
        most_transferred: 7,

        picked: 40,
        pickedAsCaptain: 0,
        recommended: true,
        penaltyTaker: false,
    },
    {
        id: 9,
        image: '/images/player2.png',
        clubImage: '/images/club_az.png',
        clubName: CLUB_AZ,
        status: STATUS_FIT,
        name: 'H. Veerman',
        nextMatch: {
            club: 'AZ',
            vs: 'GRO',
            matchType: 'H'
        },
        price: PLAYER9_PRICE,
        formattedPrice: nFormatter(PLAYER9_PRICE),
        position: POSITION_DEF,
        points: 13,
        most_transferred: 9,

        picked: 33,
        pickedAsCaptain: 18,
        recommended: true,
        penaltyTaker: false,
    },
    {
        id: 10,
        image: '/images/player3.png',
        clubImage: '/images/club_hee.png',
        clubName: CLUB_HEE,
        status: STATUS_FIT,
        name: 'L. Sane',
        nextMatch: {
            club: 'HEE',
            vs: 'FOR',
            matchType: 'A'
        },
        price: PLAYER10_PRICE,
        formattedPrice: nFormatter(PLAYER10_PRICE),
        position: POSITION_DEF,
        points: 16,
        most_transferred: 10,

        picked: 40,
        pickedAsCaptain: 0,
        recommended: true,
        penaltyTaker: false,
    },
]


export const DUMMY_PLAYERS = [
    ...PLAYERS_INITIAL,
    ...PLAYERS_INITIAL,
    ...PLAYERS_INITIAL,
]

export const PLAYERS = DUMMY_PLAYERS.map((player, index) =>  {
    return {
        ...player,
        id: index + 1,
        pointsInfo: PLAYER_POINTS
    }
})


// CALCULATIONS for AUTO PICK feature
export const ALL_PLAYERS_INDEXES = {
    [POSITION_ALL] : [],
    [POSITION_MID] : [],
    [POSITION_GK] : [],
    [POSITION_DEF] : [],
    [POSITION_FWD] : [],
}

PLAYERS.reduce(function(a, e, i) {
    ALL_PLAYERS_INDEXES[e.position].push(i);
    return ALL_PLAYERS_INDEXES;
}, []);


export const SELECTED_PLAYERS = {
    [POSITION_MID]: [],
    [POSITION_GK]: [],
    [POSITION_DEF]: [],
    [POSITION_FWD]: [],
}
