// Utils
import RS from "utils/responsiveStyle";

// Styles
const getStyles = (RS, style) => {
    const {
        w, h
    } = style

    return {
        border: {
            ...RS.width(w ? w : 1),
            ...RS.height(h ? h : 60),
        }
    }
}

export default function Border(props) {

    const {style} = props

    const STYLES = {...getStyles(RS, {...props})}

    return (
        <p className="grey-faded-2 text-white" style={{...STYLES.border, ...style}}/>
    )
}