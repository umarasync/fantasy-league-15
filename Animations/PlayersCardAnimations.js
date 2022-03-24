// Constants
import R from "utils/getResponsiveValue";

const playersCardAnimationDuration = 0.6

export const playerPanelAnimation = () => {
    return {
        initial: {
            y: 0
        },
        slideDown: {
            y: R(314),
            transition: {
                duration: playersCardAnimationDuration,
            },
        },
        slideUp: {
            y: 0,
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
    }
};

export const playersPanelHeightAnimation = () => {
    return {
        full: {
            height: R(800),
            transition: {
                duration: playersCardAnimationDuration,
            },
        },
        half: {
            height: R(400),
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
    }
};