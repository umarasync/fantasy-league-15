// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        textStyle: {
            boxShadow: '0px 4px 0px #CB3156',
            borderRadius: R(12),
            fontSize: R(16),
            height: R(70),
        }
    }
}

export default function PrimaryButton({
    title,
    onClick,
    buttonStyle,
    disabled,
    buttonClasses,
    style,
    textClasses,
    disabledOpacity = 0.5,
}){

    const STYLES =  { ... getStyles(R) }

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`w-full ${buttonClasses}`}
            style={{
                opacity: disabled ? disabledOpacity : 1,
                ...buttonStyle
            }}
        >
                <p
                    className={`primary-button-color w-full flex items-center bg-white justify-center font-[900] italic text-white uppercase cursor-pointer ${textClasses}`}
                    style={{
                        ...STYLES.textStyle,
                        ...style
                    }}
                >{title}
                </p>
        </button>
    )
}