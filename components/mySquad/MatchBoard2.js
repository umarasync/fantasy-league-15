// Packages
import {AnimatePresence, motion, useAnimation} from "framer-motion";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";

// Constants
import {SHADOW_WHITE_SMOKE} from "constants/data/boxShadow";
import colors from "constants/colors";
import R from "utils/getResponsiveValue";
import Image from "components/html/Image";
import {useEffect, useState} from "react";

// Styles
const getStyles = (R) => {
    return {
        container: {
            // whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
        item: {
            height: 'max-content',
            cursor: 'pointer',
            display: 'inline-block',
            textAlign: 'center',
            background: 'white',
        }
    }
}

const data = [
    {
        id: 1,
        week: 'Gameweek 8',
        date: '29 sep'
    },
    {
        id: 2,
        week: 'Gameweek 8',
        date: '29 sep'
    },
    {
        id: 3,
        week: 'Gameweek 8',
        date: '29 sep'
    },
    {
        id: 4,
        week: 'Gameweek 8',
        date: '29 sep'
    },
    {
        id: 5,
        week: 'Gameweek 8',
        date: '29 sep'
    },
    {
        id: 6,
        week: 'Gameweek 8',
        date: '29 sep'
    },
    {
        id: 7,
        week: 'Gameweek 8',
        date: 'Make transfers'
    },
    {
        id: 8,
        week: 'Gameweek 8',
        date: '29 sep'
    },
    {
        id: 9,
        week: 'Gameweek 8',
        date: '29 sep'
    },
    {
        id: 10,
        week: 'Gameweek 8',
        date: '29 sep'
    },
    {
        id: 11,
        week: 'Gameweek 8',
        date: '29 sep'
    },
    {
        id: 12,
        week: 'Gameweek 8',
        date: '29 sep'
    },
    {
        id: 13,
        week: 'Gameweek 8',
        date: '29 sep'
    },
]

export default function MatchBoard () {

    const STYLES =  { ...getStyles(R) }

    const controls = useAnimation()

    const [moved, setMoved] = useState(0)

    const duration = 0.5

    const animationVariants = {
        initial:{},
        animate: {
            x: -moved,
            transition: {
                duration: duration,
            },
        }
    };


    const handlePrevClick = () => {
        if(!moved) return
        setMoved(moved - 205)
    }

    const handleNextClick = () => { setMoved(moved + 205) }

    useEffect(() => {
        controls.start('animate')
    }, [moved])

    return (
        <Div h={720} pt={40} w={1280} className={'bg-red-200'} position="relative"  br={12} bs={SHADOW_WHITE_SMOKE}>
            <Div style={STYLES.container} pl={166} pr={166} className={'flex justify-between'}>
                <motion.div
                    variants={animationVariants}
                    animate={controls}
                    key={1}

                    className={'flex flex-col items-center whitespace-nowrap'}
                    style={STYLES.item}
                >
                    <Text text={'Gameweek 8'} color={colors.regent_grey} fs={18} lh={26}/>
                    <Text text={'29 sep'} color={colors.regent_grey} fs={28} lh={32} fst={'italic'} tt={'uppercase'} fw={700}/>
                </motion.div>
                <motion.div
                    variants={animationVariants}
                    animate={controls}
                    key={1}

                    className={'flex flex-col items-center whitespace-nowrap'}
                    style={STYLES.item}
                >
                    <Text text={'Gameweek 8'} color={colors.regent_grey} fs={18} lh={26}/>
                    <Text text={'29 sep'} color={colors.regent_grey} fs={28} lh={32} fst={'italic'} tt={'uppercase'} fw={700}/>
                </motion.div>
                <motion.div
                    variants={animationVariants}
                    animate={controls}
                    key={1}

                    className={'flex flex-col items-center whitespace-nowrap'}
                    style={STYLES.item}
                >
                    <Text text={'Gameweek 8'} color={colors.regent_grey} fs={18} lh={26}/>
                    <Text text={'Make transfers'} color={colors.regent_grey} fs={28} lh={32} fst={'italic'} tt={'uppercase'} fw={700}/>
                </motion.div>
                <motion.div
                    variants={animationVariants}
                    animate={controls}
                    key={1}

                    className={'flex flex-col items-center whitespace-nowrap'}
                    style={STYLES.item}
                >
                    <Text text={'Gameweek 8'} color={colors.regent_grey} fs={18} lh={26}/>
                    <Text text={'29 sep'} color={colors.regent_grey} fs={28} lh={32} fst={'italic'} tt={'uppercase'} fw={700}/>
                </motion.div>
                <motion.div
                    variants={animationVariants}
                    animate={controls}
                    key={1}

                    className={'flex flex-col items-center whitespace-nowrap'}
                    style={STYLES.item}
                >
                    <Text text={'Gameweek 8'} color={colors.regent_grey} fs={18} lh={26}/>
                    <Text text={'29 sep'} color={colors.regent_grey} fs={28} lh={32} fst={'italic'} tt={'uppercase'} fw={700}/>
                </motion.div>

            </Div>

            <Div position='absolute' top={40} left={40}>
                <Image w={60} h={60} name={'arrow-prev.png'} cursor={'pointer'} bg={'green'} onClick={handlePrevClick}/>
            </Div>

            <Div position='absolute' top={40} right={40}>
                <Image w={60} h={60} name={'arrow-next.png'} cursor={'pointer'} bg={'green'} onClick={handleNextClick}/>
            </Div>
        </Div>
    )
}