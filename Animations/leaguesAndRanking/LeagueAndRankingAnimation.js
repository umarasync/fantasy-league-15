// Utils
import R from "utils/getResponsiveValue";

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