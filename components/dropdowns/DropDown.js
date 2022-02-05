// Packages
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

// Components
import Div from "components/html/Div";
import Image from "components/html/Image";

// Animation
import {getDropDownAnimation} from 'Animations/DropDownAnimation'
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

// Styles
const getStyles = (R) => {
    return {
        container: {
            background: colors.white,
            borderRadius: R(12),
            marginTop: R(20)
        }
    }
}

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
    //Required
    data,
    header,
    li,
    onSelect,
    // Optional
    styles,
    directionRight
}) {

    const STYLES = {...getStyles(R)}

    const [opened, setOpened] = useState(false)
    const [selectedItem, setSelectedItem] = useState({...data[0]})

    const handleHeaderClick = () => {
        setOpened(!opened)
    }

    const handleLiClick = (item) => {
        setSelectedItem({...item})
        onSelect({...item})
    }

    return (
        <div className={`relative w-full z-[1]`}>
            <Div className={'flex items-center cursor-pointer'} onClick={handleHeaderClick}>
                {header(selectedItem)}
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
                            <Div position={'absolute'} right={directionRight}>
                                <div style={{...STYLES.container, ...styles.container}}>
                                    {
                                        data.length > 0 && data.map((item, index) => {
                                            return (
                                                <Div
                                                    key={item.id}
                                                    onClick={() => handleLiClick(item)}
                                                    cursor={'pointer'}
                                                >
                                                    {li({item, index, data})}
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