// Utils
import RS from "utils/responsiveStyle"

// Styles
const getStyles = (RS, style) => {
    const {
        w, h, p, pl, pr, pt, pb, m, ml, mr, mt, mb, fs, lh, fw, fst, tt, br, bs, bg, cursor,
        textCenter, textAlign, center, color, z, nowrap, opacity, inline, minW
    } = style

    return {
        text: {
            ...RS.fontSize(fs),
            ...RS.fontWeight(fw),
            ...RS.fontStyle(fst),
            ...RS.textTransform(tt),
            ...RS.color(color),
            ...RS.lineHeight(lh),
            ...RS.noWrap(nowrap),
            ...RS.textCenter(textCenter),
            ...RS.textAlign(textAlign),

            ...RS.width(w),
            ...RS.minWidth(minW),
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

            ...RS.borderRadius(br),

            ...RS.boxShadow(bs),
            ...RS.opacity(opacity),

            ...RS.cursor(cursor),

            ...RS.background(bg),

            ...RS.zIndex(z),
            ...RS.inline(inline),

        }
    }
}

export default function Text(props) {

    const STYLES =  { ...getStyles(RS, { ...props })}

    const { text, style, className, onClick } = props

    return (
        <p {...props} className={className} style={{...STYLES.text, ...style}} onClick={() => onClick ? onClick() : false}>{text}</p>
    )
}