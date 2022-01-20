// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        playerImage: {
            width: R(70),
            height: R(70),
            borderRadius: '50%',
            position: 'relative',
        },
        clubImageStyle: {
            width: R(26),
            height: R(26),
            bottom: 0,
            right: 0,
            position: 'absolute',
        },
        clickedIcon: {
            position: 'absolute',
            width: R(13),
            height: R(13),
            top: 0,
            left: 0
        }
    }
}

export default function PlayerImage({
    player,
    imageStyle,
    clubImageStyle,
    clickedIcon,
    onDeselect,
    clickedIconStyle
}) {

    const STYLES =  { ... getStyles(R) }

    if(!player) return null

    return (
        <div style={{...STYLES.playerImage, ...imageStyle}}>
            <img src={`/images/${player.image}`} alt="" width={'100%'} height={'100%'}/>
            {
                clickedIcon && (
                    <div style={{
                        ...STYLES.clickedIcon,
                        ...clickedIconStyle,
                        cursor: !player.disableIconClick ? 'pointer' : 'auto'
                    }}
                         onClick={() => !player.disableIconClick && onDeselect ? onDeselect() : false}>
                        <img src={`/images/${clickedIcon}`} alt="" width={'100%'} height={'100%'} />
                    </div>
                )
            }
            <div style={{ ...STYLES.clubImageStyle, ...clubImageStyle }}>
                <img src={`/images/${player.clubImage}`} alt="" width={'100%'} height={'100%'} />
            </div>
        </div>
    )
}