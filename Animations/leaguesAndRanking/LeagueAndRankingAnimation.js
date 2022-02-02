// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

const duration = 0.5

export const tabsBorderAnimation = () => {
    const transition = {duration: duration}
    return {
        moveBorder: ({leftOffset}) => {
            return {
                left: leftOffset,
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
                    color: lgwr.active ? colors.black_rock : colors.regent_grey,
                    transition: {
                        duration: duration
                    }
                }
            }
        }
    )
};