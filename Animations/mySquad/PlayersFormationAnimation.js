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

const player5Animation = () => {
    return {
        p5Initial: animateTo(0, 0),
        p5Animation: animateTo(-30, 68),
    }
};

const player6Animation = () => {
    return {
        p6Initial: animateTo(0, 0),
        p6Animation: animateTo(-60, 0)
    }
};

const player7Animation = () => player6Animation()
const player8Animation = () => player6Animation()

const player9Animation = () => {
    return {
        p11Initial: animateTo(0, 0),
        p11Animation: animateTo(100, -45)
    }
};

const player10Animation = () => {
    return {
        p10Initial: animateTo(0, 0),
        p10Animation: animateTo(55, 0)
    }
};

const player11Animation = () => {
    return {
        p9Initial: animateTo(0, 0),
        p9Animation: animateTo(60, 0)
    }
};

export default function () {
    return {
        p5: player5Animation,
        p6: player6Animation,
        p7: player7Animation,
        p8: player8Animation,
        p9: player9Animation,
        p10: player10Animation,
        p11: player11Animation,
    }
}