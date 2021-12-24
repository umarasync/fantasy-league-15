// Packages
import {useRef, useState} from "react";

export default function Input ({
       placeholder,
       options,
       setValue,
       classes,
       initialValue,
   }) {
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

    return <div className="relative">
        { opened && <p className="input-focused text-black_rock">{placeholder}</p> }
        { defaultValue !== initialValue  && !opened && <p className="input-focused text-regent_grey">{placeholder}</p> }

        <img src={opened ? '/images/arrow-up.png' : '/images/arrow-down.png'} alt="" className="absolute top-[3rem] right-[3rem]" onClick={handleClick}/>

        <p className="text-[1.8rem] absolute top-[2.3rem] left-[3rem] text-regent_grey">{defaultValue}</p>
        <div className={`mb-[0.7rem] rounded-[1.2rem] pl-[2.4rem] border-solid border-[0.15rem] h-[7rem] text-[1.8rem] ${opened ? 'border-[#000000]': 'border-[#DCE3EC] ' } ${classes}`} />
        {
            opened && (
                <div className="absolute z-10 border-[1px] rounded-[1.2rem] shadow-[4px 4px 40px rgba(0, 0, 0, 0.03)] bg-white w-full">
                    {
                        options.map((option, index) => {
                            return <div>
                                 <p className="text-[1.8rem] font-[600] text-black_rock p-[2rem]" onClick={() => setOptionValue(option)}>{option.name}</p>
                                {options.length - 1 !== index && <hr className="border-[1.5px] border-solid border-[link_water]"/> }
                            </div>

                        })
                    }
                </div>
            )
        }
    </div>
}