// Packages
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

// Components
import Image from "components/html/Image";

// Utils
import R from "utils/getResponsiveValue";
import PlayerImage from "components/player/PlayerImage";
import {nFormatter} from "utils/helpers";

// Constants
import { STATUS_SUSPENDED, STATUS_INJURED } from "constants/data/filters";

// Animations
import {PlayerOnPitchAnimation, PlayerOnPitchTransferAnimation} from "Animations/buildYourTeam/PlayerOnPitchAnimation";

// Styles
const getStyles = (R, playerExist) => {
  return {
      container: {},
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

const PlayerComponent = ({
     player,
     onDeselectPlayer,
     clickedIcon = 'close1.png',
 }) => {
    const playerExist = player.id
    const STYLES = {...getStyles(R, playerExist)}

    return (
        <div className={'flex flex-col items-center'}>
            <PlayerImage
                player={player}
                ciw={18}
                cih={18}
                clickedIcon={clickedIcon}
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
    )
}

const PlayerPlaceholder = ({
    player,
    placeholderText
}) => {
    const playerExist = player.id
    const STYLES = {...getStyles(R, playerExist)}

    return (
        <div className={'flex flex-col items-center'}>
            <Image name={'player_empty.png'} w={40} h={40} alt={''}/>
            <p className={'items-center  justify-center cursor-pointer primary-button-color text-white whitespace-nowrap'}
               style={STYLES.buttonStyle}
            >
                <span>{placeholderText}</span><br/>
            </p>
        </div>
    )
}

export default function PlayerOnPitch ({
    player,
    style,
    boxClasses,
    placeholderText,
    onDeselectPlayer,
}) {

    const playerExist = player.id
    const STYLES =  { ... getStyles(R, playerExist) }

    const [initialOpacity, setInitialOpacity] = useState(1)

    useEffect(() => {
        if(initialOpacity) {
            setInitialOpacity(0)
        }
    }, [player])


    // For Transfer Window Flow
    if(player.isTransferWindow) {
        return (
            <div className={`grid relative ${boxClasses}`} style={{...STYLES.container, ...style}}>
                {
                    !player.animateState ? (
                        <AnimatePresence>
                            <motion.div
                                className={'flex flex-col items-center'}
                                style={STYLES.imageContainer}
                                variants={PlayerOnPitchAnimation}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                custom={{initialOpacity}}
                                key={1}
                            >
                                <PlayerComponent player={player} onDeselectPlayer={onDeselectPlayer}/>
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <AnimatePresence>
                            <motion.div
                                className={'flex flex-col items-center'}
                                style={STYLES.imageContainer}
                                variants={PlayerOnPitchTransferAnimation}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                custom={{initialOpacity}}
                                key={2}
                            >
                                <PlayerComponent player={player} onDeselectPlayer={false} clickedIcon={'transfer1.png'}/>
                            </motion.div>
                        </AnimatePresence>
                    )
                }

            </div>
        )
    }else {
        // For Build Your Team Flow
        return (
            <div className={`grid relative ${boxClasses}`} style={{...STYLES.container, ...style}}>
                {
                    playerExist ? (
                        <AnimatePresence>
                            <motion.div
                                className={'flex flex-col items-center'}
                                style={STYLES.imageContainer}
                                variants={PlayerOnPitchAnimation}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                custom={{initialOpacity}}
                                key={1}
                            >
                                <PlayerComponent player={player} onDeselectPlayer={onDeselectPlayer}/>
                            </motion.div>
                        </AnimatePresence>
                    ) : (
                        <AnimatePresence>
                            <motion.div
                                className={'flex flex-col items-center'}
                                style={STYLES.imageContainer}
                                variants={PlayerOnPitchAnimation}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                custom={{initialOpacity}}
                                key={2}
                            >
                                <PlayerPlaceholder player={player} placeholderText={placeholderText}/>
                            </motion.div>
                        </AnimatePresence>
                    )
                }

            </div>
        )
    }

}