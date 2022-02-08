// Packages
import {AnimatePresence, motion} from "framer-motion";

// Components
import PlayerInsideField from "components/player/PlayerInsideField";

// Utils
import R from "utils/getResponsiveValue";

// Animation
import SelectedPlayerOnPitchAnimation from "Animations/mySquad/SelectedPlayerOnPitchAnimation";

// Styles
const getStyles = (R) => {
    return {
        imageContainer: {
            gridColumn: 1,
            gridRow: 1,
        },

    }
}

export default function SelectedPlayerOnPitch ({
    changed,
    player,
    style,
    boxClasses
}) {

    const STYLES =  { ... getStyles(R) }

    return(
        <div className={`grid relative ${boxClasses}`} style={{...style}}>
            {
                changed ? (
                    <AnimatePresence>
                        <motion.div
                            className={''}
                            style={STYLES.imageContainer}
                            variants={SelectedPlayerOnPitchAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={1}
                        >
                            <PlayerInsideField player={player}/>
                        </motion.div>
                    </AnimatePresence>

                ): (
                    <AnimatePresence>
                        <motion.div
                            className={'flex flex-col items-center justify-center'}
                            style={STYLES.imageContainer}
                            variants={SelectedPlayerOnPitchAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={2}
                        >
                            <PlayerInsideField player={player}/>
                        </motion.div>
                    </AnimatePresence>
                )
            }
        </div>
    )
}