// Packages
import {useEffect, useState} from "react";

// Components
import CheckBox from "components/checkbox/CheckBox";
import Input from "components/inputs/input";

// Utils
import R from "utils/getResponsiveValue";
import {searchInArray} from "utils/helper";

// Constants
import colors from 'constants/colors'
import {ALL_TEAMS} from "constants/data/team";

// Styles
const getStyles = (R) => {
    return {
        container: {
            height: R(70),
            fontSize: R(18),
            marginBottom: R(7),
            borderRadius: R(12),
            paddingLeft: R(24),
            paddingRight: R(14)
        },
        tagsContainer: {
            fontSize: R(18),
            color: colors.regent_grey,
            marginRight: R(10)
        },
        tag: {
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
            padding: R(20)
        },
        optionText: {
            fontSize: R(18),
            marginLeft: R(12)
        }
    }
}
export default function SelectSearchInput ({
       placeholder,
       options,
       setValue,
       classes,
       initialValue,
       style,
       textStyle,
       selectedClubs,
       parentContainerStyle
   }) {

    const OPTIONS = JSON.parse(JSON.stringify(options))

    const STYLES =  { ... getStyles(R) }

    const [opened, setOpened] = useState(false)

    const [defaultValue, setDefaultValue] = useState(initialValue)

    const [ allOptions, setAllOptions ] = useState([...options])

    const handleOnChange = (value) => {
        const matchedOptions = searchInArray(value, OPTIONS,"name")
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
        // setOpened(false)
        setDefaultValue(item.name)
        setValue(item)
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Backspace' && !e.target.value) {
            if(selectedClubs.length === 0) return
            let item = selectedClubs[selectedClubs.length - 1]
            item.fromBackSpace = true
            setValue(item)
        }
    }

    useEffect(() => {
        setAllOptions(options)
    }, [options])

    const ClubItems = ({
       selectedClubs
   }) => {

        if(selectedClubs.length === 0) return null

        if(selectedClubs[0].name === ALL_TEAMS) {
            return <span className={'whitespace-nowrap'}>{ALL_TEAMS}</span>
        }

        return selectedClubs.map(club =>  <div
            className={'flex items-center'}
            key={club.name}
            style={STYLES.tag}
        >
            <img src={`/images/${club.image}`} alt="" width={'100%'} height={'100%'}/>
        </div>)
    }

    return <div className="relative w-full" style={{...parentContainerStyle}}>
        { opened && <p className="input-focused text-black_rock">{placeholder}</p> }
        { defaultValue !== initialValue  && !opened && <p className="input-focused text-regent_grey">{placeholder}</p> }

        <div
            className={
                `cursor-pointer flex items-center justify-between border-solid border-[0.15rem] 
              border-[#DCE3EC] ${classes}`
            }
            style={{...STYLES.container, ...style}}
        >
            <dv className={'w-full flex items-center'} style={{...STYLES.tagsContainer, ...textStyle}}>
                <div className={'flex items-center justify-center'} style={STYLES.tagsInnerContainer}>
                    <ClubItems selectedClubs={selectedClubs}/>
                </div>
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

            </dv>
            <div onClick={handleClick}
                 className={'flex items-center'}
                 style={STYLES.arrowImage}
            >
                <img src={opened ? '/images/arrow-up.png' : '/images/arrow-down.png'} width={R(12)} height={R(12)} alt=""/>
            </div>
        </div>

        {
            opened && (
                <div className="absolute z-10 border-[1px] rounded-[1.2rem] shadow-[4px 4px 40px rgba(0, 0, 0, 0.03)] bg-white w-full">
                    {
                        allOptions.map((club, index) => {
                            return (
                                <div
                                    key={club.name}
                                    className={'cursor-pointer flex items-center justify-between'}
                                    style={STYLES.dropDownBox}
                                    onClick={() => setOptionValue(club)}
                                >
                                    <div className={'flex items-center'}>
                                        {
                                            club.name !== ALL_TEAMS ? (
                                                <div
                                                    className={'flex items-center'}
                                                    key={club.name}
                                                    style={STYLES.optionImage}
                                                >
                                                    <img src={`/images/${club.image}`} alt="" width={'100%'} height={'100%'}/>
                                                </div>
                                            ) : null
                                        }


                                        <p className="font-[600] text-black_rock rounded-t-[1.2rem]"
                                           style={{
                                               ...STYLES.optionText,
                                               marginLeft: club.name !== ALL_TEAMS ? 12 : 5
                                           }}
                                        >
                                            {club.name}
                                        </p>
                                    </div>

                                    {allOptions.length - 1 !== index && <hr className="border-[1.5px] border-solid border-[link_water]"/> }
                                    <CheckBox checked={club.checked}/>
                                </div>
                            )

                        })
                    }
                </div>
            )
        }
    </div>
}