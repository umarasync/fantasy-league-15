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

export const player6Animation = () => {
    return {
        p6Initial: animateTo(0, 0),
        p6Animation: animateTo(-75, 40),
    }
};

export const player7Animation = () => {
    return {
        p7Initial: animateTo(0, 0),
        p7Animation: animateTo(60, 40)
    }
};

export const player8Animation = () => {
    return {
        p8Initial: animateTo(0, 0),
        p8Animation: animateTo(70, 40)
    }
};


export const fadeInAndOutAnimation = () => {
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

export const player10Animation = () => {
    return {
        p10Initial: animateTo(0, 0),
        p10Animation: animateTo(55, 0)
    }
};

export const player11Animation = () => {
    return {
        p11Initial: animateTo(0, 0),
        p11Animation: animateTo(110, -50)
    }
};
