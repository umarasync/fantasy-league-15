import colors from "../../constants/colors";
import R from "../../utils/getResponsiveValue";

export const finishedMatchDetailsAnimation = () => {
    const duration = 0.5
    return {
        initial: {
            opacity: 0,
            height: 0
        },
        animate: {
            opacity: 1,
            height: 100,
            transition: {
                duration: duration,
            },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: {
                duration: duration,
            },
        },
    }
};


const duration = 0.4

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


export const highlightsTabContentAnimation = () => {
    const transition = {duration: duration}
    return {
        moveLeft: {
            marginLeft: '-110%',
            transition
        },
        moveRight: {
            marginLeft: 0,
            transition
        }
    };
}

export const statisticsPointsTabContentAnimation = () => {
    const transition = {duration: duration}
    return {
        moveLeft: {
            marginLeft: 0,
            transition
        },
        moveRight: {
            marginLeft: '110%',
            transition
        }
    };
}