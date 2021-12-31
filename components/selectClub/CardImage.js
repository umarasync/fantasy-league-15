// Packages
import {AnimatePresence, motion} from "framer-motion";

// utils
import R from "utils/getResponsiveValue";

export default function CardImage ({
    changeCard,
    fadeInOutAnimation,
    image,
    containerStyle
}){
    return (
        <div className="relative w-full flex justify-center" style={containerStyle}>
            {
                changeCard ? (
                    <AnimatePresence>
                        <motion.div
                            className="absolute"
                            style={{
                                width: R(image.width),
                                height: R(image.height)
                            }}
                            variants={fadeInOutAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={1}
                        >
                            <img
                                src={`/images/${image.name}`}
                                alt=""
                                className="text-center w-full h-full"
                            />
                        </motion.div>
                    </AnimatePresence>
                ): (
                    <AnimatePresence>
                        <motion.div
                            className="absolute"
                            style={{
                                width: R(image.width),
                                height: R(image.height)
                            }}
                            variants={fadeInOutAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={2}
                        >
                            <img
                                src={`/images/${image.name}`}
                                alt=""
                                className="text-center w-full h-full"
                            />
                        </motion.div>
                    </AnimatePresence>
                )
            }
        </div>
    )
}