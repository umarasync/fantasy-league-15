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
export default function LeagueBoardGameWeekPoints({
    overall,
    team,
    animationChange
}) {
    const STYLES = {...getStyles(R)}

    return (
        <Div className={'grid'}>
            {
                animationChange ? (
                    <AnimatePresence>
                        <motion.div
                            variants={leagueBoardContentAnimation()}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            style={STYLES.content}
                            key={1}
                        >
                            <Text text={
                                overall ? team.totalPoints : team.weeklyPoints
                            } fs={24} lh={28} fw={600}
                                  color={colors.black_rock}/>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <AnimatePresence>
                        <motion.div
                            variants={leagueBoardContentAnimation()}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            style={STYLES.content}
                            key={2}
                        >
                            <Text text={
                                overall ? team.totalPoints : team.weeklyPoints
                            } fs={24} lh={28} fw={600}
                                  color={colors.black_rock}/>
                        </motion.div>
                    </AnimatePresence>
                )
            }
        </Div>
    )
}