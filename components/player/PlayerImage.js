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
        }
    }
}

export default function PlayerImage({
    playerImage,
    clubImage,
    imageStyle,
    clubImageStyle
}) {

    const STYLES =  { ... getStyles(R) }

    return (
        <div style={{...STYLES.playerImage, ...imageStyle}}>
            <img src={`/images/${playerImage}`} alt="" width={'100%'} height={'100%'}/>
            <div style={{ ...STYLES.clubImageStyle, ...clubImageStyle }}>
                <img src={`/images/${clubImage}`} alt="" width={'100%'} height={'100%'} />
            </div>
        </div>
    )
}