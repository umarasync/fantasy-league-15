const duration = 0.6

const showAllFiltersAnimation = {
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

export default showAllFiltersAnimation