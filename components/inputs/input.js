// Packages
import {useState} from "react";

export default function Input ({
    name,
    id,
    placeholder,
    onChange,
    type='text',
    icon,
    onIconClick = () => false,
    style
}) {
    const [focused, setFocused] = useState(false)
    const [value, setValue] = useState('')
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    const handleOnChange = (e) => {
        const valueI = e.target.value
        setValue(valueI)
        onChange(valueI)
    }

    const handleOnIconClick = () => onIconClick()

    return <div className="relative w-full">

        { focused && <p className="input-focused text-black_rock">{placeholder}</p> }
        { value && !focused && <p className="input-focused text-regent_grey">{placeholder}</p> }
        { icon && <img src={`/images/${icon}`} onClick={handleOnIconClick} alt="" className="absolute top-[3rem] right-[3rem]"/> }

        <input
            placeholder={placeholder}
            type={type}
            name={name}
            id={id}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={handleOnChange}
            value={value}
            className={`mb-[3.2rem] rounded-[1.2rem] pl-[2.4rem] border-solid border border-[#DCE3EC] w-[100%] h-[7rem] text-[1.8rem] font-[600] ${style}`}
        />
    </div>
}