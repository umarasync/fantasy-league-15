// Packages
import {motion} from "framer-motion";

// Components
import Div from "components/html/Div"
import Image from "components/html/Image";

// Utils
import R from "utils/getResponsiveValue";
import RS from "utils/responsiveStyle"

// Styles
const getStyles = (R, RS, style) => {
    const {
        ml, mr, mt, mb,
    } = style
    return {
        image: {
            ...RS.marginLeft(ml),
            ...RS.marginRight(mr),
            ...RS.marginTop(mt),
            ...RS.marginBottom(mb),
            borderRadius: '50%',
            position: 'relative',
        },

        clickedIcon: {
            position: 'absolute',
            width: R(16),
            height: R(16),
            top: 0,
            left: 0
        }
    }
}

const ClubImage = ({
    ciw,
    cih,
    onPlayerClick,
    player,
    animatedText,
    textAnimation,
    initialOpacity,
    cursor,
}) => {

    if(animatedText) {
        return  (
            <motion.div
                className={'flex flex-col items-center'}
                variants={textAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={{initialOpacity}}
            >
                <Div position='absolute' bottom={0} right={0}>
                    {/* <Image w={ciw} h={cih} onClick={onPlayerClick} src={`/images/${player.clubImage}`} cursor={cursor}/> */}
                    <Image w={ciw} h={cih} onClick={onPlayerClick} src={player.clubImage} cursor={cursor}/>
                </Div>
            </motion.div>
        )
    }
   return (
       <Div position='absolute' bottom={0} right={0}>
           {/* <Image w={ciw} h={cih} onClick={onPlayerClick} src={`/images/${player.clubImage}`} cursor={cursor}/> */}
           <Image w={ciw} h={cih} onClick={onPlayerClick} src={player.clubImage} cursor={cursor}/>
       </Div>
   )
}

export default function PlayerImage(props) {
    const {
        w = 50,
        h = 50,
        ciw = 26,
        cih = 26,
        player,
        clickedIcon,
        onIconClick,
        onPlayerClick,
        hideClubImage,
        cursor,

        // For Animated Image
        animatedImage,
        imageAnimation,
        initialOpacity
    } = props

    const STYLES =  { ... getStyles(R, RS, { ...props }) }

    if(!player) return null

    return (
        <Div w={w} h={h} style={STYLES.image}>

            {
                animatedImage ? (
                    <motion.div
                        className={'flex flex-col items-center'}
                        variants={imageAnimation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        custom={{initialOpacity}}
                    >
                         <Image
                             onClick={onPlayerClick}
                            //  src={`/images/${player.image}`}
                             src={player.image}
                             alt={'playerImage'}
                             cursor={cursor}
                         />
                    </motion.div>
                ): (
                    <Image
                        onClick={onPlayerClick}
                        // src={`/images/${player.image}`}
                        src={player.image}
                        alt={'playerImage'}
                        cursor={cursor}
                    />
                )
            }

            {
                clickedIcon && (
                    <Div h={16} w={16} position={'absolute'} left={0} top={0} cursor={!player.disableIconClick ? 'pointer' : 'auto'}
                         onClick={() => !player.disableIconClick && onIconClick ? onIconClick() : false}
                    >
                        <Image src={`${clickedIcon}`}/>
                    </Div>

                )
            }

            {!hideClubImage && (
                <ClubImage
                    ciw={ciw}
                    cih={cih}
                    animatedText={animatedImage}
                    textAnimation={imageAnimation}
                    initialOpacity={initialOpacity}
                    player={player}
                    onPlayerClick={onPlayerClick}
                    cursor={cursor}
                />
            )}
        </Div>
    )
}