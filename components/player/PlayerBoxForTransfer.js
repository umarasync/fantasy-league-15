// Packages
import {motion} from "framer-motion";

// Components
import PlayerImage from "components/player/PlayerImage";
import PlayerOnPitchText from "components/player/PlayerOnPitchText";

// Animations
import {PlayerOnPitchTransferAnimation} from "Animations/buildYourTeam/PlayerOnPitchAnimation";


export default function PlayerBoxForTransfer({
     player,
     initialOpacity,
 }) {
    return (
        <div className={'flex flex-col items-center'}>
            <PlayerImage
                player={player}
                animatedImage={true}
                imageAnimation={PlayerOnPitchTransferAnimation}
                initialOpacity={initialOpacity}
                ciw={18}
                cih={18}
                clickedIcon={'/images/transfer1.png'}
                onIconClick={false}
            />
            <motion.div
                className={'flex flex-col items-center'}
                variants={PlayerOnPitchTransferAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={{initialOpacity}}
            >
                <PlayerOnPitchText player={player}/>
            </motion.div>

        </div>
    )
}
