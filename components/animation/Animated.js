import {AnimatePresence, motion} from "framer-motion";

// Components
import Div from "components/html/Div";

// Animation
import {fadeInAndOutAnimation} from "Animations/universal/FadeInOutAnimation";

// Utils
import R from "utils/getResponsiveValue";
import RS from "utils/responsiveStyle";

// Styles
const getStyles = (R, RS, props) => {
    const {
        h, w
    } = props
    return {
        section: {
            gridColumn: 1,
            gridRow: 1
        },
        container: {
            ...RS.width(w),
            ...RS.height(h),
        }
    }
}

const Animated = (props) => {
    const {
        toggleAnimation,
        children,
        children2,
        animationSpeed = 0.5
    } = props
    let { variants } = props

    const STYLES = {...getStyles(R, RS, {...props})}

    // Set default animation
    if (!variants) {
        variants = fadeInAndOutAnimation(animationSpeed)
    }

    return (
        <Div className={'grid'} style={STYLES.container}>
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
                ) : (
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