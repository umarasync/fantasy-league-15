// Packages
import {AnimatePresence, motion} from "framer-motion";
import dayjs from "dayjs";

// Animations
import ClubImageAnimation from "Animations/mySquad/ClubImageAnimation";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

// Styles
const getStyles = (R) => {
    return {
        matchDate: {
            fontSize: R(16),
            lineHeight: R(20, 'px'),
            color: colors.regent_grey,
            position: 'absolute',
            left: 0,
            right: 0,

        },
        matchDateBox: {
            marginTop: R(30),
            paddingBottom: R(5),
        },
    }
}

export default function  MatchDate({
     tabChanged,
   initialOpacity,
   matchDate
 }) {
    const STYLES =  { ...getStyles(R) }

    return (
        <div className={'relative w-full'} style={STYLES.matchDateBox}>
            {
                tabChanged ? (
                    <AnimatePresence>
                        <motion.p
                            variants={ClubImageAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={1}
                            custom={{initialOpacity}}
                            className={'flex items-center justify-center'} style={STYLES.matchDate}>
                            {dayjs(matchDate.date).format('dddd D MMMM YYYY')}
                        </motion.p>
                    </AnimatePresence>

                ): (
                    <AnimatePresence>
                        <motion.p
                            variants={ClubImageAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={2}
                            custom={{initialOpacity}}
                            className={'flex items-center justify-center'} style={STYLES.matchDate}>
                            {dayjs(matchDate.date).format('dddd D MMMM YYYY')}
                        </motion.p>
                    </AnimatePresence>
                )
            }
        </div>
    )
}