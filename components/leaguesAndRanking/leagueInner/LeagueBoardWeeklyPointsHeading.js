// Packages
import {AnimatePresence, motion} from "framer-motion";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";

// Animation
import {leagueBoardContentAnimation} from "Animations/leaguesAndRanking/LeagueAndRankingAnimation";

// Constants
import colors from "constants/colors";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        content: {
            gridColumn: 1,
            gridRow: 1,
        }
    }
}

export default function LeagueBoardWeeklyPointsHeading({
    heading,
    overall,
}) {
    const STYLES = {...getStyles(R)}
    return (
        <Div className={'grid'}>
            {
                overall ? (
                    <AnimatePresence>
                        <motion.div
                            variants={leagueBoardContentAnimation()}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            style={STYLES.content}
                            key={1}
                        >
                            <Text text={heading} fs={18} lh={22} fw={600} color={colors.regent_grey}/>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <AnimatePresence/>
                )
            }
        </Div>
    )
}