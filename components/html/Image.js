// Utils
import RS from "utils/responsiveStyle";

// Styles
const getStyles = (RS, style) => {
    const {
        w, h, p, pl, pr, pb, pt, m, ml, mr, mt, mb, cursor, bg
    } = style

    return {
        container: {
            ...RS.padding(p),
            ...RS.paddingLeft(pl),
            ...RS.paddingRight(pr),
            ...RS.paddingTop(pt),
            ...RS.paddingBottom(pb),

            ...RS.margin(m),
            ...RS.marginLeft(ml),
            ...RS.marginRight(mr),
            ...RS.marginTop(mt),
            ...RS.marginBottom(mb),

            ...RS.cursor(cursor),
            ...RS.background(bg)
        },
        image: {
            ...RS.width(w),
            ...RS.height(h),
        }
    }
}

export default function Image(props) {

    const STYLES =  { ... getStyles(RS, { ...props })}

    const { name, alt, onClick, disabled } = props

    return (
        <div style={STYLES.container} onClick={() => (disabled || !onClick) ? false : onClick()}>
            <div style={STYLES.image}>
                <img src={`images/${name}`} alt={alt} width={'100%'} height={'100%'}/>
            </div>
        </div>
    )
}