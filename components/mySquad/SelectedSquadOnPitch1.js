// Packages
import {useEffect} from "react";
import {motion, useAnimation} from "framer-motion";

// Components
import SelectedPlayerOnPitch from "components/mySquad/SelectedPlayerOnPitch";
import Div from "components/html/Div";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import {ZERO, ONE,TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, ELEVEN, TWELVE, THIRTEEN, FOURTEEN} from "constants/arrayIndexes";

// Animations
import {Player5Animation, Player6Animation, Player9Animation, Player10Animation, Player11Animation} from "Animations/mySquad/PlayersFormationAnimation";
import {ANIMATE, INITIAL} from "constants/animations";

// Styles
const getStyles = (R) => {
    return {
        commonPlayersStyle: {
            minWidth: R(120)
        },
        commonPlayersStyle1: {
            paddingLeft: R(10),
            paddingRight: R(10),
            minWidth: R(100)
        },
        container: {
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'center'
        },
        commonWidth: {

        }

    }
}

export default function SelectedSquadOnPitch ({
    pickedPlayers,
    onPlayerChange,
    onPlayerClick,
    changeFormation,
    tripleCaptainApplied,
    benchBoostApplied
}){

    const STYLES =  { ... getStyles(R) }
    const controls = useAnimation()

    useEffect(() => {
        if(!pickedPlayers.length) return
        if(changeFormation === ANIMATE) {
            controls.start('p5Animation')
            controls.start('p6Animation')
            controls.start('p9Animation')
            controls.start('p10Animation')
            controls.start('p11Animation')
        }else if(changeFormation === INITIAL) {}

    }, [changeFormation])

    if(!pickedPlayers.length) return null

    const buildPlayer = (index) => {
        return {
            ...pickedPlayers[index],
            onPlayerChange: (player) => onPlayerChange(player, index),
            onPlayerClick: (player) => onPlayerClick(player, index),
            tripleCaptainApplied,
            benchBoostApplied
        }
    }

    const p1 = buildPlayer(ZERO)
    const p2 = buildPlayer(ONE)
    const p3 = buildPlayer(TWO)
    const p4 = buildPlayer(THREE)
    const p5 = buildPlayer(FOUR)
    const p6 = buildPlayer(FIVE)
    const p7 = buildPlayer(SIX)
    const p8 = buildPlayer(SEVEN)
    const p9 = buildPlayer(EIGHT)
    const p10 = buildPlayer(NINE)
    const p11 = buildPlayer(TEN)
    const p12 = buildPlayer(ELEVEN)
    const p13 = buildPlayer(TWELVE)
    const p14 = buildPlayer(THIRTEEN)
    const p15 = buildPlayer(FOURTEEN)

    return(
        <div style={{paddingTop: R(22)}}>
            {/*1*/}
            <Div style={STYLES.container}>
                <SelectedPlayerOnPitch
                    player={p1}
                    changed={p1.animationState}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p1.opacity
                    }}
                />
            </Div>
            {/*2*/}
            <Div style={STYLES.container} mt={24}>
                <SelectedPlayerOnPitch
                    player={p2}
                    changed={p2.animationState}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p2.opacity
                    }}
                />
                <SelectedPlayerOnPitch
                    player={p3}
                    changed={p3.animationState}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p3.opacity
                    }}
                />
                    <SelectedPlayerOnPitch
                        player={p4}
                        changed={p4.animationState}
                        style={{
                            ...STYLES.commonPlayersStyle,
                            opacity: p4.opacity
                        }}
                    />
            </Div>
            {/*3*/}
            <Div style={STYLES.container} mt={24}>
                <motion.div variants={Player5Animation} animate={controls}>
                    <SelectedPlayerOnPitch
                        player={p5}
                        changed={p5.animationState}
                        style={{
                            ...STYLES.commonPlayersStyle,
                            opacity: p5.opacity
                        }}
                    />
                </motion.div>
                <motion.div variants={Player6Animation} animate={controls}>
                    <SelectedPlayerOnPitch
                        player={p6}
                        changed={p6.animationState}
                        style={{
                            ...STYLES.commonPlayersStyle,
                            opacity: p6.opacity
                        }}
                    />
                </motion.div>
                <motion.div variants={Player6Animation} animate={controls}>
                    <SelectedPlayerOnPitch
                        player={p7}
                        changed={p7.animationState}
                        style={{
                            ...STYLES.commonPlayersStyle,
                            opacity: p7.opacity
                        }}
                    />
                </motion.div>
                <motion.div variants={Player6Animation} animate={controls}>
                    <SelectedPlayerOnPitch
                        player={p8}
                        changed={p8.animationState}
                        style={{
                            ...STYLES.commonPlayersStyle,
                            opacity: p8.opacity
                        }}
                    />
                </motion.div>
            </Div>
            {/*4*/}
            <Div style={STYLES.container} mt={24}>
                <motion.div variants={Player9Animation} animate={controls}>
                    <SelectedPlayerOnPitch
                        player={p9}
                        changed={p9.animationState}
                        style={{
                            ...STYLES.commonPlayersStyle1,
                            opacity: p9.opacity
                        }}
                    />
                </motion.div>

                <motion.div variants={Player10Animation} animate={controls}>
                    <SelectedPlayerOnPitch
                        player={p10}
                        changed={p10.animationState}
                        style={{
                            ...STYLES.commonPlayersStyle1,
                            opacity: p10.opacity
                        }}
                    />
                </motion.div>

                <motion.div variants={Player11Animation} animate={controls}>
                    <SelectedPlayerOnPitch
                        player={p11}
                        changed={p11.animationState}
                        style={{
                            ...STYLES.commonPlayersStyle1,
                            opacity: p11.opacity
                        }}
                    />
                </motion.div>
            </Div>
            {/*5*/}
            <Div style={STYLES.container} mt={50}>
                <SelectedPlayerOnPitch
                    player={p12}
                    changed={p12.animationState}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p12.opacity
                    }}
                />
                <SelectedPlayerOnPitch
                    player={p13}
                    changed={p13.animationState}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p13.opacity
                    }}
                />
                <SelectedPlayerOnPitch
                    player={p14}
                    changed={p14.animationState}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p14.opacity
                    }}
                />
                <SelectedPlayerOnPitch
                    player={p15}
                    changed={p15.animationState}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p15.opacity
                    }}
                />
            </Div>
        </div>
    )
}