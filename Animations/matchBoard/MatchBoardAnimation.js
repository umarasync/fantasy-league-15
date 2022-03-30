// Constants
import colors from "constants/colors";

const duration = 0.7

export const scrollAnimation = {
    scroll: ({gw, moved}) => {
        return {
            x: -moved,
            opacity: gw.active || gw.lastActive ? 1 : 0.5,
            transition: {
                duration: duration,
            },
        }
    },
};

export const borderAnimation = {
    borderWidth: ({borderWidth}) => {
        return {
            width: borderWidth,
            transition: {
                duration: duration
            }
        }
    }
};

export const subHeadingAnimation = {
    changeTextColor: (gw) => {
        return {
            color: gw.active ? colors.black_rock : colors.regent_grey,
            transition: {
                duration: duration
            }
        }
    }
};