// Packages
import {AnimatePresence, motion} from "framer-motion";
import dayjs from "dayjs";

import Goals from "components/matches/Goals";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

// Animations
import GoalsAnimation from "Animations/mySquad/GoalsAnimations";
import MatchTimeAnimation from "Animations/mySquad/MatchTimeAnimation";

// Styles
const getStyles = (R) => {
    return {
        goalsBox: {
            position: 'absolute',
            top: R(-20),
            marginLeft: R(32),
            marginRight: R(32),
        },
        time: {
            position:'absolute',
            top: R(-10),
            fontSize: R(20),
            lineHeight: R(24, 'px'),
            fontWeight: '400',
            marginLeft: R(24),
            marginRight: R(24),
            color: colors.black_rock,
        },
    }
}


const GoalAndMatchTime = (props) => {
    const {
        match,
        index,
        parentIndex,
        initialOpacity,
        tabChanged
    } = props
    const STYLES =  { ...getStyles(R) }

    const team1 = match.home
    const team2 = match.away

    console.log('1========', match)

    if(match.finished) {
        if(tabChanged) {
            return (
                <AnimatePresence>
                    <motion.div
                        variants={GoalsAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={{index, parentIndex, initialOpacity}}
                        style={STYLES.goalsBox}
                        key={1}
                    >
                        <Goals team1Goals={team1.goals} team2Goals={team2.goals}/>
                    </motion.div>
                </AnimatePresence>
            )
        }else {
            return (
                <AnimatePresence>
                    <motion.div
                        variants={GoalsAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={{index, parentIndex, initialOpacity}}
                        style={STYLES.goalsBox}
                        key={2}
                    >
                        <Goals team1Goals={team1.goals} team2Goals={team2.goals}/>
                    </motion.div>
                </AnimatePresence>
            )
        }
    }else {
        if(tabChanged) {
            return (
                <AnimatePresence>
                    <motion.p
                        variants={MatchTimeAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={{index, parentIndex, initialOpacity}}
                        key={3}
                        style={STYLES.time}>
                        {dayjs(match.matchTime).format('HH:mm')}
                    </motion.p>
                </AnimatePresence>
            )
        }else {
            return (
                <AnimatePresence>
                    <motion.p
                        variants={MatchTimeAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={{index, parentIndex, initialOpacity}}
                        key={4}
                        style={STYLES.time}>
                        {dayjs(match.matchTime).format('HH:mm')}
                    </motion.p>
                </AnimatePresence>
            )
        }
    }
}

export default GoalAndMatchTime

