const duration = 0.5

export const PlayerOnPitchAnimation = {
    initial: ({initialOpacity}) => {
        return {
            opacity: initialOpacity,
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
};

export const PlayerOnPitchTransferAnimation = {
    initial: ({initialOpacity}) => {
        return {
            opacity: initialOpacity,
        }
    },
    animate: {
        opacity: 0.5,
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
};


