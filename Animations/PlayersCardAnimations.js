const playersCardAnimationDuration = 0.6
export const PlayersCardAnimation = {
    initial: {
        y: 0
    },
    slideDown: {
        y: 314,
        // height: '400px',
        transition: {
            duration: playersCardAnimationDuration,
        },
    },
    slideUp: {
        y: 0,
        // height: '770px',
        transition: {
            duration: playersCardAnimationDuration,
        },
    },
    hide: {
        y: 0,
        height: '0px',
        transition: {
            duration: 0.1,
        },
    }
};



// Sorting Filter Drop Down Animation
const sortingFilterDuration = 0.6
export const SortingFilterAnimation = {
    initial: {
        y: 0
    },
    slideDown: {
        y: 314,
        transition: {
            duration: sortingFilterDuration,
        },
    },
    slideUp: {
        y: 0,
        transition: {
            duration: sortingFilterDuration,
        },
    }
};



const playersCardAnimationDuration1 = 0.6
export const PlayersCardAnimation1 = {

    full: {
        height: '800px',
        transition: {
            duration: playersCardAnimationDuration,
        },
    },
    half: {
        height: '400px',
        transition: {
            duration: playersCardAnimationDuration,
        },
    },
    hide: {
        height: '0px',
        transition: {
            duration: playersCardAnimationDuration,
        },
    }
};