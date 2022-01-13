// Packages
import {motion, useAnimation} from "framer-motion";
import {useEffect, useRef, useState} from "react";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";

// Constants
import {SHADOW_WHITE_SMOKE} from "constants/data/boxShadow";
import colors from "constants/colors";

// utils
import {clone} from "utils/helpers";
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        container: {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
        scrollContainer:{
            whiteSpace: 'nowrap',
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
        date: '29 sep',
        active: false
    },
    {
        id: 2,
        week: 'Gameweek 8',
        date: '29 sep',
        active: false,
    },
    {
        id: 3,
        week: 'Gameweek 8',
        date: '29 sep',
        active: false
    },
    {
        id: 4,
        week: 'Gameweek 8',
        date: 'Make transfers',
        active: true
    },
    {
        id: 5,
        week: 'Gameweek 8',
        date: '29 sep',
        active: false
    },
    {
        id: 6,
        week: 'Gameweek 8',
        date: '29 sep',
        active: false
    },
    {
        id: 7,
        week: 'Gameweek 8',
        date: 'Make transfers',
        active: false
    },
    {
        id: 8,
        week: 'Gameweek 8',
        date: '29 sep',
        active: false
    },
    {
        id: 9,
        week: 'Gameweek 8',
        date: '29 sep',
        active: false
    },
    {
        id: 10,
        week: 'Gameweek 8',
        date: '29 sep',
        active: false
    },
    {
        id: 11,
        week: 'Gameweek 8',
        date: '29 sep',
        active: false
    },

]

export default function MatchBoard () {

    const STYLES =  { ...getStyles(R) }

    const INITIAL_MATCHES = clone(data)

    const [matches, setMatches] = useState(INITIAL_MATCHES)

    const scrollContainer = useRef()
    let activeRef = useRef()

    const controls = useAnimation()

    const [moved, setMoved] = useState(0)
    const [firstLoad, setFirstLoad] = useState(true)
    const [borderWidth, setBorderWidth] = useState(0)

    const duration = 0.5

    const scrollAnimationVariant = {
        scroll: {
            x: -moved,
            transition: {
                duration: duration,
            },
        },
    };

    const borderAnimationVariant = {
        borderWidth: {
            width: borderWidth,
            transition: {
                duration: duration
            }
        }
    };

    const getActiveRect = () => {
        const scrollRect = scrollContainer.current.getBoundingClientRect()
        const activeRect = activeRef.current.getBoundingClientRect()

        return {
            scrollRect,
            activeRect,
            activeLeft: activeRect.left - scrollRect.left
        };
    }

    const handleScroll = () => {

        const scrollBoxOriginPoint = 507.421875

        const { activeLeft, activeRect } = getActiveRect()

        setBorderWidth(activeRect.width)

        let movedPixels = 0;

        if(activeLeft > scrollBoxOriginPoint) {
            movedPixels = activeLeft - scrollBoxOriginPoint
        }else {
            movedPixels = -1 * (scrollBoxOriginPoint - activeLeft)
        }

        setFirstLoad(false)
        setMoved(moved + movedPixels)
    }

    const handleOnClick = (match) => {

        const $matches = matches.map((item) => {
            item.active = item.id === match.id;
            return item
        })

        setFirstLoad(false)
        setMatches($matches)
    }

    useEffect(() => {
        if(!firstLoad){ handleScroll()}
    }, [matches])

    useEffect(() => {
        if(!firstLoad){
            controls.start('scroll')
            controls.start('borderWidth')
        }
    }, [moved])

    useEffect(() => {
        setTimeout(() => {
            const { activeRect } = getActiveRect()
            setBorderWidth(activeRect.width)
            handleScroll()
        }, 300)
    }, [])

    const handleControls = (isNext = false) => {
        const $matches = clone(matches)
        let objIndex = $matches.findIndex((match) => match.active)
        $matches[objIndex].active = false

        let nextIndex = isNext ? objIndex + 1 : objIndex - 1

        if(nextIndex === $matches.length || nextIndex === -1) return

        $matches[nextIndex].active = true
        setFirstLoad(false)
        setMatches($matches)
    }

    return (
        <Div h={720} pt={40} w={1280} style={STYLES.container}  className={'bg-red-200'} position="relative"  br={12} bs={SHADOW_WHITE_SMOKE}>
            <div style={{...STYLES.scrollContainer, marginLeft: -25}} ref={scrollContainer}>
                {
                    matches.map((match, index) => {
                        return (
                            <motion.div
                                variants={scrollAnimationVariant}
                                animate={controls}
                                key={match.id}
                                className={'flex flex-col items-center'}
                                style={{...
                                        STYLES.item,
                                    marginLeft: index ? 31 : 0,
                                    marginRight: index !== data.length -1 ? 31 : 0,
                                    background: match.active ? 'yellow': 'whitesmoke'
                                }}
                            >
                                <div
                                    className={'flex flex-col items-center'}
                                    ref={ match.active ? activeRef : null }
                                    onClick={() => handleOnClick(match)}
                                >
                                    <Text text={match.week} color={colors.regent_grey} fs={18} lh={26}/>
                                    <Text text={match.date} color={colors.regent_grey} fs={28} lh={32} fst={'italic'} tt={'uppercase'} fw={700}/>

                                </div>

                            </motion.div>
                        )
                    })
                }
            </div>

            <Div position='absolute' top={40} left={40}>
                <Image w={60} h={60} name={'arrow-prev.png'} cursor={'pointer'} bg={'green'} onClick={() => handleControls()}/>
            </Div>

            <Div position='absolute' top={40} right={40}>
                <Image w={60} h={60} name={'arrow-next.png'} cursor={'pointer'} bg={'green'} onClick={() => handleControls(true)}/>
            </Div>

            <motion.div
                variants={borderAnimationVariant}
                animate={controls}
                style={{
                    width: borderWidth,
                    height: 2,
                    position: 'absolute',
                    background: colors.mandy,
                    marginTop: 10,
                    left: 481
                }}
            />
        </Div>
    )
}