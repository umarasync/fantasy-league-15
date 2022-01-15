// Utils
import RS from "utils/responsiveStyle";

// Styles
const getStyles = (RS, style) => {
    const {
        w, h, p, pl, pr, pt, pb, m, ml, mr, mt, mb, bs, center, justifyBetween, br,
        position, left, right, top, bottom, bg, cursor, display, textCenter
    } = style

    return {
        container: {
            ...RS.width(w),
            ...RS.height(h),

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

            ...RS.center(center),
            ...RS.justifyBetween(justifyBetween),

            ...RS.borderRadius(br),

            ...RS.boxShadow(bs),

            ...RS.position(position),
            ...RS.left(left),
            ...RS.right(right),
            ...RS.top(top),
            ...RS.bottom(bottom),

            ...RS.background(bg),

            ...RS.cursor(cursor),

            ...RS.display(display),

            ...RS.textCenter(textCenter),


        }
    }
}

export default function Div(props) {
    const STYLES =  { ... getStyles(RS, { ...props })}
    const { children, style, className } = props
    return (<div className={className} style={{...STYLES.container, ...style}} >{children}</div>)
}