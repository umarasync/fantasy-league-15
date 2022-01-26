// Packages
import {AnimatePresence, motion} from "framer-motion";

// Components
import Image from "components/html/Image";

// Utils
import R from "utils/getResponsiveValue";
import PlayerImage from "components/player/PlayerImage";
import {useEffect, useState} from "react";
import {nFormatter} from "utils/helpers";
import {isEmpty} from "utils/helpers";

// Constants
import { STATUS_SUSPENDED, STATUS_INJURED } from "constants/data/filters";

// Styles
const getStyles = (R, playerExist) => {
  return {
      container: {
          // border: '2px solid yellow'
      },
      imageContainer: {
          gridColumn: 1,
          gridRow: 1,
      },
      subTitle: {
          position: 'absolute',
          left: 0,
          right: 0
      },
      buttonStyle: {
          paddingLeft: R(playerExist ? 18 : 8),
          paddingRight: R(playerExist ? 18 : 8),
          paddingTop: R(playerExist ? 3 : 6),
          paddingBottom: R(playerExist ? 3 : 6),
          borderRadius: R(40),
          marginTop: R(3),
          fontSize: R(10),
      },
      statusImage: {
          width: R(15),
          height: R(15),
          position: 'absolute',
          top: 0,
          right: 0,
          borderRadius: R(20),
          background: 'white'
      },
      clickedIcon: {
          width: R(16),
          height: R(16)
      }
  }
}

export default function PlayerOnPitch ({
    player,
    style,
    boxClasses,
    placeholderText,
    onDeselectPlayer,
    isTransferWindow
}) {

    const playerExist = player.id
    const STYLES =  { ... getStyles(R, playerExist) }

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
        <div className={`grid relative ${boxClasses}`} style={{ ...STYLES.container, ...style }}>

            {
                playerExist ? (
                    <AnimatePresence>
                        <motion.div
                            className={'flex flex-col items-center'}
                            style={STYLES.imageContainer}
                            variants={fadeInOutAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={1}
                        >
                            <div className={'flex flex-col items-center'}>
                                <PlayerImage
                                    player={player}
                                    ciw={18}
                                    cih={18}
                                    clickedIcon={'close1.png'}
                                    onIconClick={onDeselectPlayer}
                                />
                                <p className={'items-center relative items-center text-center justify-center cursor-pointer primary-button-color text-white whitespace-nowrap'}
                                   style={STYLES.buttonStyle}
                                >
                                    {
                                        player.status === STATUS_INJURED || player.status === STATUS_SUSPENDED && (
                                            <div className={'flex items-center justify-center'}
                                                 style={STYLES.statusImage}>
                                                <img src={`/images/${player.statusImage}`} alt="" width={10}
                                                     height={10}/>
                                            </div>
                                        )
                                    }
                                    <span>{player.name}</span><br/>
                                    <span>{nFormatter(player.price)}</span><br/>
                                </p>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                ): (
                    <AnimatePresence>
                        <motion.div
                            className={'flex flex-col items-center'}
                            style={STYLES.imageContainer}
                            variants={fadeInOutAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={2}
                        >
                            <div className={'flex flex-col items-center'}>
                                <Image name={'player_empty.png'} w={40} h={40} alt={''}/>
                                <p className={'items-center  justify-center cursor-pointer primary-button-color text-white whitespace-nowrap'}
                                   style={STYLES.buttonStyle}
                                >
                                    <span>{placeholderText}</span><br/>
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )
            }

        </div>
    )
}