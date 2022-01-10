// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R, style) => {
    const {
        w,
        h,
        pl,
        pr,
        pt,
        pb,
        ml,
        mr,
        mt,
        mb,
    } = style

   const getWidth = w ? {width: R(w)} : {}
   const getHeight = h ? {width: R(h)} : {}

    return {
        container: {
            ...getWidth,
            ...getHeight,
            paddingLeft: pl ? R(pl): 0,
            paddingRight: pr ? R(pr): 0,
            paddingTop: pt ? R(pt): 0,
            paddingBottom: pb ? R(pb): 0,
            marginLeft: ml ? R(ml): 0,
            marginRight: mr ? R(mr): 0,
            marginTop: mt ? R(mt): 0,
            marginBottom: mb ? R(mb): 0,
        }
    }
}

export default function Div({
    children,
    w,
    h,
    pl,
    pr,
    pt,
    pb,
    ml,
    mr,
    mt,
    mb,
    style,
    className
}) {
    const STYLES =  { ... getStyles(R, {
        w,
        h,
        pl,
        pr,
        pt,
        pb,
        ml,
        mr,
        mt,
        mb
    })}

    return (<div className={className} style={{...STYLES.container, ...style}}>{children}</div>)
}