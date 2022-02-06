// Constants
import colors from "constants/colors";

const duration = 0.6

export const scrollAnimation = {
    scroll: ({moved}) => {
        return {
            x: -moved,
            transition: {
                duration: duration,
            },
        }
    },
};

export const tabsBorderAnimation = () => {
    const transition = {duration: duration}
    return {
        changeBorderWidth: ({width}) => {
            return {
                width: width,
                transition
            }
        }
    };
}

export const subHeadingAnimation = () => {
    return (
        {
            changeTextColor: ({lgwr}) => {
                return {
                    color: lgwr.active ? colors.white : colors.regent_grey,
                    transition: {
                        duration: duration
                    }
                }
            }
        }
    )
};


export const leagueBoardContentAnimation = () => {
    const duration = 0.5
    return {
        initial: () => {
            return {
                opacity: 0,
            }
        },
        animate: {
            opacity: 1,
            transition: {
                duration: duration,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: duration,
            },
        },
    }
};
