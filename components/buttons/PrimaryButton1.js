// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R, style) => {
    const { disabled } = style
    return {
        container: {
            opacity: disabled ? 0.5 : 1
        },

        textStyle: {
            boxShadow: '0px 4px 0px #CB3156',
            borderRadius: R(12),
            fontSize: R(16),
            height: R(70),
        }
    }
}

export default function PrimaryButton1(props){

    const {
        title,
        onClick,
        buttonStyle,
        disabled,
        buttonClasses,
        style,
        textClasses,
    } = props

    const STYLES =  { ... getStyles(R, props) }

    const textClassesI = `primary-button-color w-full flex items-center bg-white justify-center font-[900] italic text-white uppercase cursor-pointer ${textClasses}`

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`w-full ${buttonClasses}`}
            style={{ ...STYLES.container, ...buttonStyle }}
        >
                <p className={textClassesI} style={{ ...STYLES.textStyle, ...style }}>{title}</p>

        </button>
    )
}