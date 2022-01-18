// Utils
import RS from "utils/responsiveStyle"

// Styles
const getStyles = (RS, style) => {
    const {
        w, h, p, pl, pr, pt, pb, m, ml, mr, mt, mb, fs, lh, fw, fst, tt, br, bs, bg, cursor, center, color
    } = style

    return {
        text: {
            ...RS.fontSize(fs),
            ...RS.fontWeight(fw),
            ...RS.fontStyle(fst),
            ...RS.textTransform(tt),
            ...RS.color(color),
            ...RS.lineHeight(lh),

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

            ...RS.borderRadius(br),

            ...RS.boxShadow(bs),

            ...RS.cursor(cursor),

            ...RS.background(bg),
        }
    }
}

export default function Text(props) {

    const STYLES =  { ...getStyles(RS, { ...props })}

    const { text, style, className, onClick } = props

    return (
        <p className={className} style={{...STYLES.text, ...style}} onClick={() => onClick ? onClick() : false}>{text}</p>
    )
}