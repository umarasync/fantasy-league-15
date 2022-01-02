// Packages
import {useState} from "react";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from 'constants/colors'

// Styles
const getStyles = (R) => {
    return {
        input: {
            marginBottom: R(32),
            borderRadius: R(12),
            paddingLeft: R(24),
            border: '1px solid',
            borderColor: colors.link_water,
            height: R(70),
            fontSize: R(18),
        }
    }
}
export default function Input ({
    name,
    id,
    placeholder,
    onChange,
    type='text',
    icon,
    style,
    onIconClick = () => false,
    classes,
    value
}) {

    const STYLES =  { ... getStyles(R) }

    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    const handleOnChange = (e) => {
        const valueI = e.target.value
        onChange(valueI)
    }

    const handleOnIconClick = () => onIconClick()

    return <div className="relative w-full">

        { focused && <p className="input-focused text-black_rock">{placeholder}</p> }
        { value && !focused && <p className="input-focused text-regent_grey">{placeholder}</p> }
        { icon && <img src={`/images/${icon}`} onClick={handleOnIconClick} alt="" className="cursor-pointer absolute top-[3rem] right-[3rem]"/> }

        <input
            placeholder={placeholder}
            type={type}
            name={name}
            id={id}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleOnChange}
            value={value}
            style={{ ...STYLES.input, ...style }}
            className={`w-[100%] font-[600] ${classes}`}
        />
    </div>
}