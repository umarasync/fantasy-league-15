// Packages
import {useEffect} from "react";
import {motion, useAnimation} from "framer-motion";

// Components
import SelectedPlayerOnPitch from "components/mySquad/SelectedPlayerOnPitch";
import Div from "components/html/Div";
import Animated from "components/animation/Animated";
import PlayersFormation from "components/mySquad/formation/PlayersFormation";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import {
    EIGHT,
    ELEVEN,
    FIVE,
    FOUR,
    FOURTEEN,
    NINE,
    ONE,
    SEVEN,
    SIX,
    TEN,
    THIRTEEN,
    THREE,
    TWELVE,
    TWO,
    ZERO
} from "constants/arrayIndexes";
import {ANIMATE, INITIAL} from "constants/animations";

// Animations
import {
    player10Animation,
    player11Animation,
    player5Animation,
    player6Animation,
    player9Animation
} from "Animations/mySquad/PlayersFormationAnimation";
import {POSITION_DEF, POSITION_FWD, POSITION_MID} from "../../constants/data/filters";

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
    squadInfo,
    onPlayerChange,
    onPlayerClick,
    changeFormation,
    tripleCaptainApplied,
    benchBoostApplied,
}){

    const STYLES =  { ... getStyles(R) }
    const { squad, formationInfo } = squadInfo
    const { toggleFormation } = formationInfo

    const controls = useAnimation()

    useEffect(() => {
        if(!squad.length) return
        if(changeFormation === ANIMATE) {
            controls.start('p5Animation')
            controls.start('p6Animation')
            controls.start('p9Animation')
            controls.start('p10Animation')
            controls.start('p11Animation')
        }else if(changeFormation === INITIAL) {}

    }, [changeFormation])

    if(!squad.length) return null

    const buildPlayer = (index) => {
        return {
            ...squad[index],
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
            // animationVariants: player5Animation(),
            animationVariants: null,
            player: {...buildPlayer(FOUR)},
            style: {...STYLES.commonPlayersStyle},
        }
    }

    const p6 = () => {
        return {
            // animationVariants: player6Animation(),
            animationVariants: null,
            player: {...buildPlayer(FIVE)},
            style: {...STYLES.commonPlayersStyle},
        }
    }

    const p7 = () => {
        return {
            // animationVariants: player6Animation(),
            animationVariants: null,
            player: {...buildPlayer(SIX)},
            style: {
                ...STYLES.commonPlayersStyle,
            }
        }
    }

    const p8 = () => {
        return {
            // animationVariants: player6Animation(),
            animationVariants: null,
            player: {...buildPlayer(SEVEN)},
            style: {...STYLES.commonPlayersStyle,}
        }
    }

    const p9 = () => {
        return {
            // animationVariants: player9Animation(),
            animationVariants: null,
            player: {...buildPlayer(EIGHT)},
            style: {...STYLES.commonPlayersStyle1,}
        }
    }
    const p9type1 = (payload) => {
        return {
            // animationVariants: player9Animation(),
            animationVariants: null,
            player: {...buildPlayer(EIGHT)},
            style: {...STYLES.commonPlayersStyle1,},
            ...payload
        }
    }

    const p10 = () => {
        return {
            // animationVariants: player10Animation(),
            animationVariants: null,
            player: {...buildPlayer(NINE)},
            style: {...STYLES.commonPlayersStyle1,}
        }
    }

    const p11 = () => {
        return {
            // animationVariants: player11Animation(),
            animationVariants: null,
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
        <Animated toggleAnimation={!benchBoostApplied}>
            {/*Replace null with appropriate condition*/}
            <Animated toggleAnimation={toggleFormation} animationSpeed={1}>
                <PlayersFormation
                    formationInfo={formationInfo}
                    renderPlayer={renderPlayer}
                    players={{p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, p15}}
                />
            </Animated>
        </Animated>
    )
}