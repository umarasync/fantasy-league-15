// Packages
import {AnimatePresence, motion} from "framer-motion";

// utils
import R from "utils/getResponsiveValue";

export default function CardTitle ({
                                       changeCard,
                                       fadeInOutAnimation,
                                        heading,
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
                            <p className={`uppercase italic text-center text-white text-[2rem] font-[800] ${heading.color}`}
                               style={{
                                   fontSize: R(heading.text),
                                   paddingTop: R(heading.pt),
                                   lineHeight: R(heading.leading, 'px')
                               }}
                            >{heading.title}</p>
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
                            <p className={`uppercase italic text-center text-white text-[2rem] font-[800] ${heading.color}`}
                               style={{
                                   fontSize: R(heading.text),
                                   paddingTop: R(heading.pt),
                                   lineHeight: R(heading.leading, 'px')
                               }}
                            >{heading.nextTitle}</p>
                        </motion.div>
                    </AnimatePresence>
                )
            }
        </div>
    )
}