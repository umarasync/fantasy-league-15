// Packages
import {motion} from "framer-motion";

// Components
import SelectedPlayerOnPitch from "components/mySquad/SelectedPlayerOnPitch";
import Animated from "components/animation/Animated";
import PlayersFormation from "components/mySquad/formation/PlayersFormation";

// Utils
import R from "utils/getResponsiveValue";
import {isEmpty} from "utils/helpers";

// Constants
import {
    EIGHT,
    ELEVEN, FIFTEEN,
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

    const formPlayerInfo = (index, style) => {

        return {
            player: {
                ...squad[index],
                onPlayerChange: (player) => onPlayerChange(player, index),
                onPlayerClick: (player) => onPlayerClick(player, index),
                tripleCaptainApplied,
                benchBoostApplied,
            },
            style: { ...style }
        }
    }

// All-Players
    const p1 = () => formPlayerInfo(ZERO, {...STYLES.commonPlayersStyle})
    const p2 = () => formPlayerInfo(ONE, {...STYLES.commonPlayersStyle})
    const p3 = () => formPlayerInfo(TWO, {...STYLES.commonPlayersStyle})
    const p4 = () => formPlayerInfo(THREE, {...STYLES.commonPlayersStyle})
    const p5 = () => formPlayerInfo(FOUR, {...STYLES.commonPlayersStyle})
    const p6 = () => formPlayerInfo(FIVE, {...STYLES.commonPlayersStyle})
    const p7 = () => formPlayerInfo(SIX, {...STYLES.commonPlayersStyle})
    const p8 = () => formPlayerInfo(SEVEN, {...STYLES.commonPlayersStyle})
    const p9 = () => formPlayerInfo(EIGHT, {...STYLES.commonPlayersStyle1})
    const p10 = () => formPlayerInfo(NINE, {...STYLES.commonPlayersStyle1})
    const p11 = () => formPlayerInfo(TEN, {...STYLES.commonPlayersStyle1})
    const p12 = () => formPlayerInfo(ELEVEN, {...STYLES.commonPlayersStyle})
    const p13 = () => formPlayerInfo(TWELVE, {...STYLES.commonPlayersStyle})
    const p14 = () => formPlayerInfo(THIRTEEN, {...STYLES.commonPlayersStyle})
    const p15 = () => formPlayerInfo(FOURTEEN, {...STYLES.commonPlayersStyle})

    // Player-JSX
    const renderPlayer = (props) => {
        const {
            animation,
            player,
            style,
        } = props

        let animationVariants = isEmpty(animation) ? null : animation.variants
        let animationControls = isEmpty(animation) ? null : animation.controls

        return (
            <motion.div
                variants={animationVariants}
                animate={animationControls}
            >
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


    return(
        <Animated toggleAnimation={!benchBoostApplied}>
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