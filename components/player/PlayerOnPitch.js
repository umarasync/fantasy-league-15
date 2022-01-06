// Components
import PrimaryButtonSmall from "components/buttons/PrimaryButtonSmall";
import {AnimatePresence, motion} from "framer-motion";

// Utils
import R from "utils/getResponsiveValue";
import PlayerImage from "components/player/PlayerImage";
import {useEffect, useState} from "react";
import {nFormatter} from "utils/helpers";

// Constants
import { STATUS_SUSPENDED, STATUS_INJURED } from "constants/data/filters";

// Styles
const getStyles = (R) => {
  return {
      container: {
          // border: '5px solid red'
      },
      imageContainer:{
          width: R(40),
          height: R(40),
          marginBottom: R(10),
          position: 'absolute',
          top: 0
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
          paddingLeft: R(13),
          paddingTop: R(5),
          paddingBottom: R(5),
          paddingRight: R(13),
          borderRadius: R(50),
          marginTop: R(3),
          fontSize: R(10)
      },
      statusImage: {
          width: R(15),
          height: R(15),
          position: 'absolute',
          top: 0,
          right: 0,
          borderRadius: R(20),
          background: 'white'
      }
  }
}

export default function PlayerOnPitch ({
    player,
    style,
    boxClasses,
    placeholderText,
    onDeselectPlayer
}) {

    const STYLES =  { ... getStyles(R) }

    const [initialOpacity, setInitialOpacity] = useState(1)

    const duration = 0.5

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
    }, [player])


    return(
        <div className={`flex relative ${boxClasses}`} style={{ ...STYLES.container, ...style }}>
                {
                    player ? (
                            <AnimatePresence>
                                <motion.div
                                    className={'flex flex-col items-center justify-center'}
                                    style={STYLES.imageContainer}
                                    variants={fadeInOutAnimation}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    key={1}
                                >
                                    <PlayerImage
                                        playerImage={player.image}
                                        clubImage={player.clubImage}
                                        imageStyle={STYLES.playerImage}
                                        clubImageStyle={STYLES.clubImageStyle}
                                        showCloseIcon
                                        onDeselect={onDeselectPlayer}
                                    />
                                    <p className={'items-center relative items-center text-center  justify-center cursor-pointer primary-button-color text-white whitespace-nowrap'}
                                       style={STYLES.buttonStyle}
                                    >
                                        {
                                            player.status === STATUS_INJURED || player.status === STATUS_SUSPENDED && (
                                                <div className={'flex items-center justify-center'} style={STYLES.statusImage}>
                                                    <img src={`/images/${player.statusImage}`} alt="" width={10} height={10}/>
                                                </div>
                                            )

                                        }

                                        <span>{player.name}</span><br/>
                                        <span>{nFormatter(player.price)}</span><br/>
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                    ): (
                            <AnimatePresence>
                                <motion.div
                                    className={'flex flex-col items-center justify-center'}
                                    style={STYLES.imageContainer}
                                    variants={fadeInOutAnimation}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    key={2}
                                >
                                        <img src="/images/player_empty.png" alt="" width='100%' height='100%'/>
                                        <p className={'items-center  justify-center cursor-pointer primary-button-color text-white whitespace-nowrap'}
                                           style={STYLES.buttonStyle}
                                        >
                                            <span>{placeholderText}</span><br/>
                                        </p>
                                </motion.div>
                            </AnimatePresence>
                    )
                }

        </div>
    )
}