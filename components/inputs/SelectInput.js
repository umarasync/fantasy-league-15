// Packages
import {useState} from "react";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from 'constants/colors'

// Styles
const getStyles = (R) => {
    return {
        parentContainerStyle:{
          zIndex: 1
        },
        container: {
            height: R(70),
            fontSize: R(18),
            marginBottom: R(7),
            borderRadius: R(12),
            paddingLeft: R(24),
            paddingRight: R(10)
        },
        arrowImage: {
            width: R(30),
            height: '100%'
        },
        text: {
            fontSize: R(18),
            color: colors.regent_grey
        },
        dropDownOptionBox: {
            padding: R(20)
        },
        optionText: {
            fontSize: R(18),
            // marginLeft: R(12)
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
    parentContainerStyle,
    hideLabel,
    openedBorderColor = 'black',
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

    const Label = () => {

        if(opened) {
            return <p className="input-focused text-black_rock">{placeholder}</p>
        }
        if(!opened && defaultValue !== initialValue) {
            return <p className="input-focused text-regent_grey">{placeholder}</p>
        }

        return null
    }

    return <div className={`relative w-full`} style={{...STYLES.parentContainerStyle, ...parentContainerStyle}}>
        { !hideLabel && <Label/> }
        <div
            className={`cursor-pointer flex items-center justify-between ${classes}`}
            style={{
                ...STYLES.container, ...style,
                border: `1px solid`,
                borderColor: opened ? openedBorderColor : colors.link_water
            }}
            onClick={handleClick}
        >
            <p style={{...STYLES.text, ...textStyle}}>{defaultValue}</p>
            <div
                className={'flex items-center'}
                style={STYLES.arrowImage}
            >
                <img
                    src={opened ? '/images/arrow-up.png' : '/images/arrow-down.png'}
                    width={R(15)}
                    height={R(15)}
                    alt=""
                />
            </div>
        </div>

        {
            opened && (
                <div className="absolute border-[1px] rounded-[1.2rem] shadow-[4px 4px 40px rgba(0, 0, 0, 0.03)] bg-white w-full">
                    {
                        options.map((option, index) => {
                            return (
                                <div
                                    key={index}
                                    className={'cursor-pointer flex items-center justify-between'}
                                    style={STYLES.dropDownOptionBox}
                                    onClick={() => setOptionValue(option)}
                                >
                                    <p className="font-[600] text-black_rock rounded-t-[1.2rem]"
                                       style={{
                                           ...STYLES.optionText,
                                       }}
                                    >
                                        {option.label}
                                    </p>


                                    {options.length - 1 !== index && <hr className="border-[1.5px] border-solid border-[link_water]"/> }
                                </div>
                            )

                        })
                    }
                </div>
            )
        }
    </div>
}