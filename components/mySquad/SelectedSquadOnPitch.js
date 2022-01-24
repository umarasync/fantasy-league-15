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
            // marginLeft: R(20),
            // marginRight: R(20)
            // paddingLeft: R(10),
            // paddingRight: R(10),
            minWidth: R(120)
        },
        commonPlayersStyle1: {
            // marginLeft: R(12),
            // marginRight: R(12)
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
   changeFormation
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
        <div style={{paddingTop: R(22)}}>
            {/*1*/}
            <Div style={STYLES.container}>
                <SelectedPlayerOnPitch
                    player={p1}
                    changed={p1.animationState}
                    onPlayerChange={(player) => onPlayerChange(player, ZERO)}
                    onPlayerClick={(player) => onPlayerClick(player, ZERO)}
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
                    onPlayerChange={(player) => onPlayerChange(player, ONE)}
                    onPlayerClick={(player) => onPlayerClick(player, ONE)}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p2.opacity
                    }}
                />
                <SelectedPlayerOnPitch
                    player={p3}
                    changed={p3.animationState}
                    onPlayerChange={(player) => onPlayerChange(player, TWO)}
                    onPlayerClick={(player) => onPlayerClick(player, TWO)}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p3.opacity
                    }}
                />
                    <SelectedPlayerOnPitch
                        player={p4}
                        changed={p4.animationState}
                        onPlayerChange={(player) => onPlayerChange(player, THREE)}
                        onPlayerClick={(player) => onPlayerClick(player, THREE)}
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
                        onPlayerChange={(player) => onPlayerChange(player, FOUR)}
                        onPlayerClick={(player) => onPlayerClick(player, FOUR)}
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
                        onPlayerChange={(player) => onPlayerChange(player, FIVE)}
                        onPlayerClick={(player) => onPlayerClick(player, FIVE)}
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
                        onPlayerChange={(player) => onPlayerChange(player, SIX)}
                        onPlayerClick={(player) => onPlayerClick(player, SIX)}
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
                        onPlayerChange={(player) => onPlayerChange(player, SEVEN)}
                        onPlayerClick={(player) => onPlayerClick(player, SEVEN)}
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
                        onPlayerChange={(player) => onPlayerChange(player, EIGHT)}
                        onPlayerClick={(player) => onPlayerClick(player, EIGHT)}
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
                        onPlayerChange={(player) => onPlayerChange(player, NINE)}
                        onPlayerClick={(player) => onPlayerClick(player, NINE)}
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
                        onPlayerChange={(player) => onPlayerChange(player, TEN)}
                        onPlayerClick={(player) => onPlayerClick(player, TEN)}
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
                    onPlayerChange={(player) => onPlayerChange(player, ELEVEN)}
                    onPlayerClick={(player) => onPlayerClick(player, ELEVEN)}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p12.opacity
                    }}
                />
                <SelectedPlayerOnPitch
                    player={p13}
                    changed={p13.animationState}
                    onPlayerChange={(player) => onPlayerChange(player, TWELVE)}
                    onPlayerClick={(player) => onPlayerClick(player, TWELVE)}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p13.opacity
                    }}
                />
                <SelectedPlayerOnPitch
                    player={p14}
                    changed={p14.animationState}
                    onPlayerChange={(player) => onPlayerChange(player, THIRTEEN)}
                    onPlayerClick={(player) => onPlayerClick(player, THIRTEEN)}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p14.opacity
                    }}
                />
                <SelectedPlayerOnPitch
                    player={p15}
                    changed={p15.animationState}
                    onPlayerChange={(player) => onPlayerChange(player, FOURTEEN)}
                    onPlayerClick={(player) => onPlayerClick(player, FOURTEEN)}
                    style={{
                        ...STYLES.commonPlayersStyle,
                        opacity: p15.opacity
                    }}
                />
            </Div>
        </div>
    )
}