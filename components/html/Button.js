// Components
import Text from "components/html/Text";

// Utils
import R from "utils/getResponsiveValue";
import RS from "utils/responsiveStyle";

// Constants
import colors from "constants/colors";

// Styles
const getStyles = (R, RS, style) => {

    const { disabled,mt, mb, mr, ml, inline } = style


    return {
        button: {
            ...RS.width(!inline && '100%'),
            ...RS.marginTop(mt),
            ...RS.marginBottom(mb),
            ...RS.marginRight(mr),
            ...RS.marginLeft(ml),
            opacity: disabled ? 0.5 : 1
        }
    }
}

export default function Button(props){
    const {
        w= '100%',
        h = 70,
        fs = 16,
        fst = 'italic',
        bs = '0px 4px 0px #CB3156',
        tt = 'uppercase',
        br = 12,
        fw = 900,
        lh,
        bg,

        p,
        pl,
        pr,
        pt,
        pb,

        color = colors.white,
        title,
        onClick,
        disabled,
        className
    } = props

    const STYLES =  { ... getStyles(R, RS, {...props}) }

    return (
            <button disabled={disabled} onClick={onClick} style={STYLES.button}>
                <Text
                    text={title}
                    className={`primary-button-color ${className}`}
                    w={w}
                    h={h}
                    fs={fs}
                    fst={fst}
                    center
                    color={color || colors.white}
                    br={br}
                    lh={lh}
                    bs={bs}
                    tt={tt}
                    fw={fw}
                    bg={bg}
                    p={p}
                    pl={pl}
                    pr={pr}
                    pt={pt}
                    pb={pb}
                    cursor={'pointer'}
                />
            </button>
    )
}