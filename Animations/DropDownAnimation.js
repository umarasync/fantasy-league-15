const duration = 0.3
const animation = {
    initial: {
        opacity: 0,
        y: '-30px'
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: duration,
        },
    },
    exit: {
        opacity: 0,
        y: '-30px',
        transition: {
            duration: duration,
        },
    },
};

export default animation