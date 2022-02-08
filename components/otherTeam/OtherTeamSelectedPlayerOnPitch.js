// Packages
import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

// Components
import PlayerImage from "components/player/PlayerImage";
import PlayerName from "components/player/PlayerName";

// Utils
import R from "utils/getResponsiveValue";
import {nFormatter, truncate} from "utils/helpers";
import {MATCHES, TOTAL_POINTS, getButtonBGColor} from "utils/mySquadHelper";

// Constants
import {STATUS_SUSPENDED, STATUS_INJURED} from "constants/data/filters";

// Animation
import SelectedPlayerOnPitchAnimation, {TextUnderPlayerNameAnimation} from "Animations/mySquad/SelectedPlayerOnPitchAnimation";

// Styles
const getStyles = (R, player) => {
    return {
        container: {},
        playerImageD: {
            width: R(50),
            height: R(50),
        },
        placeHolderD: {
            width: R(40),
            height: R(40),
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
            paddingLeft: R(player ? 18 : 8),
            paddingRight: R(player ? 18 : 8),
            paddingTop: R(player ? 3 : 6),
            paddingBottom: R(player ? 3 : 6),
            borderRadius: R(40),
            marginTop: R(3),
            fontSize: R(10),
            width: R(90)
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

    const STYLES = {...getStyles(R, player)}

    if (player.activeFilter === TOTAL_POINTS) {
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
    } else if (player.activeFilter === MATCHES) {
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
                {`${nFormatter(player.price)} ${player.position}`}
            </motion.span>
        </AnimatePresence>
    )

}

const PlayerComponent = ({player, initialOpacity}) => {

    const STYLES = {...getStyles(R, player)}

    return (
        <div className={'flex flex-col items-center'}>
            <PlayerImage
                player={player}
                ciw={18}
                cih={18}
                cursor={'pointer'}
                clickedIcon={player.clickedIcon}
                clickedIconStyle={STYLES.clickedIcon}
            />
            <div
                className={`relative items-center text-center cursor-pointer justify-center text-white whitespace-nowrap ${getButtonBGColor(player)}`}
                style={STYLES.buttonStyle}
            >
                {
                    player.status === STATUS_INJURED || player.status === STATUS_SUSPENDED && (
                        <div className={'flex items-center justify-center'} style={STYLES.statusImage}>
                            <img src={`/images/${player.statusImage}`} alt="" width={10} height={10}/>
                        </div>
                    )
                }

                <PlayerName player={player}/>

                <div className={'relative'}>
                    <SubTitle player={player} initialOpacity={initialOpacity}/>
                </div>
                <br/>
            </div>
        </div>
    )
}

export default function OtherTeamSelectedPlayerOnPitch({
    changed,
    player,
    style,
    boxClasses
}) {

    const STYLES = {...getStyles(R, player)}

    const [initialOpacity, setInitialOpacity] = useState(1)

    useEffect(() => {
        if (initialOpacity) {
            setInitialOpacity(0)
        }
    }, [changed])

    return (
        <div className={`grid relative ${boxClasses}`} style={{
            ...STYLES.container,
            ...style
        }}>
            {
                changed ? (
                    <AnimatePresence>
                        <motion.div
                            className={''}
                            style={STYLES.imageContainer}
                            variants={SelectedPlayerOnPitchAnimation}
                            custom={{initialOpacity}}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={1}
                        >
                            <PlayerComponent
                                player={player}
                                initialOpacity={initialOpacity}
                            />
                        </motion.div>
                    </AnimatePresence>

                ) : (
                    <AnimatePresence>
                        <motion.div
                            className={'flex flex-col items-center justify-center'}
                            style={STYLES.imageContainer}
                            variants={SelectedPlayerOnPitchAnimation}
                            custom={{initialOpacity}}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            key={2}
                        >
                            <PlayerComponent
                                player={player}
                                initialOpacity={initialOpacity}
                            />
                        </motion.div>
                    </AnimatePresence>
                )
            }

        </div>
    )
}