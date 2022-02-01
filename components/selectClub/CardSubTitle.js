// Packages
import {AnimatePresence, motion} from "framer-motion";

// utils
import R from "utils/getResponsiveValue";

export default function CardSubTitle ({
                                       changeCard,
                                       fadeInOutAnimation,
                                        subHeading,
    containerStyle
                                   }){
    return (
        <div className="relative w-full flex justify-center" style={containerStyle}>
            {
                changeCard ? (
                    <AnimatePresence>
                        <motion.div
                            className="absolute"
                            variants={fadeInOutAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={1}
                        >
                            <p
                                className={`${subHeading.color} text-[1.4rem] normal`}
                                style={{
                                    fontSize: R(subHeading.text),
                                    marginTop:  R(subHeading.mt),
                                    lineHeight: R(subHeading.leading, 'px')
                                }}
                            >{subHeading.title}</p>
                        </motion.div>
                    </AnimatePresence>
                ): (
                    <AnimatePresence>
                        <motion.div
                            className="absolute"
                            variants={fadeInOutAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={2}
                        >
                            <p
                                className={`${subHeading.color} text-[1.4rem] normal`}
                                style={{
                                    fontSize: R(subHeading.text),
                                    marginTop: subHeading.mt < 0 ? subHeading.mt : R(subHeading.mt),
                                    lineHeight: R(subHeading.leading, 'px')
                                }}
                            >{subHeading.title}</p>
                        </motion.div>
                    </AnimatePresence>
                )
            }
        </div>
    )
}