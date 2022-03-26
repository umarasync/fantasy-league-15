export const fadeInAndOutAnimation1 = (duration = 0.3) => {
    return {
        initial: {
            opacity: 0.3,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: duration,
            },
        },
        exit: {
            opacity: 0.3,
            transition: {
                duration: duration,
            },
        },
    }
};