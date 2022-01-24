const MATCH_POINTS = [0,1,2,3,4,5,6,7,8,9,10].map((item, index) => {
    return {
        gw: 1,
        opp: {
            clubImage: 'club_ajax.png',
            clubName: 'GRO',
            matchType: 'H',
            matchResult: '3:1'
        },
        pts: 2,
        mp: 45,
        gs: 0,
        a: 1,
        cs: 0,
        gc: 0,
        og: 1,
        ps: 1,
        pm: 50
    }
})

const SEASON_POINTS = [
    {
        title: '292 minutes played',
        points: 6,
        icon: ''
    },
    {
        title: '1 goal scored',
        points: 5,
        icon: ''
    },
    {
        title: '1 assists',
        points: 12,
        icon: ''
    },
    {
        title: '1 goals from outside the box',
        points: 1,
        icon: ''
    },
    {
        title: 'player of the match',
        points: 3,
        icon: 'club_ajax.png'
    },

]

const PLAYER_POINTS = {
        previousWeekPoints: 17,
        weeklyPoints: 32,
        totalPoints: 80,
        matchPoints: MATCH_POINTS,
        seasonPoints: SEASON_POINTS,
}


export default PLAYER_POINTS