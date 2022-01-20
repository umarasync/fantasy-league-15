const duration = 0.7

const ClubImageAnimation = {
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

export default ClubImageAnimation