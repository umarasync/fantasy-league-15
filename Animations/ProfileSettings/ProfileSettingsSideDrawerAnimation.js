export const getSideDrawerAnimation = (duration = 0.5) => {
    return {
        initial: {
            opacity: 0,
            right: -540,
        },
        animate: {
            opacity: 1,
            right: 0,
            transition: {
                duration: duration,
            },
        },
        exit: {
            opacity: 0,
            right: -540,
            transition: {
                duration: duration,
            },
        },
    }
};