// Packages
import {useEffect, useState} from "react";

// Components
import CheckBox from "components/checkbox/CheckBox";
import Input from "components/inputs/input";
import { AnimatePresence,motion} from "framer-motion";

// Utils
import R from "utils/getResponsiveValue";
import {searchInArray} from "utils/helpers";

// Constants
import colors from 'constants/colors'

// Animations
import Animation from 'Animations/DropDownAnimation'

// Styles
const getStyles = (R) => {
    return {
        container: {
            height: R(70),
            fontSize: R(18),
            marginBottom: R(7),
            borderRadius: R(12),
            paddingLeft: R(24),
            paddingRight: R(13)
        },
        tagsContainer: {
            fontSize: R(18),
            color: colors.regent_grey,
            marginRight: R(10)
        },
        tagImages: {
            marginRight: R(5),
            width: R(28),
            height: R(28)
        },
        optionImage: {
            width: R(36),
            height: R(36)
        },
        arrowImage: {
            width: R(30),
            height: '100%'
        },
        input: {
            width: '100%',
            height: R(40),
            border: 'none',
            paddingLeft: R(3),
            paddingRight: R(10),
            caretColor: colors.brick_red,
            marginBottom: 0,
            padding: 0
        },
        tagsInnerContainer: {
            maxWidth: '80%',
        },
        dropDownBox: {
          maxHeight: R(213),
          minHeight: R(70),
          overflowY: 'scroll'
        },
        dropDownOptionBox: {
            padding: R(20)
        },
        optionText: {
            fontSize: R(18),
            marginLeft: R(12)
        }
    }
}
export default function SelectSearchInput ({
       options,
       onOptionClicked,
       selectedOptions,
       firstOptionName,
       classes,
       label,
       style,
       textStyle,

       parentContainerStyle,
       dropDownBoxStyle,
       arrowImageStyle,
       hideSearchBox,
       optionImageStyle,
       tagImagesStyle,
    offClickOnParent
   }) {

    const OPTIONS = JSON.parse(JSON.stringify(options))

    const STYLES =  { ... getStyles(R) }

    const [opened, setOpened] = useState(false)

    const [ allOptions, setAllOptions ] = useState([...options])

    const handleOnChange = (value) => {
        const matchedOptions = searchInArray(value, OPTIONS,"label")
        if(matchedOptions.length === 0) {
            setAllOptions([...OPTIONS])
        }else {
            setAllOptions([...matchedOptions])
        }
    }

    const handleClick = () => {
        setOpened(!opened)
    }

    const setOptionValue = (item) => {
        onOptionClicked(item)
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Backspace' && !e.target.value) {
            if(selectedOptions.length === 0) return
            let item = selectedOptions[selectedOptions.length - 1]
            item.fromBackSpace = true
            onOptionClicked(item)
        }
    }

    useEffect(() => {
        setAllOptions(options)
    }, [options])

    const ClubItems = ({
       selectedOptions
   }) => {

        if(selectedOptions.length === 0) return null

        if(selectedOptions[0].value === firstOptionName) {
            return <span className={'whitespace-nowrap'} >{firstOptionName}</span>
        }

        return selectedOptions.map(option =>  <div
            className={'flex items-center'}
            key={option.label}
            style={{...STYLES.tagImages, ...tagImagesStyle}}
        >
            {/* <img src={`/images/${option.image}`} alt="" width={'100%'} height={'100%'}/> */}
            <img src={option.image} alt="" width={'100%'} height={'100%'}/>
        </div>)
    }

    const Label = () => {

        if(opened) {
            return <p className="input-focused text-regent_grey">{label}</p>
        }

        return null
    }

    return <div className="relative w-full" style={{...parentContainerStyle}}>
            <Label/>
        <div
            className={
                `cursor-pointer flex items-center justify-between border-solid border-[0.15rem] 
              border-[#DCE3EC] ${classes}`
            }
            style={{...STYLES.container, ...style}}
        >
            <dv className={'w-full flex items-center'} onClick={ offClickOnParent ? () => false : handleClick} style={{...STYLES.tagsContainer, ...textStyle}}>
                <div className={'flex items-center justify-center'} style={STYLES.tagsInnerContainer}>
                    <ClubItems selectedOptions={selectedOptions}/>
                </div>
                {
                    !hideSearchBox && (
                        <div className={'w-full'}>
                            <Input
                                classes={'disable-input-outline'}
                                onChange={handleOnChange}
                                type="text"
                                onFocus={(v) => setOpened(v)}
                                style={STYLES.input}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    )
                }

            </dv>
            <div onClick={handleClick}
                 className={'flex items-center'}
                 style={{...STYLES.arrowImage, ...arrowImageStyle}}
            >
                <img src={opened ? '/images/arrow_up.png' : '/images/arrow_down.png'} width={R(24)} height={R(24)} alt=""/>
            </div>
        </div>

        {
            opened ? (

                <AnimatePresence>
                    <motion.div
                        className="absolute z-10 border-[1px] rounded-[1.2rem] shadow-[4px 4px 40px rgba(0, 0, 0, 0.03)] bg-white w-full"
                        style={{
                            ...STYLES.dropDownBox,
                            ...dropDownBoxStyle
                        }}
                        variants={Animation}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {
                            allOptions.map((option, index) => {
                                return (
                                    <div
                                        key={option.label}
                                        className={'cursor-pointer flex items-center justify-between'}
                                        style={{
                                            ...STYLES.dropDownOptionBox,
                                            borderBottom: '1px solid',
                                            borderColor: options.length - 1 !== index ? colors.link_water : 'transparent'
                                        }}
                                        onClick={() => setOptionValue(option)}
                                    >
                                        <div className={'flex items-center'}>
                                            {
                                                option.label !== firstOptionName ? (
                                                    <div
                                                        className={'flex items-center'}
                                                        key={option.label}
                                                        style={{...STYLES.optionImage, ...optionImageStyle}}
                                                    >
                                                        {/* <img src={`/images/${option.image}`} alt="" width={'100%'} height={'100%'}/> */}
                                                        <img src={option.image} alt="" width={'100%'} height={'100%'}/>
                                                    </div>
                                                ) : null
                                            }

                                            <p className="font-[600] text-black_rock rounded-t-[1.2rem]"
                                               style={{
                                                   ...STYLES.optionText,
                                                   marginLeft: option.label !== firstOptionName ? 12 : 5
                                               }}
                                            >
                                                {option.label}
                                            </p>
                                        </div>

                                        <CheckBox checked={option.checked}/>
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