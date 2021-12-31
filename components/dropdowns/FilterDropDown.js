// Packages
import {useState} from "react";

// Utils
import R from "utils/getResponsiveValue";

// Colors
import colors from "constants/colors";

// Styles
const getStyles = (R) => {
    return {
        filterText: {
            fontSize: R(20),
            color: colors.regent_grey,
            marginRight: R(4)
        },
        arrowImage: {
            width: R(13),
            height: R(13),
            marginTop: R(10),
            marginLeft: R(14),
        }
    }
}

export default function FilterDropDown ({
   options,
   setValue,
   classes,
   initialValue,
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

    return <div className="relative">

        <div className={'flex'}>
            <div className={'flex'}>
                <p style={STYLES.filterText}>Sort:</p>
                <p className="font-[600] text-black_rock" style={{fontSize: R(20)}} >
                    {defaultValue}
                </p>
            </div>
            <div className={'cursor-pointer'} style={STYLES.arrowImage} onClick={handleClick}>
                <img src={opened ? '/images/arrow-up.png' : '/images/arrow-down.png'} alt="" width={'100%'} height={'100%'}/>
            </div>
        </div>
        <div/>
        {
            opened && (
                <div className="mt-[0.6rem] absolute z-10 border-[1px] rounded-[1.2rem] shadow-[4px 4px 40px rgba(0, 0, 0, 0.03)] bg-white">
                    {
                        options.map((option, index) => {
                            return (
                                <>
                                    <p className="cursor-pointer text-[1.8rem] font-[600] text-black_rock px-[2rem] py-[2.4rem] hover:bg-mandy hover:text-white leading-[2.2rem] rounded-t-[1.2rem] whitespace-nowrap" onClick={() => setOptionValue(option)}

                                    >{option.name}</p>

                                    {options.length - 1 !== index && <hr className="border-[1.5px] border-solid border-[link_water]"/> }
                                </>
                            )

                        })
                    }
                </div>
            )
        }
    </div>
}