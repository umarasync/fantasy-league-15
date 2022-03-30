// Utils
import R from "utils/getResponsiveValue";

const duration = 0.7

const animateTo = (x, y) => {
    return {
        x: R(x),
        y: R(y),
        transition: {
            duration: duration,
        },
    }
}

export const player5Animation = () => {
    return {
        p5Initial: animateTo(0, 0),
        p5Animation: animateTo(-30, 68),
    }
};

export const player6Animation = () => {
    return {
        p6Initial: animateTo(0, 0),
        p6Animation: animateTo(-60, 0)
    }
};

export const player9Animation = () => {
    return {
        p9Initial: animateTo(0, 0),
        p9Animation: animateTo(40, 0)
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
        p11Animation: animateTo(100, -45)
    }
};