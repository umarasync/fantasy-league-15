// Utils
import RS from "utils/responsiveStyle";

// Styles
const getStyles = (RS, style) => {
    const {
        w, h, p, pl, pr, pt, pb,
    } = style

    return {
        container: {
            ...RS.padding(p),
            ...RS.paddingLeft(pl),
            ...RS.paddingRight(pr),
            ...RS.paddingTop(pt),
            ...RS.paddingBottom(pb),
        },
        image: {
            ...RS.width(w),
            ...RS.height(h),
        }
    }
}

export default function Image(props) {

    const STYLES =  { ... getStyles(RS, { ...props })}

    const { name, alt } = props

    return (
        <div style={STYLES.container}>
            <div style={STYLES.image}>
                <img src={`images/${name}`} alt={alt} width={'100%'} height={'100%'}/>
            </div>
        </div>
    )
}