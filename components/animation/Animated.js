import {AnimatePresence, motion} from "framer-motion";

// Components
import Div from "components/html/Div";

// Animation
// import {fadeInAndOutAnimation} from "Animations/infoBoard/InfoBoardAnimation";
import {fadeInAndOutAnimation} from "Animations/universal/FadeInOutAnimation";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        section: {
            gridColumn: 1,
            gridRow: 1
        }
    }
}

const Animated = ({
    variants,
    toggleAnimation,
    children,
    children2,
    animationSpeed = 0.5
}) => {

    const STYLES = {...getStyles(R)}

    // Set default animation
    if(!variants){
        variants = fadeInAndOutAnimation(animationSpeed)
    }

    return (
        <Div className={'grid'}>
            {
                toggleAnimation ? (
                    <AnimatePresence>
                        <motion.div
                            variants={variants}
                            initial={"initial"}
                            animate={"animate"}
                            exit={"exit"}
                            key={1}
                            style={STYLES.section}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                ): (
                    <AnimatePresence>
                        <motion.div
                            variants={variants}
                            initial={"initial"}
                            animate={"animate"}
                            exit={"exit"}
                            key={2}
                            style={STYLES.section}
                        >
                            {children2 || children}
                        </motion.div>
                    </AnimatePresence>
                )
            }
        </Div>
    )
}

export default Animated