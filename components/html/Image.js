// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R, style) => {
    const {pl, pr, pt, pb } = style
    return {
        container: {
            paddingLeft: pl ? R(pl): 0,
            paddingRight: pr ? R(pr): 0,
            paddingTop: pt ? R(pt): 0,
            paddingBottom: pb ? R(pb): 0
        }
    }
}

export default function Image({
    w,
    h,
    name,
    alt= '',
    pl,
    pr,
    pt,
    pb,
}) {

    const STYLES =  { ... getStyles(R, {
            pl,
            pr,
            pt,
            pb
        })}


    return (
        <div style={STYLES.container}>
            <div style={{width: R(w), height: R(h)}}>
                <img src={`images/${name}`} alt={alt} width={'100%'} height={'100%'}/>
            </div>
        </div>

    )
}