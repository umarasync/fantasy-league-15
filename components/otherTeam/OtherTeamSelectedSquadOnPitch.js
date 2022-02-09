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
    fadeInAndOutAnimation, player7Animation, player8Animation, player10Animation
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
        rowFourth: {
            gridColumn: 1,
            gridRow: 1
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
  playersFormationAnimation,
}) {

    const STYLES = {...getStyles(R)}
    const controls = useAnimation()

    // Run-Animation
    useEffect(() => {
        if (!pickedPlayers.length) return
        if (playersFormationAnimation === ANIMATE) {
            controls.start('p6Animation')
            controls.start('p7Animation')
            controls.start('p8Animation')
            controls.start('p9Animation')
        } else if (playersFormationAnimation === INITIAL) {
            controls.start('p6Initial')
            controls.start('p7Initial')
            controls.start('p8Initial')
            controls.start('p9Initial')
        }
    }, [playersFormationAnimation])

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
            animationVariants: null,
            player: {...buildPlayer(EIGHT)},
            style: {...STYLES.commonPlayersStyle1,}
        }
    }
    const p9type1 = (payload) => {
        return {
            animationVariants: fadeInAndOutAnimation(),
            player: {...buildPlayer(EIGHT)},
            style: {...STYLES.commonPlayersStyle1,},
            ...payload
        }
    }

    const p10 = () => {
        return {
            animationVariants: null,
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

    // Player-JSX
    const renderPlayer = (props) => {
        const {
            animationVariants,
            player,
            style,
        } = props

        return (
            <motion.div variants={animationVariants} animate={controls}>
                <SelectedPlayerOnPitch
                    player={player}
                    changed={player.toggleAnimation}
                    style={{
                        ...style,
                        opacity: player.opacity,
                    }}
                />
            </motion.div>
        )
    }

    // A-Different-Type-Player-JSX
    const renderPlayerType1 = (props) => {
        const {
            animationVariants,
            player,
            style,
            playersFormationAnimation
        } = props
        if (playersFormationAnimation === ANIMATE) {
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
                            changed={player.toggleAnimation}
                            style={{
                                ...style,
                                opacity: player.opacity
                            }}
                        />
                    </motion.div>
                </AnimatePresence>
            )
        } else if(playersFormationAnimation === INITIAL) {
            return (<AnimatePresence/>)
        }
    }

    const renderForthRow = ({playersFormationAnimation}) => {
        if(playersFormationAnimation === ANIMATE) {
            return (<AnimatePresence>
                <motion.div
                    variants={fadeInAndOutAnimation()}
                    initial={"initial"}
                    animate={"animate"}
                    exit={"exit"}
                    key={1}
                    style={STYLES.rowFourth}
                >
                    <Div style={STYLES.container} mt={35}>
                        <Div mr={10}>{renderPlayer(p10())}</Div>
                        <Div ml={10}>{renderPlayer(p11())}</Div>
                    </Div>
                </motion.div>
            </AnimatePresence>)
        } else if (playersFormationAnimation === INITIAL) {
            return (<AnimatePresence>
                <motion.div
                    variants={fadeInAndOutAnimation()}
                    initial={"initial"}
                    animate={"animate"}
                    exit={"exit"}
                    key={2}
                    style={STYLES.rowFourth}
                >
                    <Div style={STYLES.container} mt={35}>
                        {renderPlayer(p9())}
                        {renderPlayer(p10())}
                        {renderPlayer(p11())}
                    </Div>
                </motion.div>
            </AnimatePresence>)
        }
    }

    return (
        <div style={{paddingTop: R(22)}}>
            {/*1*/}
            <Div style={STYLES.container}>
                {renderPlayer(p1())}
            </Div>

            {/*2*/}
            <Div style={STYLES.container2} className={'flex items-center justify-between'} mt={4}>
                <Div w={200} className={'flex items-start justify-between'}>
                    {renderPlayer(p2())}
                    {renderPlayer(p3())}
                </Div>
                <Div w={200} className={'flex items-start justify-between'}>
                    {renderPlayer(p4())}
                    {renderPlayer(p5())}
                </Div>
            </Div>

            {/*3*/}
            <Div style={STYLES.container} mt={24} position={'relative'}>
                <Div position={'absolute'} top={0} left={190}>
                    {renderPlayerType1(p9type1({playersFormationAnimation}))}
                </Div>
                {renderPlayer(p6())}
                {renderPlayer(p7())}
                {renderPlayer(p8())}
            </Div>
            {/*4*/}
            <Div className={'grid'}>
                {renderForthRow({playersFormationAnimation})}
            </Div>
            {/*5*/}
            <Div style={STYLES.container} mt={45}>
                {renderPlayer(p12())}
                {renderPlayer(p13())}
                {renderPlayer(p14())}
                {renderPlayer(p15())}
            </Div>
        </div>
    )
}


