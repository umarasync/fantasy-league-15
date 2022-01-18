// Packages
import {AnimatePresence, motion} from "framer-motion";

// Animations
import FTAnimation from "Animations/mySquad/FTAnimation";

// Constants
import colors from "constants/colors";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        ft: {
            fontSize: R(12),
            lineHeight: R(16, 'px'),
            color: colors.regent_grey,
            textTransform: 'uppercase',
            position:'absolute',
            top: R(10),
            left: R(42),
        },
    }
}


export default function FT({index, parentIndex, match, initialOpacity, tabChanged}) {

    const STYLES =  { ...getStyles(R) }

    if(match.finished) {
        if(tabChanged) {
            return (
                <AnimatePresence>
                    <motion.p
                        variants={FTAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={{ index, parentIndex, initialOpacity}}
                        key={1}
                        style={STYLES.ft}
                    >FT
                    </motion.p>
                </AnimatePresence>
            )
        }else {
            return (
                <AnimatePresence>
                    <motion.p
                        variants={FTAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={{ index, parentIndex, initialOpacity}}
                        key={2}
                        style={STYLES.ft}
                    >FT
                    </motion.p>
                </AnimatePresence>
            )
        }
    }else {
        return <AnimatePresence/>
    }

}