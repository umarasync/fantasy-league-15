// Constants
import colors from "constants/colors";

// Utils
import R from "utils/getResponsiveValue";

export const finishedMatchDetailsAnimation = () => {
    const transition = {duration: 0.6}

    return {
        initial: {
            opacity: 0,
            maxHeight: 0,
            transition,
        },
        animate: {
            opacity: 1,
            maxHeight: 2000,
            transition,
        },
        exit: {
            opacity: 0,
            maxHeight: 0,
            transition,
        },
    }
};


const duration = 0.5

export const tabsAnimation = () => {
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
            left: R(211),
            transition
        }
    };
}

export const contentContainerAnimation = () => {
    const transition = {duration: duration}
    return {
        changeHeight: ({height}) => {
            return {
                height,
                transition
            }
        }
    }
}

export const highlightsTabContentAnimation = () => {
    const transition = {duration: duration}
    return {
        moveLeft: {
            marginLeft: '-110%',
            // maxHeight: 0,
            transition
        },
        moveRight: {
            marginLeft: 0,
            // maxHeight: 2000,
            transition
        }
    };
}

export const statisticsPointsTabContentAnimation = () => {
    const transition = {duration: duration}
    return {
        moveLeft: {
            marginLeft: 0,
            // maxHeight: 2000,
            transition
        },
        moveRight: {
            marginLeft: '110%',
            // maxHeight: 0,
            transition
        }
    };
}