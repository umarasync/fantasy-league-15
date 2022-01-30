// Utils
import RS from "utils/responsiveStyle";

// Styles
const getStyles = (RS, style) => {
    const {
        h, opacity
    } = style

    return {
        border: {
            ...RS.height(h ? h : 1),
            ...RS.opacity(opacity),
        }
    }
}

export default function BorderHorizontal(props) {

    const {style} = props

    const STYLES = {...getStyles(RS, {...props})}

    return (
        <p className="border-mystic text-white" style={{...STYLES.border, ...style}}/>
    )
}