const duration = 0.7

const animateTo = (x, y) => {
    return {
        x: x,
        y: y,
        transition: {
            duration: duration,
        },
    }
}

export const Player6Animation = {
    p6Initial: animateTo(0, 0),
    p6Animation: animateTo(-75, 40),
};

export const Player7Animation = {
    p7Initial: animateTo(0, 0),
    p7Animation: animateTo(60, 40)
};

export const Player8Animation = {
    p8Initial: animateTo(0, 0),
    p8Animation: animateTo(70, 40)
};

export const getPlayer9Animation = () => {
    // return {
    //     p9Initial: {
    //         opacity: 0,
    //         transition: {
    //             duration: duration,
    //         },
    //     },
    //     p9Animation: {
    //         opacity: 1,
    //         transition: {
    //             duration: duration,
    //         },
    //     },
    // }

    return {
        initial: {
            opacity: 0,
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
    }
};

export const Player10Animation = {
    p10Initial: animateTo(0, 0),
    p10Animation: animateTo(55, 0)
};

export const Player11Animation = {
    p11Initial: animateTo(0, 0),
    p11Animation: animateTo(110, -50)
};