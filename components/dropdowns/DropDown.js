// Packages
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

// Components
import Div from "components/html/Div";
import Image from "components/html/Image";

// Animation
import {getDropDownAnimation} from 'Animations/DropDownAnimation'
import Text from "../html/Text";
import colors from "../../constants/colors";
import BorderHorizontal from "../borders/BorderHorizontal";

const DropDownsArrows = ({opened}) => {
    return (
        <Div className={'flex items-center justify-center'}>
            <Image
                src={opened ? '/images/arrow_up.png' : '/images/arrow_down.png'}
                w={24}
                h={24}
                alt={'arrow'}
            />
        </Div>
    )
}

export default function DropDown ({
    header,
    li,

    body,
    left,
    right = 0,
    pt = 20,
                                      dropDownContentStyle,
                                      data,
                                      handleLiClick,

}) {

    const [opened, setOpened] = useState(false)

    const handleHeaderClick = () => {
        setOpened(!opened)
    }

    return (
        <div className={`relative w-full z-[1]`}>

            <Div className={'flex items-center cursor-pointer'} onClick={handleHeaderClick}>
                {header}
                <DropDownsArrows opened={opened}/>
            </Div>

            {
                opened ? (
                    <AnimatePresence>
                        <motion.div
                            variants={getDropDownAnimation()}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                        >
                            <Div position={'absolute'} left={left} right={right} pt={pt}>
                                {/*{body}*/}
                                <div style={dropDownContentStyle}>
                                    {
                                        data.length > 0 && data.map((item, index) => {
                                            return (
                                                <Div key={item.id} onClick={() => handleLiClick(item)}
                                                     cursor={'pointer'}>

                                                    {li(item)}

                                                    {
                                                        index !== data.length - 1 && (
                                                            <BorderHorizontal/>
                                                        )
                                                    }
                                                </Div>

                                            )
                                        })
                                    }
                                </div>


                            </Div>
                        </motion.div>
                    </AnimatePresence>
                ) : <AnimatePresence/>

            }
        </div>
    )
}