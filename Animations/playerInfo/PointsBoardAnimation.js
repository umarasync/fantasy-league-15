// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from 'constants/colors'

const duration = 0.2
export const pointsTabsAnimation = () => {
    const transition = {duration: duration}
    return {
        initial: {
            color: colors.regent_grey,
            transition
        },
        animate: {
            color: colors.black_rock,
            transition
        }
    };
}

export const tabsBorderAnimation = () => {
    const transition = {duration: duration}
    return {
        tabOne: {
            left: 0,
            transition
        },
        tabTwo: {
            left: R(203),
            transition
        }
    };
}


export const matchPointsTabContentAnimation = () => {
    const transition = {duration: duration}
    return {
        moveLeft: {
            left: '-110%',
            transition
        },
        moveRight: {
            left: 0,
            transition
        }
    };
}

export const seasonPointsTabContentAnimation = () => {
    const transition = {duration: duration}
    return {
        moveLeft: {
            left: 0,
            transition
        },
        moveRight: {
            left: '110%',
            transition
        }
    };
}

