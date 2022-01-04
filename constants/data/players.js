// Utils
import {nFormatter} from "utils/helpers";

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
    STATUS_FIT

} from "constants/data/filters";

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
        status: STATUS_FIT,
        name: 'R. Nelson',
        nextMatch: {
            club: 'GRO',
            vs: 'BEN'
        },
        price: PLAYER1_PRICE,
        formattedPrice: nFormatter(PLAYER1_PRICE),
        position: 'MID',
        points: 14,
        most_transferred: 2,

        picked: 12,
        pickedAsCaptain: 6,
        recommended: true,
        penaltyTaker: false,
    },
    {
        id: 2,
        image: 'player2.svg',
        clubImage: 'club_az.svg',
        clubName: CLUB_AZ,
        status: STATUS_SUSPENDED,
        name: 'H. Veerman',
        nextMatch: {
            club: 'AZ',
            vs: 'GRO'
        },
        price: PLAYER2_PRICE,
        formattedPrice: nFormatter(PLAYER2_PRICE),
        position: 'DEF',
        points: 19,
        most_transferred: 4,

        picked: 15,
        pickedAsCaptain: 0,
        recommended: true,
        penaltyTaker: true,
    },
    {
        id: 3,
        image: 'player3.svg',
        clubImage: 'club_hee.svg',
        clubName: CLUB_HEE,
        status: STATUS_FIT,
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
        status: STATUS_FIT,
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
        status: STATUS_INJURED,
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
        status: STATUS_FIT,
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
        status: STATUS_INJURED,
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
        status: STATUS_FIT,
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
        status: STATUS_FIT,
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
        status: STATUS_FIT,
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

]
