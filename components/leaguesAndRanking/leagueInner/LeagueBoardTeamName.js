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
export default function LeagueBoardTeamName({
    animationChange,
    team,
    index,
    shouldTexColorBeRed
}) {
    const STYLES = {...getStyles(R)}
    const { teamName } = team
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
                            <Text text={`${index + 1}. ${teamName}`} fs={22} lh={26}
                                  fw={900}
                                  color={colors.black_rock}
                                  fst={'italic'}
                                  tt={'uppercase'}
                                  className={`${shouldTexColorBeRed && 'text-froly-cerise_red'}`}
                            />
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
                            <Text text={`${index + 1}. ${teamName}`} fs={22} lh={26}
                                  fw={900}
                                  color={colors.black_rock}
                                  fst={'italic'}
                                  tt={'uppercase'}
                                  className={`${shouldTexColorBeRed && 'text-froly-cerise_red'}`}
                            />
                        </motion.div>
                    </AnimatePresence>
                )
            }
        </Div>
    )
}