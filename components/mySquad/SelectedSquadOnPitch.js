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

// Styles
const getStyles = (R, transferInProgress) => {

    const { state, forPosition } = transferInProgress
    // const getOpacity = (v) => v ? 1 : 0.5

    const getOpacity = (v) => {
        if(!state) return 1
        return v ? 1 : 0.5
    }
    return {
        player1: {
            marginTop: R(15),
        },
        player3:{
            marginLeft: R(120),
            marginRight: R(120),
        },
        row3: {
          marginLeft: R(57),
          marginRight: R(57),
        },
        player10:{
            marginLeft: R(100),
            marginRight: R(100),
        },

        benchContainer: {
            marginLeft: R(62),
            marginRight: R(62),
        },

        commonPlayersStyle: {
            height: R(50),
        }

    }
}

export default function SelectedSquadOnPitch ({
   pickedPlayers,
   onPlayerChange,
   transferInProgress,
   changeFormation
}){

    const STYLES =  { ... getStyles(R, transferInProgress) }
    const controls = useAnimation()

    useEffect(() => {
        if(!changeFormation || !pickedPlayers.length) return
        controls.start('p5Animation')
        controls.start('p6Animation')
        controls.start('p9Animation')
        controls.start('p10Animation')
        controls.start('p11Animation')
    }, [changeFormation])

    if(!pickedPlayers.length) return null

    const p1 = pickedPlayers[ZERO]
    const p2 = pickedPlayers[ONE]
    const p3 = pickedPlayers[TWO]
    const p4 = pickedPlayers[THREE]
    const p5 = pickedPlayers[FOUR]
    const p6 = pickedPlayers[FIVE]
    const p7 = pickedPlayers[SIX]
    const p8 = pickedPlayers[SEVEN]
    const p9 = pickedPlayers[EIGHT]
    const p10 = pickedPlayers[NINE]
    const p11 = pickedPlayers[TEN]
    const p12 = pickedPlayers[ELEVEN]
    const p13 = pickedPlayers[TWELVE]
    const p14 = pickedPlayers[THIRTEEN]
    const p15 = pickedPlayers[FOURTEEN]

    return(
        <div style={{paddingTop: R(27)}}>
            {/*1*/}
            <Div center>
                <SelectedPlayerOnPitch
                    player={p1}
                    changed={p1.animationState}
                    onPlayerChange={(player) => onPlayerChange(player, ZERO)}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        ...STYLES.player1,
                        opacity: p1.opacity
                    }}
                />
            </Div>
            {/*2*/}
            <Div center mt={60}>
                <SelectedPlayerOnPitch
                    player={p2}
                    changed={p2.animationState}
                    onPlayerChange={(player) => onPlayerChange(player, ONE)}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p2.opacity
                    }}
                />
                <SelectedPlayerOnPitch
                    player={p3}
                    changed={p3.animationState}
                    onPlayerChange={(player) => onPlayerChange(player, TWO)}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        ...STYLES.player3,
                        opacity: p3.opacity
                    }}
                />
                    <SelectedPlayerOnPitch
                        player={p4}
                        changed={p4.animationState}
                        onPlayerChange={(player) => onPlayerChange(player, THREE)}
                        style={{
                            ...STYLES.commonPlayersStyle,
                            opacity: p4.opacity
                        }}
                    />
            </Div>
            {/*3*/}

            <Div center mt={65}>
                <motion.div variants={Player5Animation} animate={controls}>
                    <SelectedPlayerOnPitch
                        player={p5}
                        changed={p5.animationState}
                        onPlayerChange={(player) => onPlayerChange(player, FOUR)}
                        style={{
                            ...STYLES.row3,
                            ...STYLES.commonPlayersStyle,
                            opacity: p5.opacity
                        }}
                    />
                </motion.div>
                <motion.div variants={Player6Animation} animate={controls}>
                    <SelectedPlayerOnPitch
                        player={p6}
                        changed={p6.animationState}
                        onPlayerChange={(player) => onPlayerChange(player, FIVE)}
                        style={{
                            ...STYLES.row3,
                            ...STYLES.commonPlayersStyle,
                            opacity: p6.opacity
                        }}
                    />
                </motion.div>
                <motion.div variants={Player6Animation} animate={controls}>
                    <SelectedPlayerOnPitch
                        player={p7}
                        changed={p7.animationState}
                        onPlayerChange={(player) => onPlayerChange(player, SIX)}
                        style={{
                            ...STYLES.row3,
                            ...STYLES.commonPlayersStyle,
                            opacity: p7.opacity
                        }}
                    />
                </motion.div>
                <motion.div variants={Player6Animation} animate={controls}>
                    <SelectedPlayerOnPitch
                        player={p8}
                        changed={p8.animationState}
                        onPlayerChange={(player) => onPlayerChange(player, SEVEN)}
                        style={{
                            ...STYLES.row3,
                            ...STYLES.commonPlayersStyle,
                            opacity: p8.opacity
                        }}
                    />
                </motion.div>
            </Div>
            {/*6*/}
            <Div center mt={65}>
                <motion.div variants={Player9Animation} animate={controls}>
                    <SelectedPlayerOnPitch
                        player={p9}
                        changed={p9.animationState}
                        onPlayerChange={(player) => onPlayerChange(player, EIGHT)}
                        style={{
                            ...STYLES.commonPlayersStyle,
                            opacity: p9.opacity
                        }}
                    />
                </motion.div>

                <motion.div variants={Player10Animation} animate={controls}>
                    <SelectedPlayerOnPitch
                        player={p10}
                        changed={p10.animationState}
                        onPlayerChange={(player) => onPlayerChange(player, NINE)}
                        style={{
                            ...STYLES.commonPlayersStyle,
                            ...STYLES.player10,
                            opacity: p10.opacity
                        }}
                    />
                </motion.div>

                <motion.div variants={Player11Animation} animate={controls}>
                    <SelectedPlayerOnPitch
                        player={p11}
                        changed={p11.animationState}
                        onPlayerChange={(player) => onPlayerChange(player, TEN)}
                        style={{
                            ...STYLES.commonPlayersStyle,
                            opacity: p11.opacity
                        }}
                    />
                </motion.div>
            </Div>

            <Div center mt={90}>
                <SelectedPlayerOnPitch
                    player={p12}
                    changed={p12.animationState}
                    onPlayerChange={(player) => onPlayerChange(player, ELEVEN)}
                    style={{
                        ...STYLES.benchContainer,
                        ...STYLES.commonPlayersStyle,
                        opacity: p12.opacity
                    }}
                />
                <SelectedPlayerOnPitch
                    player={p13}
                    changed={p13.animationState}
                    onPlayerChange={(player) => onPlayerChange(player, TWELVE)}
                    style={{
                        ...STYLES.benchContainer,
                        ...STYLES.commonPlayersStyle,
                        opacity: p13.opacity
                    }}
                />
                <SelectedPlayerOnPitch
                    player={p14}
                    changed={p14.animationState}
                    onPlayerChange={(player) => onPlayerChange(player, THIRTEEN)}
                    style={{
                        ...STYLES.benchContainer,
                        ...STYLES.commonPlayersStyle,
                        opacity: p14.opacity
                    }}
                />
                <SelectedPlayerOnPitch
                    player={p15}
                    changed={p15.animationState}
                    onPlayerChange={(player) => onPlayerChange(player, FOURTEEN)}
                    style={{
                        ...STYLES.benchContainer,
                        ...STYLES.commonPlayersStyle,
                        opacity: p15.opacity
                    }}
                />
            </Div>
        </div>
    )
}