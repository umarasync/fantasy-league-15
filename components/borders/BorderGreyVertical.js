// Utils
import RS from "utils/responsiveStyle";

// Styles
const getStyles = (RS, style) => {
    const {
        w, h, ml, mr
    } = style

    return {
        border: {
            ...RS.width(w ? w : 1),
            ...RS.height(h ? h : 60),
            ...RS.marginLeft(ml),
            ...RS.marginRight(mr),
        }
    }
}

export default function BorderGreyVertical(props) {

    const STYLES = {...getStyles(RS, {...props})}

    return (
        <p className="grey-faded-1 text-white" style={{...STYLES.border}}/>
    )
}