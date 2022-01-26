// Components
import {AnimatePresence, motion} from "framer-motion";

// Utils
import R from "utils/getResponsiveValue";
import PlayerImage from "components/player/PlayerImage";
import {useEffect, useState} from "react";
import {nFormatter} from "utils/helpers";

// Constants
import { STATUS_SUSPENDED, STATUS_INJURED } from "constants/data/filters";

// Styles
const getStyles = (R, player) => {
  return {
      container: {
          // border: '5px solid red'
      },
      playerImageD: {
          width: R(50),
          height: R(50),
      },
      placeHolderD: {
          width: R(40),
          height: R(40),
      },
      imageContainer:{
          marginBottom: R(10),
          position: 'absolute',
          top: 0
      },
      playerImage: {
          width: '100%',
          height:'100%'
      },


      title:{
            position: 'absolute',
            top: R(45)
      },
      buttonStyle: {
          paddingLeft: R(player ? 18 : 8),
          paddingRight: R(player ? 18 : 8),
          paddingTop: R(player ? 3 : 6),
          paddingBottom: R(player ? 3 : 6),
          borderRadius: R(40),
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
    onDeselectPlayer,
    isTransferWindow
}) {

    const STYLES =  { ... getStyles(R, player) }

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

const PlayerComponent = ({
    player,
    isTransferWindow
}) => {
    if(player) {
        return (
            <AnimatePresence>
                <motion.div
                    className={'flex flex-col items-center justify-center'}
                    style={{...STYLES.imageContainer, ...STYLES.playerImageD}}
                    variants={fadeInOutAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={1}
                >
                    <PlayerImage
                        player={player}
                        imageStyle={STYLES.playerImage}
                        ciw={18}
                        cih={18}
                        clickedIcon={'close1.png'}
                        onIconClick={onDeselectPlayer}
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
        )
    }else {
        return (
            <AnimatePresence>
                <motion.div
                    className={'flex flex-col items-center justify-center'}
                    style={{...STYLES.imageContainer, ...STYLES.placeHolderD}}
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
}

    return(
        <div className={`flex relative ${boxClasses}`} style={{ ...STYLES.container, ...style }}>

            {
                player? (
                    <AnimatePresence>
                        <motion.div
                            className={'flex flex-col items-center justify-center'}
                            style={{...STYLES.imageContainer, ...STYLES.playerImageD}}
                            variants={fadeInOutAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={1}
                        >
                            <PlayerImage
                                player={player}
                                imageStyle={STYLES.playerImage}
                                ciw={18}
                                cih={18}
                                clickedIcon={'close1.png'}
                                onIconClick={onDeselectPlayer}
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
                            style={{...STYLES.imageContainer, ...STYLES.placeHolderD}}
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