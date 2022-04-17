// Packages
import {AnimatePresence, motion} from "framer-motion";

// Animations
import TeamNameAnimation from "Animations/mySquad/TeamNameAnimation";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";
import PlayerImage from "components/player/PlayerImage";

// Utils
import {isEmpty} from "utils/helpers";

// Styles
const getStyles = (R, props) => {
    const { fromSecondClub } = props

    const getStyleAccordingToClub = () => {
        if(fromSecondClub) {
            return {
                marginRight: R(-15),
            }
        }else {
            return {
                marginLeft: R(-15)
            }
        }
    }

    return {
        teamName: {
            fontSize: R(24),
            lineHeight: R(28, 'px'),
            color: colors.black_rock,
            fontWeight: '600',
            textTransform: 'capitalize',
            position: 'absolute',
        },
        playerImagesContainer: {
            marginLeft: R(16),
            marginRight: R(16),
            marginTop: R(-6)
        },
        playerBox: {
            ...getStyleAccordingToClub()
        },
    }
}
export default function TeamName({
    index,
    parentIndex,
    initialOpacity,
    fromSecondClub,
    match,
    team,
    teamStyle,
    tabChanged
 }) {

    const STYLES =  { ...getStyles(R, {fromSecondClub}) }
    const { fantasyPlayers } = team
    const teamName = team.team.name

    console.log('1============', fantasyPlayers)

    if(match.finished) {
        if(tabChanged) {
            return (
                <AnimatePresence>
                    <motion.div
                        variants={TeamNameAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={1}
                        custom={{ index, parentIndex, initialOpacity, isMatchFinished: match.finished, fromSecondClub}}
                        style={{...STYLES.teamName, ...teamStyle}}
                        className={'flex'}
                    >
                        {fromSecondClub && teamName}
                        <div style={STYLES.playerImagesContainer} className={'flex'}>
                            {
                               !isEmpty(fantasyPlayers) && fantasyPlayers.map((player, index) => {
                                    return (
                                        <div
                                            key={index}
                                            style={STYLES.playerBox}
                                        >
                                            <PlayerImage hideClubImage player={player} w={40} h={40}/>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        {!fromSecondClub && teamName}
                    </motion.div>
                </AnimatePresence>
            )
        }else {
            return (
                <AnimatePresence>
                    <motion.div
                        variants={TeamNameAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        key={2}
                        custom={{ index, parentIndex, initialOpacity, isMatchFinished: match.finished, fromSecondClub}}
                        style={{...STYLES.teamName, ...teamStyle}}
                        className={'flex'}
                    >
                        {fromSecondClub && teamName}
                        <div style={STYLES.playerImagesContainer} className={'flex'}>
                            {
                                !isEmpty(fantasyPlayers) && fantasyPlayers.map((player, index) => {
                                    return (
                                        <div
                                            key={index}
                                            style={STYLES.playerBox}
                                        >
                                            <PlayerImage hideClubImage player={player} w={40} h={40}/>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        {!fromSecondClub && teamName}

                    </motion.div>
                </AnimatePresence>
            )
        }
    }else {
       if(tabChanged) {
           return (
               <AnimatePresence>
                   <motion.div
                       variants={TeamNameAnimation}
                       initial="initial"
                       animate="animate"
                       exit="exit"
                       key={3}
                       custom={{ index, parentIndex, initialOpacity, isMatchFinished: match.finished, fromSecondClub}}                                                               style={{...STYLES.teamName, ...teamStyle}}
                       className={'flex'}
                   >
                       {fromSecondClub && teamName}
                       <div style={STYLES.playerImagesContainer} className={'flex'}>
                           {
                               !isEmpty(fantasyPlayers) && fantasyPlayers.map((player, index) => {
                                   return (
                                       <div
                                           key={index}
                                           style={STYLES.playerBox}
                                       >
                                           <PlayerImage hideClubImage player={player} w={40} h={40}/>
                                       </div>
                                   )
                               })
                           }

                       </div>
                       {!fromSecondClub && teamName}
                   </motion.div>
               </AnimatePresence>
           )
       }else {
           return (
               <AnimatePresence>
                   <motion.div
                       variants={TeamNameAnimation}
                       initial="initial"
                       animate="animate"
                       exit="exit"
                       key={4}
                       custom={{ index, parentIndex, initialOpacity, isMatchFinished: match.finished, fromSecondClub}}                                                               style={{...STYLES.teamName, ...teamStyle}}
                       className={'flex'}
                   >
                       {fromSecondClub && teamName}
                       <div style={STYLES.playerImagesContainer} className={'flex'}>
                           {
                               !isEmpty(fantasyPlayers) &&  fantasyPlayers.map((player, index) => {
                                   return (
                                       <div
                                           key={index}
                                           style={STYLES.playerBox}
                                       >
                                           <PlayerImage hideClubImage player={player} w={40} h={40}/>
                                       </div>
                                   )
                               })
                           }

                       </div>
                       {!fromSecondClub && teamName}
                   </motion.div>
               </AnimatePresence>
           )
       }
    }

}