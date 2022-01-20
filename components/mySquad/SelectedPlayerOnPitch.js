// Packages
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

// Components
import PlayerImage from "components/player/PlayerImage";

// Utils
import R from "utils/getResponsiveValue";
import {nFormatter} from "utils/helpers";
import {MATCHES, TOTAL_POINTS} from "utils/mySquad";

// Constants
import { STATUS_SUSPENDED, STATUS_INJURED } from "constants/data/filters";

// Animation
import SelectedPlayerOnPitchAnimation, {TextUnderPlayerNameAnimation } from "Animations/mySquad/SelectedPlayerOnPitchAnimation";

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
        subTitle:{
            position: 'absolute',
            left: 0,
            right: 0
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

const SubTitle = ({player, initialOpacity}) => {

    const STYLES =  { ... getStyles(R, player) }

    if(player.activeFilter === TOTAL_POINTS) {
        return (
            <AnimatePresence>
                    <motion.span
                        variants={TextUnderPlayerNameAnimation}
                        custom={{initialOpacity}}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={1}
                        style={STYLES.subTitle}
                    >
                        {`${player.points} pts`}
                    </motion.span>
            </AnimatePresence>
        )
    } else if(player.activeFilter === MATCHES) {
        return (
            <AnimatePresence>
                <motion.span
                    variants={TextUnderPlayerNameAnimation}
                    custom={{initialOpacity}}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={2}
                    style={STYLES.subTitle}
                >
                    {`${player.nextMatch.vs} (${player.nextMatch.matchType})`}
                </motion.span>
            </AnimatePresence>
        )
    }
    return (
        <AnimatePresence>
            <motion.span
                variants={TextUnderPlayerNameAnimation}
                custom={{initialOpacity}}
                initial="initial"
                animate="animate"
                exit="exit"
                key={3}
                style={STYLES.subTitle}
            >
                {nFormatter(player.price)}
            </motion.span>
        </AnimatePresence>

    )

}

const PlayerComponent = ({player, onPlayerChange, initialOpacity}) => {

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
                <div className={'relative'}>
                    <SubTitle player={player} initialOpacity={initialOpacity}/>
                </div>
                <br/>
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
                                initialOpacity={initialOpacity}
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
                                initialOpacity={initialOpacity}
                            />
                        </motion.div>
                    </AnimatePresence>
                )
            }

        </div>
    )
}