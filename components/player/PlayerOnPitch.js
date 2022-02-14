// Packages
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

// Components
import PlayerOnPitchText from "components/player/PlayerOnPitchText";
import PlayerBoxForTransfer from "components/player/PlayerBoxForTransfer";
import PlayerPlaceholder from "components/player/PlayerPlaceholder";

// Utils
import R from "utils/getResponsiveValue";
import PlayerImage from "components/player/PlayerImage";

// Animations
import {PlayerOnPitchAnimation} from "Animations/buildYourTeam/PlayerOnPitchAnimation";

// Styles
const getStyles = (R) => {
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
      clickedIcon: {
          width: R(16),
          height: R(16)
      }
  }
}

const PlayerComponent = ({
     player,
     onDeselectPlayer,
 }) => {
    return (
        <div className={'flex flex-col items-center'}>
            <PlayerImage
                player={player}
                ciw={18}
                cih={18}
                clickedIcon={'/images/close1.png'}
                onIconClick={onDeselectPlayer}
            />
            <PlayerOnPitchText player={player} mt={4}/>
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
    if(player.isOneFreeTransferWindow) {
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
                            <div style={STYLES.imageContainer}>
                                    <PlayerBoxForTransfer player={player} initialOpacity={initialOpacity}/>
                            </div>
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
                                <PlayerPlaceholder placeholderText={placeholderText}/>
                            </motion.div>
                        </AnimatePresence>
                    )
                }

            </div>
        )
    }

}