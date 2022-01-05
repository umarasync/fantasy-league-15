// Components
import PrimaryButtonSmall from "components/buttons/PrimaryButtonSmall";
import {AnimatePresence, motion} from "framer-motion";

// Utils
import R from "utils/getResponsiveValue";
import PlayerImage from "components/player/PlayerImage";
import {useEffect, useState} from "react";


// Animation

// Styles
const getStyles = (R) => {
  return {
      container: {
          border: '5px solid red'
      },
      imageContainer:{
          width: R(40),
          height: R(40),
          marginBottom: R(10),
          position: 'absolute'
      },
      playerImage: {
          width: '100%',
          height:'100%'
      },
      clubImageStyle: {
          width: R(13),
          height: R(13)
      },
      title:{
            position: 'absolute',
            top: R(45)
      },
      buttonStyle: {
          paddingLeft: R(10),
          paddingTop: R(5),
          paddingBottom: R(5),
          paddingRight: R(10),
          borderRadius: R(50),
          fontSize: R(10)
      },

  }
}

export default function PlayerOnPitch ({
    style,
    autoPickDisabled
}) {

    const STYLES =  { ... getStyles(R) }

    const [initialOpacity, setInitialOpacity] = useState(1)

    const duration = 3

    const fadeInOutAnimation = {
        initial: {
            opacity: initialOpacity,
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


    useEffect(() => {
        if(initialOpacity) {
            setInitialOpacity(0)
        }
    }, [autoPickDisabled])

    return(
        <div className="flex justify-center flex-col items-center relative" style={{ ...STYLES.container, ...style }}>

                {
                    autoPickDisabled ? (
                        <div className={'flex justify-center'}>
                            <AnimatePresence>
                                <motion.div
                                    style={STYLES.imageContainer}
                                    variants={fadeInOutAnimation}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    key={1}
                                >
                                    <PlayerImage
                                        playerImage={'player1.svg'}
                                        clubImage={'club_fc.svg'}
                                        imageStyle={STYLES.playerImage}
                                        clubImageStyle={STYLES.clubImageStyle}
                                        showCloseIcon
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    ): (
                        <div className={'flex justify-center'}>
                            <AnimatePresence>
                                <motion.div
                                    style={STYLES.imageContainer}
                                    variants={fadeInOutAnimation}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    key={2}
                                >
                                    <img src="/images/player_empty.png" alt="" width='100%' height='100%'/>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )
                }



            {
                autoPickDisabled ? (
                    <AnimatePresence>
                        <motion.div
                            style={STYLES.title}
                            variants={fadeInOutAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={1}
                        >

                            <p className={'items-center  justify-center cursor-pointer primary-button-color text-white whitespace-nowrap'}
                               style={STYLES.buttonStyle}
                            >
                                <span>Add goalkeeper</span><br/>
                                <span>Add goalkeeper</span><br/>
                            </p>


                            {/*<PrimaryButtonSmall>*/}
                            {/*    <p className={'lowercase text-center'} style={STYLES.textStyle}>Add goalkeeper</p>*/}
                            {/*    <p className={'lowercase'} style={STYLES.textStyle}>Add goalkeeper</p>*/}
                            {/*</PrimaryButtonSmall>*/}

                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <AnimatePresence>
                        <motion.div
                            style={{...STYLES.title, ...style}}
                            variants={fadeInOutAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={2}
                        >
                            <p className={'items-center justify-center cursor-pointer primary-button-color text-white whitespace-nowrap'}
                               style={STYLES.buttonStyle}
                            >
                                <span>Add goalkeeper</span><br/>
                            </p>
                        </motion.div>
                    </AnimatePresence>
                )
            }

        </div>
    )
}