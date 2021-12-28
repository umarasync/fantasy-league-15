// Packages
import {arrayMoveImmutable} from 'array-move';
import { motion } from "framer-motion";
import { AnimatePresence } from 'framer-motion'

// Components
import Layout from "components/layout";
import {useState} from "react";
import CardSection from "components/selectClub/CardSection";
import ClubControls from "components/selectClub/ClubControls";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import cardsDataI from "constants/data/cardsData";

export default function SelectClub() {

    const duration = 5

    const fadeInOutAnimation = {
        initial: {
            opacity: 0.6,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: duration,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: duration,
            },
        },
    };

    const PREVIOUS = 'PREVIOUS'
    const NEXT = 'NEXT'
    const MAIN = 'MAIN'

    const [cardsData, setCardsData] = useState(cardsDataI);
    const [cardSection, setCardSection] = useState(MAIN);

    const onControlsClick = (isLeftPressed = false) => {
        let dataI = []
        if(isLeftPressed){
            setCardSection(PREVIOUS)
            dataI = arrayMoveImmutable(cardsData, -1, 0);
        }else {
            setCardSection(NEXT)
            dataI = arrayMoveImmutable(cardsData, 0, -1);
        }

        // setCardsData(dataI)
    }
    const firstCard = cardsData[0]
    const secondCard = cardsData[1]
    const thirdCard = cardsData[2]
    const fourthCard = cardsData[3]
    const fifthCard = cardsData[4]

    return (
        <Layout title="Select Club">
            <div className="bg-[url('/images/green_grunge_border_with_halftone_background_2.png')]
            bg-[length:100%_100%] h-full bg-no-repeat pt-[3.4rem] bg-cover w-full bg-center relative"
                 style={{
                     height: R(900, '', true)
                 }}
            >
                <div className="absolute"
                     style={{
                         top: R(34),
                         left: R(80),
                         zIndex: 1
                     }}
                >
                    <img src="/images/logo_white.png" alt="" className="w-[16.4rem] h-[4rem]"/>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-white font-[800] leading-[5.4rem] mt-[5rem] text-[5rem] italic uppercase text-center">select your <br/>favorite club</p>
                    <p className="text-[1.8rem] leading-[2.6rem] font-[300] text-center text-white opacity-[0.7] mt-[2.4rem]">
                        Based on this choice, players will be prioritized when creating <br/>a team, and you will join a fan league of the selected club
                    </p>
                </div>

                    <div
                        className="relative"
                        style={{
                        height: R(359)
                    }}>

                        {/*main*/}

                        {
                            cardSection === MAIN && (
                                <AnimatePresence>
                                    <motion.div
                                        className="absolute w-full"
                                        variants={fadeInOutAnimation}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        key={1}
                                    >
                                        <div className="flex justify-between items-center mt-[6rem] w-full" >
                                            <CardSection
                                                firstCard={firstCard}
                                                secondCard={secondCard}
                                                thirdCard={thirdCard}
                                                fourthCard={fourthCard}
                                                fifthCard={fifthCard}
                                            />
                                        </div>
                                        {/*Controls*/}
                                        <ClubControls onControlsClick={onControlsClick} />
                                    </motion.div>
                                </AnimatePresence>
                            )
                        }


                        {/* previous */}

                        {
                           cardSection === PREVIOUS && (
                               <AnimatePresence>
                                   <motion.div
                                       className="absolute w-full"
                                       variants={fadeInOutAnimation}
                                       initial="initial"
                                       animate="animate"
                                       exit="exit"
                                       key={2}
                                   >
                                       <div className="flex justify-between items-center mt-[6rem] w-full" >
                                           <CardSection
                                               firstCard={fifthCard}
                                               secondCard={firstCard}
                                               thirdCard={secondCard}
                                               fourthCard={thirdCard}
                                               fifthCard={fourthCard}
                                           />
                                       </div>
                                       {/*Controls*/}
                                       <ClubControls onControlsClick={onControlsClick} />
                                   </motion.div>
                               </AnimatePresence>
                           )
                        }


                        {/*next*/}

                        {
                            cardSection === NEXT && (
                                <AnimatePresence>
                                    <motion.div
                                        className="absolute w-full"
                                        variants={fadeInOutAnimation}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        key={3}
                                    >
                                        <div className="flex justify-between items-center mt-[6rem] w-full" >
                                            <CardSection
                                                firstCard={secondCard}
                                                secondCard={thirdCard}
                                                thirdCard={fourthCard}
                                                fourthCard={fifthCard}
                                                fifthCard={firstCard}
                                            />
                                        </div>
                                        {/*Controls*/}
                                        <ClubControls onControlsClick={onControlsClick} />
                                    </motion.div>
                                </AnimatePresence>
                            )
                        }

                    </div>

                {/*left gradient*/}
                <div
                    className="bg-[url('/images/gradient_blue_left.png')] absolute bg-[length:100%_100%] bg-no-repeat  top-[0] left-[0] "
                    style={{
                        width: R(299),
                        height: '100%'
                    }}
                />
                {/*right gradient*/}
                <div
                    className="bg-[url('/images/gradient_blue_right.png')] absolute bg-[length:100%_100%] bg-no-repeat  top-[0] right-[0] "
                    style={{
                        width: R(299),
                        height: '100%'
                    }}
                />
            </div>
        </Layout>
    )
}
