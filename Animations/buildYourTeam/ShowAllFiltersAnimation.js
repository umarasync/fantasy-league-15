const duration = 0.6

const showAllFiltersAnimation = {
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

export default showAllFiltersAnimation