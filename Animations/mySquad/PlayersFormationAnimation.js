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

export const Player5Animation = {
    p5Initial: animateTo(0, 0),
    p5Animation: animateTo(-30, 68),
};

export const Player6Animation = {
    p6Initial: animateTo(0, 0),
    p6Animation: animateTo(-60, 0)
};

export const Player9Animation = {
    p9Initial: animateTo(0, 0),
    p9Animation: animateTo(40, 0)
};

export const Player10Animation = {
    p10Initial: animateTo(0, 0),
    p10Animation: animateTo(55, 0)
};

export const Player11Animation = {
    p11Initial: animateTo(0, 0),
    p11Animation: animateTo(100, -45)
};