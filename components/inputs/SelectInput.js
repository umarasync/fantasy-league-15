// Packages
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from 'constants/colors'

// Animation
import Animation from 'Animations/DropDownAnimation'

// Styles
const getStyles = (R) => {
    return {
        parentContainerStyle:{
          zIndex: 1
        },
        container: {
            height: R(70),
            fontSize: R(18),
            // marginBottom: R(7),
            borderRadius: R(12),
            paddingLeft: R(24),
            paddingRight: R(10)
        },
        filterText: {
            fontSize: R(20),
            color: colors.regent_grey,
            marginRight: R(4)
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
            padding: R(20),
        },
        optionText: {
            fontSize: R(18),
        },
    }
}

export default function Input ({
   options,
   placeholder,
   selectedOption,
   onOptionChange,
   classes,
   style,
   textStyle,
   parentContainerStyle,
   dropDownOfInlineStyle,
    // For label on border
   hideLabel,
   openedBorderColor = 'black',
   skipFirstOption,
   textHoverColor = `text-mandy`
}) {

    const STYLES =  { ... getStyles(R) }
    const [opened, setOpened] = useState(false)

    const handleClick = () => {
        setOpened(!opened)
    }

    const setOptionValue = (option) => {
        setOpened(false)
        onOptionChange(option)
    }

    const Label = () => {
        if(opened) {
            return <p className="input-focused text-black_rock">{placeholder}</p>
        }
        if(!opened && selectedOption.label !== options[0].label) {
            return <p className="input-focused text-regent_grey">{placeholder}</p>
        }
        return null
    }

    return <div className={`relative w-full`} style={{...STYLES.parentContainerStyle, ...parentContainerStyle}}>
        { !hideLabel && <Label/> }

        {
            dropDownOfInlineStyle ?
                (
                    <div className={'flex cursor-pointer'}  onClick={handleClick}>
                        <div className={'flex'}>
                            <p style={STYLES.filterText}>Sort:</p>
                            <p className="font-[600] text-black_rock" style={{fontSize: R(20)}} >
                                {selectedOption.label}
                            </p>
                        </div>
                        <div className={'flex items-center'} style={{marginLeft: R(15)}}>
                            <img
                                src={opened ? '/images/arrow_up.png' : '/images/arrow_down.png'}
                                width={R(24)}
                                height={R(24)}
                                alt=""
                            />
                        </div>
                    </div>
                ) : (
                <div
                    className={`cursor-pointer flex items-center justify-between ${classes}`}
                    style={{
                        ...STYLES.container, ...style,
                        border: `1px solid`,
                        borderColor: opened ? openedBorderColor : colors.link_water
                    }}
                    onClick={handleClick}
                >
                    <p style={{...STYLES.text, ...textStyle}}>{selectedOption.label}</p>
                    <div
                        className={'flex items-center'}
                        style={STYLES.arrowImage}
                    >
                        <img
                            src={opened ? '/images/arrow_up.png' : '/images/arrow_down.png'}
                            width={R(15)}
                            height={R(15)}
                            alt=""
                        />
                    </div>
                </div>
            )
        }


        {
            opened ? (
                <AnimatePresence>
                    <motion.div
                        className={`absolute z-[100] border-[1px] rounded-[1.2rem] shadow-[4px 4px 40px rgba(0, 0, 0, 0.03)] bg-white ${!dropDownOfInlineStyle && 'w-full'}`}
                        variants={Animation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {
                            options.map((option, index) => {
                                return (
                                    !index && skipFirstOption ? null :
                                    <div
                                        key={index}
                                        className={`cursor-pointer flex items-center justify-between`}
                                        style={{
                                            ...STYLES.dropDownOptionBox,
                                            borderBottom: '1px solid',
                                            borderColor: options.length - 1 !== index ? colors.link_water : 'transparent'
                                        }}
                                        onClick={() => setOptionValue(option)}
                                    >
                                        <p className={`font-[600] hover:text-mandy text-black_rock rounded-t-[1.2rem]`}
                                           style={{
                                               ...STYLES.optionText,
                                           }}
                                        >
                                            {option.label}
                                        </p>
                                    </div>
                                )

                            })
                        }
                    </motion.div>
                </AnimatePresence>
            ) : <AnimatePresence/>

        }
    </div>
}