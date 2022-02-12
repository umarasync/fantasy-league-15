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


export const getDropDownAnimation = ( y = '-50px') => {
    const transition = {duration}
    return {
        initial: {
            opacity: 0,
            y
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: transition,
        },
        exit: {
            opacity: 0,
            y,
            transition: transition,
        },
    }
}

export default animation