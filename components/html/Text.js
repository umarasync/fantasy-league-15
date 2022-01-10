// Utils
import R from "utils/getResponsiveValue";


export default function Text({
    text,
    fs,
    lh,
    fw = 'normal',
    fst = 'normal',
    mb = 'unset',
    color,
    style
}) {

    return (
        <p style={{
            fontSize: R(fs),
            lineHeight: R(lh, 'px'),
            marginBottom: R(mb),
            fontWeight: fw,
            color: color,
            fontStyle: fst,
            ...style
        }}>{text}</p>
    )
}