// Components
import {AnimatePresence, motion} from "framer-motion";

// Utils
import R from "utils/getResponsiveValue";
import PlayerImage from "components/player/PlayerImage";
import {useEffect, useState} from "react";
import {nFormatter} from "utils/helpers";

// Constants
import { STATUS_SUSPENDED, STATUS_INJURED } from "constants/data/filters";

// Animation
import SelectedPlayerOnPitchAnimation from "Animations/mySquad/SelectedPlayerOnPitchAnimation";

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
            top: 0,
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
        },
        clickedIcon: {
            width: R(16),
            height: R(16)
        }
    }
}

const PlayerComponent = ({player, onPlayerChange}) => {

    const STYLES =  { ... getStyles(R, player) }

    return (
        <>
            <PlayerImage
                player={player}
                imageStyle={STYLES.playerImage}
                clubImageStyle={STYLES.clubImageStyle}
                clickedIcon={player.clickedIcon}
                onDeselect={() => onPlayerChange(player)}
                clickedIconStyle={STYLES.clickedIcon}
            />
            <p className={'items-center relative items-center text-center justify-center primary-button-color text-white whitespace-nowrap'}
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
        </>
    )
}

export default function SelectedPlayerOnPitch ({
  changed,
   player,
   style,
   boxClasses,
   onPlayerChange
}) {

    const STYLES =  { ... getStyles(R, player) }

    const [initialOpacity, setInitialOpacity] = useState(1)

    useEffect(() => {
        if(initialOpacity) {
            setInitialOpacity(0)
        }
    }, [changed])

    return(
        <div className={`flex relative items-center justify-center ${boxClasses}`} style={{ ...STYLES.container, ...style }}>
            {
                changed ? (
                    <AnimatePresence>
                        <motion.div
                            className={'flex flex-col items-center justify-center'}
                            style={{...STYLES.imageContainer, ...STYLES.playerImageD}}
                            variants={SelectedPlayerOnPitchAnimation}
                            custom={{initialOpacity}}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={1}
                        >
                            <PlayerComponent
                                player={player}
                                onPlayerChange={onPlayerChange}
                            />
                        </motion.div>
                    </AnimatePresence>

                ): (
                    <AnimatePresence>
                        <motion.div
                            className={'flex flex-col items-center justify-center'}
                            style={{...STYLES.imageContainer, ...STYLES.playerImageD}}
                            variants={SelectedPlayerOnPitchAnimation}
                            custom={{initialOpacity}}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={2}
                        >
                            <PlayerComponent
                                player={player}
                                onPlayerChange={onPlayerChange}
                            />
                        </motion.div>
                    </AnimatePresence>
                )
            }

        </div>
    )
}