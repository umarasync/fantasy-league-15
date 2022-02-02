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

export default function PlayerImageForTransfer(props) {
    const {
        w = 50,
        h = 50,
        ciw = 26,
        cih = 26,
        player,
        clickedIcon,
        onIconClick,
        onPlayerClick,
        hideClubImage
    } = props

    const STYLES = {...getStyles(R, RS, {...props})}

    if (!player) return null

    return (
        <Div w={w} h={h} style={STYLES.image}>
            <Image onClick={onPlayerClick} src={`/images/${player.image}`} cursor={'pointer'}/>
            {
                clickedIcon && (
                    <Div h={16} w={16} position={'absolute'} left={0} top={0}
                         cursor={!player.disableIconClick ? 'pointer' : 'auto'}
                         onClick={() => !player.disableIconClick && onIconClick ? onIconClick() : false}
                    >
                        <Image src={`/images/${clickedIcon}`}/>
                    </Div>

                )
            }

            {
                !hideClubImage && (
                    <Div position='absolute' bottom={0} right={0}>
                        <Image w={ciw} h={cih} onClick={onPlayerClick} src={`/images/${player.clubImage}`}/>
                    </Div>
                )
            }
        </Div>
    )
}