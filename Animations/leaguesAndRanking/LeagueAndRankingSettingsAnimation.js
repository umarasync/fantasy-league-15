const duration = 0.5

export const leagueSettingsBoardAnimation = () => {
    return {
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
    }
};

export const getRenameButtonAnimation = () => leagueSettingsBoardAnimation()