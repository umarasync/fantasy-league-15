// Packages
import {useEffect} from "react";
import {motion, useAnimation} from "framer-motion";

// Components
import SelectedPlayerOnPitch from "components/mySquad/SelectedPlayerOnPitch";
import Div from "components/html/Div";
import Animated from "components/animation/Animated";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import {ZERO, ONE,TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, ELEVEN, TWELVE, THIRTEEN, FOURTEEN} from "constants/arrayIndexes";
import {ANIMATE, INITIAL} from "constants/animations";

// Animations
import {Player5Animation, Player6Animation, Player9Animation, Player10Animation, Player11Animation} from "Animations/mySquad/PlayersFormationAnimation";

// Styles
const getStyles = (R) => {
    return {
        // Styles for Without Bench Boost Applied
        topContainer: {
            paddingTop: R(22)
        },
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
        }
        // Styles if bench Boost applied
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
            style: {...STYLES.commonPlayersStyle},
        }
    }

    const p3 = () => {
        return {
            animationVariants: null,
            player: {...buildPlayer(TWO)},
            style: {...STYLES.commonPlayersStyle},
        }
    }

    const p4 = () => {
        return {
            animationVariants: null,
            player: {...buildPlayer(THREE)},
            style: {...STYLES.commonPlayersStyle},
        }
    }

    const p5 = () => {
        return {
            animationVariants: Player5Animation,
            player: {...buildPlayer(FOUR)},
            style: {...STYLES.commonPlayersStyle},
        }
    }

    const p6 = () => {
        return {
            animationVariants: Player6Animation,
            player: {...buildPlayer(FIVE)},
            style: {...STYLES.commonPlayersStyle},
        }
    }

    const p7 = () => {
        return {
            animationVariants: Player6Animation,
            player: {...buildPlayer(SIX)},
            style: {
                ...STYLES.commonPlayersStyle,
            }
        }
    }

    const p8 = () => {
        return {
            animationVariants: Player6Animation,
            player: {...buildPlayer(SEVEN)},
            style: {...STYLES.commonPlayersStyle,}
        }
    }

    const p9 = () => {
        return {
            animationVariants: Player9Animation,
            player: {...buildPlayer(EIGHT)},
            style: {...STYLES.commonPlayersStyle1,}
        }
    }
    const p9type1 = (payload) => {
        return {
            animationVariants: Player9Animation,
            player: {...buildPlayer(EIGHT)},
            style: {...STYLES.commonPlayersStyle1,},
            ...payload
        }
    }

    const p10 = () => {
        return {
            animationVariants: Player10Animation,
            player: {...buildPlayer(NINE)},
            style: {...STYLES.commonPlayersStyle1,}
        }
    }

    const p11 = () => {
        return {
            animationVariants: Player11Animation,
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
                    changed={player.animationState}
                    style={{
                        ...style,
                        opacity: player.opacity,
                    }}
                />
            </motion.div>
        )
    }

    const getAllPlayersWithoutBenchBoostApplied = () => {
        return (
            <div style={STYLES.topContainer}>
                             {/*1*/}
                             <Div style={STYLES.container}>
                                 {renderPlayer(p1())}
                             </Div>
                             {/*2*/}
                             <Div style={STYLES.container} mt={24}>
                                 {renderPlayer(p2())}
                                 {renderPlayer(p3())}
                                 {renderPlayer(p4())}
                             </Div>
                             {/*3*/}
                             <Div style={STYLES.container} mt={24}>
                                 {renderPlayer(p5())}
                                 {renderPlayer(p6())}
                                 {renderPlayer(p7())}
                                 {renderPlayer(p8())}
                             </Div>
                             {/*4*/}
                             <Div style={STYLES.container} mt={24}>
                                 {renderPlayer(p9())}
                                 {renderPlayer(p10())}
                                 {renderPlayer(p11())}
                             </Div>
                             {/*5*/}
                             <Div style={STYLES.container} mt={50}>
                                 {renderPlayer(p12())}
                                 {renderPlayer(p13())}
                                 {renderPlayer(p14())}
                                 {renderPlayer(p15())}
                             </Div>
                         </div>
        )
    }

    const getAllPlayersWithBenchBoostApplied = () => {
        return (
            <div style={STYLES.topContainer}>
                 {/*1*/}
                 <Div style={STYLES.container}>
                     {renderPlayer(p1())}
                     {renderPlayer(p12())}
                 </Div>
                 {/*2*/}
                 <Div style={STYLES.container} mt={24}>
                     {renderPlayer(p2())}
                     {renderPlayer(p3())}
                     {renderPlayer(p4())}
                 </Div>
                 {/*3*/}
                 <Div style={STYLES.container} mt={24}>
                     {renderPlayer(p5())}
                     {renderPlayer(p6())}
                     {renderPlayer(p7())}
                     {renderPlayer(p8())}
                 </Div>
                 {/*4*/}
                 <Div style={STYLES.container} mt={24}>
                     {renderPlayer(p9())}
                     {renderPlayer(p10())}
                     {renderPlayer(p11())}
                 </Div>
                 {/*5*/}
                 <Div style={STYLES.container} mt={50}>
                     {renderPlayer(p13())}
                     {renderPlayer(p14())}
                     {renderPlayer(p15())}
                 </Div>
             </div>
        )
    }

    return(
        <Animated toggleAnimation={!benchBoostApplied} children2={getAllPlayersWithBenchBoostApplied()}>
            {getAllPlayersWithoutBenchBoostApplied()}
        </Animated>
    )
}