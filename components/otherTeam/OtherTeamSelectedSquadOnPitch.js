// Packages
import {useEffect} from "react";
import {AnimatePresence, motion, useAnimation} from "framer-motion";

// Components
import SelectedPlayerOnPitch from "components/mySquad/SelectedPlayerOnPitch";

import Div from "components/html/Div";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import {
    ZERO,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    ELEVEN,
    TWELVE,
    THIRTEEN,
    FOURTEEN
} from "constants/arrayIndexes";

// Animations
import {
    player6Animation,
    player9Type1Animation, player7Animation, player8Animation, player10Animation
} from "Animations/otherTeam/PlayerFormationAnimation";
import {ANIMATE, INITIAL} from "constants/animations";

// Styles
const getStyles = (R) => {
    return {
        commonPlayersStyle: {
            minWidth: R(120)
        },
        p2: {
            marginTop: R(15),
        },
        p5: {
            marginTop: R(15),
        },
        p7: {
            marginTop: R(-40)
        },
        commonPlayersStyle1: {
            marginLeft: R(12),
            marginRight: R(12),
        },
        container: {
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'center'
        },
        container2: {
            paddingLeft: R(72),
            paddingRight: R(70)
        },
        commonWidth: {}

    }
}

export default function OtherTeamSelectedSquadOnPitch({
  pickedPlayers,
  changeFormation,
}) {

    const STYLES = {...getStyles(R)}
    const controls = useAnimation()

    // Run-Animation
    useEffect(() => {
        if (!pickedPlayers.length) return
        if (changeFormation === ANIMATE) {
            controls.start('p6Animation')
            controls.start('p7Animation')
            controls.start('p8Animation')
            controls.start('p9Animation')
            // controls.start('p10Animation')
            // controls.start('p11Animation')
        } else if (changeFormation === INITIAL) {
            controls.start('p6Initial')
            controls.start('p7Initial')
            controls.start('p8Initial')
            controls.start('p9Initial')
        }

    }, [changeFormation])

    if (!pickedPlayers.length) return null

    // Build-Player
    const buildPlayer = (index) => {
        return {
            ...pickedPlayers[index],
        }
    }

    // All-Players
    const p1 = () => {
        return {
            animationVariants: null,
            player: {...buildPlayer(ZERO)},
            style: {...STYLES.commonPlayersStyle}
        }
    }

    const p2 = () => {
        return {
            animationVariants: null,
            player: {...buildPlayer(ONE)},
            style: {...STYLES.p2},
        }
    }

    const p3 = () => {
        return {
            animationVariants: null,
            player: {...buildPlayer(TWO)},
            style: {...STYLES.p3},
        }
    }

    const p4 = () => {
        return {
            animationVariants: null,
            player: {...buildPlayer(THREE)},
            style: {...STYLES.p4},
        }
    }

    const p5 = () => {
        return {
            animationVariants: null,
            player: {...buildPlayer(FOUR)},
            style: {...STYLES.p5},
        }
    }

    const p6 = () => {
        return {
            animationVariants: player6Animation(),
            player: {...buildPlayer(FIVE)},
            style: {...STYLES.commonPlayersStyle},
        }
    }

    const p7 = () => {
        return {
            animationVariants: player7Animation(),
            player: {...buildPlayer(SIX)},
            style: {
                ...STYLES.commonPlayersStyle,
                ...STYLES.p7,
            }
        }
    }

    const p8 = () => {
        return {
            animationVariants: player8Animation(),
            player: {...buildPlayer(SEVEN)},
            style: {...STYLES.commonPlayersStyle,}
        }
    }

    const p9 = () => {
        return {
            animationVariants: player10Animation(),
            player: {...buildPlayer(EIGHT)},
            style: {...STYLES.commonPlayersStyle1,}
        }
    }
    const p9type1 = (payload) => {
        return {
            animationVariants: player9Type1Animation(),
            player: {...buildPlayer(EIGHT)},
            style: {...STYLES.commonPlayersStyle1,},
            ...payload
        }
    }

    const p10 = () => {
        return {
            animationVariants: player10Animation(),
            player: {...buildPlayer(NINE)},
            style: {...STYLES.commonPlayersStyle1,}
        }
    }

    const p11 = () => {
        return {
            animationVariants: player10Animation(),
            player: {...buildPlayer(TEN)},
            style: {...STYLES.commonPlayersStyle1,}
        }
    }

    const p12 = () => {
        return {
            animationVariants: null,
            player: {...buildPlayer(ELEVEN)},
            style: {...STYLES.commonPlayersStyle,}
        }
    }

    const p13 = () => {
        return {
            animationVariants: null,
            player: {...buildPlayer(TWELVE)},
            style: {...STYLES.commonPlayersStyle,}
        }
    }

    const p14 = () => {
        return {
            animationVariants: null,
            player: {...buildPlayer(THIRTEEN)},
            style: {...STYLES.commonPlayersStyle,}
        }
    }

    const p15 = () => {
        return {
            animationVariants: null,
            player: {...buildPlayer(FOURTEEN)},
            style: {...STYLES.commonPlayersStyle,}
        }
    }

    const getPlayer = (props) => {
        const {
            animationVariants,
            player,
            style,
            // For Separate Type JSX Player
            type1,
            changeFormation
        } = props
        if (type1) {
            if (changeFormation === ANIMATE) {
                return (
                    <AnimatePresence>
                        <motion.div
                            variants={animationVariants}
                            initial={"initial"}
                            animate={"animate"}
                            exit={"exit"}
                            key={1}
                        >
                            <SelectedPlayerOnPitch
                                player={player}
                                changed={player.animationState}
                                style={{
                                    ...style,
                                    opacity: player.opacity
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>
                )
            } else {
                return (<AnimatePresence/>)
            }
        }

        return (
            <motion.div variants={animationVariants} animate={controls}>
                <SelectedPlayerOnPitch
                    player={player}
                    changed={player.animationState}
                    style={{
                        ...style,
                        opacity: player.opacity,
                    }}
                />
            </motion.div>
        )
    }

    return (
        <div style={{paddingTop: R(22)}}>
            {/*1*/}
            <Div style={STYLES.container}>
                {getPlayer(p1())}
            </Div>

            {/*2*/}
            <Div style={STYLES.container2} className={'flex items-center justify-between'} mt={4}>
                <Div w={200} className={'flex items-start justify-between'}>
                    {getPlayer(p2())}
                    {getPlayer(p3())}
                </Div>
                <Div w={200} className={'flex items-start justify-between'}>
                    {getPlayer(p4())}
                    {getPlayer(p5())}
                </Div>
            </Div>

            {/*3*/}
            <Div style={STYLES.container} mt={24} position={'relative'}>
                <Div position={'absolute'} top={0} left={190}>
                    {getPlayer(p9type1({changeFormation, type1: true}))}
                </Div>
                {getPlayer(p6())}
                {getPlayer(p7())}
                {getPlayer(p8())}
            </Div>
            {/*4*/}
            <Div style={STYLES.container} mt={30}>
                {getPlayer(p9())}
                {getPlayer(p10())}
                {getPlayer(p11())}
            </Div>
            {/*5*/}
            <Div style={STYLES.container} mt={50}>
                {getPlayer(p12())}
                {getPlayer(p13())}
                {getPlayer(p14())}
                {getPlayer(p15())}
            </Div>
        </div>
    )
}


