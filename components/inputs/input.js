// Packages
import {useState} from "react";

// Components
import Div from "components/html/Div";
import Image from "components/html/Image";

// Utils
import R from "utils/getResponsiveValue";
import RS from "utils/responsiveStyle";

// Constants
import colors from 'constants/colors'

// Styles
const getStyles = (R, RS, style) => {
    const {
        h = 70, p, pl = 24, pr = 24, pt, pb, m, ml, mr, mt, mb = 32, br = 12, fs = 18
    } = style
    return {
        input: {
            ...RS.height(h),

            ...RS.fontSize(fs),

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

            ...RS.borderRadius(br),

            border: '1px solid',
            borderColor: colors.link_water,
        },
        icon: {
            top: R(28),
            right: R(30)
        }
    }
}
export default function Input (props) {

    const STYLES = {...getStyles(R, RS, {...props})}
    const {
        name,
        id,
        placeholder,
        onChange = (v) => false,
        onFocus = (v) => false,
        onClick = (v) => false,
        type = 'text',
        icon,
        style,
        onIconClick = (v) => false,
        classes,
        value,
        onKeyDown = (v) => false,
        ref=null,
        autoCompleteOff
    } = props

    const [focused, setFocused] = useState(false)

    const handleOnFocus = () => {
        onFocus(true)
        setFocused(true)
    }
    const onBlur = () => setFocused(false)

    const handleOnChange = (e) => {
        const valueI = e.target.value
        onChange(valueI)
    }

    const handleOnIconClick = () => onIconClick()

    return <div className="relative w-full">

        { focused && <p className="input-focused text-black_rock">{placeholder}</p> }
        { value && !focused && <p className="input-focused text-regent_grey">{placeholder}</p> }
        {
            icon && (
                <Div position={'absolute'} cursor={'pointer'} style={STYLES.icon} onClick={handleOnIconClick}>
                    <Image
                        src={`/images/${icon}`}
                        h={24}
                        w={24}
                        alt={'icon'}
                    />
                </Div>
            )}

        <input
            autoComplete={autoCompleteOff ? 'off' : 'on'}
            placeholder={placeholder}
            type={type}
            name={name}
            id={id}
            onFocus={handleOnFocus}
            onBlur={onBlur}
            onClick={onClick}
            onChange={handleOnChange}
            onKeyDown={onKeyDown}
            value={value}
            style={{ ...STYLES.input, ...style }}
            ref={ref}
            className={`w-[100%] font-[600] ${classes}`}
        />
    </div>
}