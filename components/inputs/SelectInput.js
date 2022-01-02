// Packages
import {useState} from "react";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from 'constants/colors'

// Styles
const getStyles = (R) => {
    return {
        container: {
            height: R(70),
            fontSize: R(18),
            marginBottom: R(7),
            borderRadius: R(12),
            paddingLeft: R(24),
            paddingRight: R(32)
        },
        text: {
            fontSize: R(18),
            color: colors.regent_grey
        }
    }
}
export default function Input ({
       placeholder,
       options,
       setValue,
       classes,
       initialValue,
       style,
       textStyle,
       parentContainerStyle
}) {

    const STYLES =  { ... getStyles(R) }

    const [opened, setOpened] = useState(false)
    const [defaultValue, setDefaultValue] = useState(initialValue)
    const handleClick = () => {
        setOpened(!opened)
    }
    const setOptionValue = (option) => {
        setOpened(false)
        setDefaultValue(option.name)
        setValue(option)
    }

    return <div className="relative w-full" style={{...parentContainerStyle}}>
        { opened && <p className="input-focused text-black_rock">{placeholder}</p> }
        { defaultValue !== initialValue  && !opened && <p className="input-focused text-regent_grey">{placeholder}</p> }

        <div
            className={
                `cursor-pointer flex items-center justify-between border-solid border-[0.15rem] 
                ${opened ? 'border-[#000000]': 'border-[#DCE3EC] ' } ${classes}`
            }
            style={{...STYLES.container, ...style}}
            onClick={handleClick}
        >
            <p style={{...STYLES.text, ...textStyle}}>{defaultValue}</p>
            <img src={opened ? '/images/arrow-up.png' : '/images/arrow-down.png'} alt=""/>
        </div>

        {
            opened && (
                <div className="absolute z-10 border-[1px] rounded-[1.2rem] shadow-[4px 4px 40px rgba(0, 0, 0, 0.03)] bg-white w-full">
                    {
                        options.map((option, index) => {
                            return <div key={index}>
                                 <p className="cursor-pointer text-[1.8rem] font-[600] text-black_rock p-[2rem] hover:bg-mandy hover:text-white rounded-t-[1.2rem]" onClick={() => setOptionValue(option)}>{option.name}</p>
                                {options.length - 1 !== index && <hr className="border-[1.5px] border-solid border-[link_water]"/> }
                            </div>

                        })
                    }
                </div>
            )
        }
    </div>
}