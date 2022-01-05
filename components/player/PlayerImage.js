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
        closeImage: {
            position: 'absolute',
            width: R(13),
            height: R(13),
            top: 0,
            left: 0,
            cursor: 'pointer'
        }
    }
}

export default function PlayerImage({
    playerImage,
    clubImage,
    imageStyle,
    clubImageStyle,
    showCloseIcon,
    onClose = () => false,
    closeImageStyle
}) {

    const STYLES =  { ... getStyles(R) }

    return (
        <div style={{...STYLES.playerImage, ...imageStyle}}>
            <img src={`/images/${playerImage}`} alt="" width={'100%'} height={'100%'}/>
            {
                showCloseIcon && (
                    <div style={{ ...STYLES.closeImage, ...closeImageStyle }} onClick={onClose}>
                        <img src={`/images/close1.svg`} alt="" width={'100%'} height={'100%'} />
                    </div>
                )
            }
            <div style={{ ...STYLES.clubImageStyle, ...clubImageStyle }}>
                <img src={`/images/${clubImage}`} alt="" width={'100%'} height={'100%'} />
            </div>
        </div>
    )
}