const duration = 0.7

const SelectedPlayerOnPitchAnimation = {
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
};


export const TextUnderPlayerNameAnimation = {
    initial: () => {
        return {
            opacity: 0,
        }
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.4,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.4,
        },
    },
};

export default SelectedPlayerOnPitchAnimation