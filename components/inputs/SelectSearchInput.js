// Packages
import {useState} from "react";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from 'constants/colors'
import CheckBox from "components/checkbox/CheckBox";

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
        tagsContainer: {
            fontSize: R(18),
            color: colors.regent_grey,
            marginRight: R(10)
        },
        tag: {
            marginRight: R(5)
        },
        input: {
            width: '100%',
            height: R(40),
            border: 'none',
            caretColor: colors.brick_red
        },
        dropDownBox: {
            padding: R(20)
        },
        option: {
            fontSize: R(18)
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
                                               selectedClubsNames,
    parentContainerStyle
}) {

    const STYLES =  { ... getStyles(R) }

    const [opened, setOpened] = useState(false)
    const [defaultValue, setDefaultValue] = useState(initialValue)

    const [tags, setTags] = useState(selectedClubsNames)


    const handleClick = () => {
        setOpened(!opened)
    }
    const setOptionValue = (option) => {
        // setOpened(false)
        setDefaultValue(option.name)
        setValue(option)
    }


    const removeTag = (i) => {
        const newTags = [ ...tags ];
        newTags.splice(i, 1);
        setTags(newTags)
    }

    const handleKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            const newTags = [ ...tags, val ];
            setTags(newTags)

            // this.setState({ tags: [...this.state.tags, val]});

            // this.tagInput.value = null;

        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags.length - 1);
        }
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
            onClick={handleClick}
        >
            <dv className={'flex w-full items-center'} style={{...STYLES.tagsContainer, ...textStyle}}>
                {tags.map((tag, index) => <span key={index} className={'whitespace-nowrap'} style={STYLES.tag}>{tag}</span>)}
                <input
                    className={'disable-input-outline'}
                    type="text" style={STYLES.input}
                    onKeyDown={handleKeyDown}
                />
            </dv>
            <img src={opened ? '/images/arrow-up.png' : '/images/arrow-down.png'} alt=""/>
        </div>

        {
            opened && (
                <div className="absolute z-10 border-[1px] rounded-[1.2rem] shadow-[4px 4px 40px rgba(0, 0, 0, 0.03)] bg-white w-full">
                    {
                        options.map((option, index) => {
                            return (
                                <div
                                    className={'cursor-pointer flex items-center justify-between'}
                                    style={STYLES.dropDownBox}
                                    onClick={() => setOptionValue(option)}
                                >
                                    <p
                                        className="font-[600] text-black_rock rounded-t-[1.2rem]"
                                        style={STYLES.option}
                                    >
                                        {option.clubName}
                                    </p>
                                    {options.length - 1 !== index && <hr className="border-[1.5px] border-solid border-[link_water]"/> }
                                    <CheckBox checked={option.checked}/>
                                </div>
                            )

                        })
                    }
                </div>
            )
        }
    </div>
}