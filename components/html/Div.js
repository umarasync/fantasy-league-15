// Utils
import RS from "utils/responsiveStyle";

// Styles
const getStyles = (RS, style) => {
    const {
        w, h, maxH, minH, p, pl, pr, pt, pb, m, ml, mr, mt, mb, bs, center, justifyBetween, br,
        btlr, btrr, bblr, bbrr, b,
        position, left, right, top, bottom, bg, cursor, display, textCenter, textAlign, zIndex,
        overFlowXScroll
    } = style

    return {
        container: {
            ...RS.width(w),
            ...RS.height(h),
            ...RS.minHeight(minH),
            ...RS.maxHeight(maxH),

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

            ...RS.border(b),
            ...RS.borderRadius(br),
            ...RS.borderTopLeftRadius(btlr),
            ...RS.borderTopRightRadius(btrr),
            ...RS.borderBottomLeftRadius(bblr),
            ...RS.borderBottomRightRadius(bbrr),

            ...RS.boxShadow(bs),

            ...RS.position(position),
            ...RS.left(left),
            ...RS.right(right),
            ...RS.top(top),
            ...RS.bottom(bottom),

            ...RS.background(bg),

            ...RS.cursor(cursor),

            ...RS.display(display),
            ...RS.overFlowXScroll(overFlowXScroll),
            ...RS.zIndex(zIndex),

            ...RS.textCenter(textCenter),
            ...RS.textAlign(textAlign),
        }
    }
}

export default function Div(props) {
    const STYLES =  { ... getStyles(RS, { ...props })}
    const { children, style, className, onClick } = props
    return (
        <div
            className={className}
            style={{...STYLES.container, ...style}}
            onClick={() => onClick ? onClick(): false}
        >{children}</div>
    )
}