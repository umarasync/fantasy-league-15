// Packages
import {useEffect} from "react";
import {motion, useAnimation} from "framer-motion";

// Components
import OtherTeamSelectedPlayerOnPitch from "components/otherTeam/OtherTeamSelectedPlayerOnPitch";

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
    Player5Animation,
    Player6Animation,
    Player9Animation,
    Player10Animation,
    Player11Animation
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
            marginLeft: R(10),
            marginRight: R(10),
            minWidth: R(90)
        },
        container: {
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'center'
        },
        container2: {
          paddingLeft: R(80),
          paddingRight: R(80)
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

    useEffect(() => {
        if (!pickedPlayers.length) return
        if (changeFormation === ANIMATE) {
            controls.start('p5Animation')
            controls.start('p6Animation')
            controls.start('p9Animation')
            controls.start('p10Animation')
            controls.start('p11Animation')
        } else if (changeFormation === INITIAL) {
        }

    }, [changeFormation])

    if (!pickedPlayers.length) return null

    const buildPlayer = (index) => {
        return {
            ...pickedPlayers[index],
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

    return (
        <div style={{paddingTop: R(22)}}>
            {/*1*/}
            <Div style={STYLES.container}>
                <OtherTeamSelectedPlayerOnPitch
                    player={p1}
                    changed={p1.animationState}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p1.opacity
                    }}
                />
            </Div>

            {/*2*/}
            <Div style={STYLES.container2} className={'flex items-center justify-between'} mt={4}>
                <Div w={200} className={'flex items-start justify-between'}>
                    <OtherTeamSelectedPlayerOnPitch
                        player={p2}
                        changed={p2.animationState}
                        style={{
                            ...STYLES.p2,
                            opacity: p2.opacity
                        }}
                    />
                    <OtherTeamSelectedPlayerOnPitch
                        player={p3}
                        changed={p3.animationState}
                        style={{
                            ...STYLES.p3,
                            opacity: p3.opacity
                        }}
                    />
                </Div>
                <Div w={200} className={'flex items-start justify-between'}>
                    <OtherTeamSelectedPlayerOnPitch
                        player={p4}
                        changed={p4.animationState}
                        style={{
                            ...STYLES.p4,
                            opacity: p4.opacity
                        }}
                    />
                    <OtherTeamSelectedPlayerOnPitch
                        player={p5}
                        changed={p5.animationState}
                        style={{
                            ...STYLES.p5,
                            opacity: p5.opacity
                        }}
                    />
                </Div>
            </Div>

            {/*3*/}
            <Div style={STYLES.container} mt={24}>
                <motion.div variants={Player6Animation} animate={controls}>
                    <OtherTeamSelectedPlayerOnPitch
                        player={p6}
                        changed={p6.animationState}
                        style={{
                            ...STYLES.commonPlayersStyle,
                            opacity: p6.opacity
                        }}
                    />
                </motion.div>
                <motion.div variants={Player6Animation} animate={controls}>
                    <OtherTeamSelectedPlayerOnPitch
                        player={p7}
                        changed={p7.animationState}
                        style={{
                            ...STYLES.commonPlayersStyle,
                            ...STYLES.p7,
                            opacity: p7.opacity
                        }}
                    />
                </motion.div>
                <motion.div variants={Player6Animation} animate={controls}>
                    <OtherTeamSelectedPlayerOnPitch
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
                    <OtherTeamSelectedPlayerOnPitch
                        player={p9}
                        changed={p9.animationState}
                        style={{
                            ...STYLES.commonPlayersStyle1,
                            opacity: p9.opacity
                        }}
                    />
                </motion.div>

                <motion.div variants={Player10Animation} animate={controls}>
                    <OtherTeamSelectedPlayerOnPitch
                        player={p10}
                        changed={p10.animationState}
                        style={{
                            ...STYLES.commonPlayersStyle1,
                            opacity: p10.opacity
                        }}
                    />
                </motion.div>

                <motion.div variants={Player11Animation} animate={controls}>
                    <OtherTeamSelectedPlayerOnPitch
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
                <OtherTeamSelectedPlayerOnPitch
                    player={p12}
                    changed={p12.animationState}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p12.opacity
                    }}
                />
                <OtherTeamSelectedPlayerOnPitch
                    player={p13}
                    changed={p13.animationState}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p13.opacity
                    }}
                />
                <OtherTeamSelectedPlayerOnPitch
                    player={p14}
                    changed={p14.animationState}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p14.opacity
                    }}
                />
                <OtherTeamSelectedPlayerOnPitch
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


