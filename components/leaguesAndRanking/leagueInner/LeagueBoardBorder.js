// Packages
import {useEffect} from "react";
import {motion, useAnimation} from "framer-motion";

// Components
import Div from "components/html/Div";

// Animations
import {tabsBorderAnimation} from "Animations/leaguesAndRanking/LeagueAndRankingAnimation";

// Constants
import colors from "constants/colors";

// Utils
import R from "utils/getResponsiveValue";
import {isEmpty} from "utils/helpers";

// Styles
const getStyles = (R) => {
    return {
        border: {
            position: 'absolute',
            top: R(20),
            left: R(30),
            background: colors.mandy,
            height: R(2),
        },
        border1: {
            width: R(125.078)
        },
    }
}

export default function LeagueBoardBorder({
    borderData,
    setAnimationInProgress
}) {
    const STYLES = {...getStyles(R)}

    const controls = useAnimation()

    useEffect(() => {
        controls.start('moveBorder')
    }, [borderData])

    const onAnimationComplete = (definition) => {
        if (definition === 'moveBorder') {
            setAnimationInProgress(false)
        }
    }

    return (
       <Div className={'relative'} bg={'blue'}>
           {
               isEmpty(borderData) ? (
                   <div style={{...STYLES.border, ...STYLES.border1}}/>
               ) : (
                   <motion.div
                       variants={tabsBorderAnimation()}
                       animate={controls}
                       custom={{
                           leftOffset: borderData.leftOffset,
                           width: borderData.width
                       }}
                       onAnimationStart={() => setAnimationInProgress(true)}
                       onAnimationComplete={(definition) => onAnimationComplete(definition)}

                       style={{
                           ...STYLES.border,
                           width: borderData.width
                       }}
                   />
               )
           }
       </Div>
    )
}