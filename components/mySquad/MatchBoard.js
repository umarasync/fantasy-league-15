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
            // overflow: 'hidden',
            background: 'red',
            // height: 80,
            // paddingLeft: R(167),
            // paddingRight: R(166),
            // height: 'max-content',
            width: R(947)
            // width: R(1107)
            // marginLeft: R(-10)
        },
        item: {
            height: 'max-content',
            cursor: 'pointer',
            display: 'inline-block',
            textAlign: 'center',
            background: 'white',
            // border: '1px solid red',
            // width: R(189.4)
        }
    }
}

const data = [
    {
        id: 1,
        week: 'Gameweek 8',
        date: '29 sep',
        active: false,
        firstChild: true,
    },
    {
        id: 111,
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
        date: '29 sep',
        active: false
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
        date: 'Make transfers',
        active: true
    },
    {
        id: 7,
        week: 'Gameweek 8',
        date: '29 sep',
        active: false,
        lastChild: true
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
    const [animationInProgress, setAnimationInProgress] = useState(false)
    const [borderWidth, setBorderWidth] = useState(0)

    const scrollBoxOriginPointForBorder = R(517.421)
    const scrollBoxOriginPoint = R(350.421)

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
            activeLeft: activeRect.left - scrollRect.left,
        };
    }

    const handleScroll = () => {

        const { activeLeft, activeRect} = getActiveRect()

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
        if(!firstLoad){
            handleScroll()
        }
    }, [matches, firstLoad])

    useEffect(() => {
        if(!firstLoad){
            controls.start('scroll')
            controls.start('borderWidth')
        }
    }, [moved])

    const handleBorderWidth = () => {
        setTimeout(() => {
            const { activeRect } = getActiveRect()
            setBorderWidth(activeRect.width)
            handleScroll()
        }, 300)
    }
    useEffect(() => {
                handleBorderWidth()
    }, [])


    const handleControls = (isNext = false) => {
        if(animationInProgress) return;
        const $matches = clone(matches)
        let objIndex = $matches.findIndex((match) => match.active)
        let nextIndex = isNext ? objIndex + 1 : objIndex - 1
        if(nextIndex === $matches.length || nextIndex === -1) return
        handleOnClick($matches[nextIndex])
    }

    return (
        <Div h={720} pt={40} w={1280} style={STYLES.container}  className={'bg-red-200'} position="relative"  br={12} bs={SHADOW_WHITE_SMOKE}>
            <Div className={'flex justify-center'}>
                <div style={{...STYLES.scrollContainer}}
                    // className={'flex justify-between'}
                     ref={scrollContainer}>
                    {
                        matches.map((match, index) => {
                            return (
                                <motion.div
                                    variants={scrollAnimationVariant}
                                    animate={controls}
                                    onAnimationStart={() => setAnimationInProgress(true)}
                                    onAnimationComplete={(definition) => {
                                        if(definition === 'scroll') {
                                            setAnimationInProgress(false)
                                        }
                                    }}
                                    key={match.id}
                                    className={'flex flex-col items-center'}
                                    style={{...
                                            STYLES.item,
                                        marginLeft: index ? R(32)  : 0,
                                        marginRight: index !== data.length -1 ? R(31) : 0,
                                        background: match.active ? 'yellow': 'whitesmoke'
                                    }}
                                >
                                    <div
                                        className={'flex flex-col items-center'}
                                        ref={ match.active ? activeRef : null }
                                        onClick={() => handleOnClick(match)}
                                        data-lastChild={match.lastChild}
                                        data-firstChild={match.firstChild}
                                    >
                                        <Text text={match.week} color={colors.regent_grey} fs={18} lh={26}/>
                                        <Text text={match.date} color={colors.regent_grey} fs={28} lh={32} fst={'italic'} tt={'uppercase'} fw={700}/>

                                    </div>

                                </motion.div>
                            )
                        })
                    }
                </div>
            </Div>


            <Div position='absolute' top={40} left={40}>
                <Image w={60} h={60} name={'arrow-prev.png'} cursor={'pointer'} bg={'green'} onClick={() => handleControls()}/>

            </Div>

            <Div position='absolute' top={40} right={40}>
                <Image w={60} h={60} name={'arrow-next.png'}  cursor={'pointer'} bg={'green'} onClick={() => handleControls(true)}/>
            </Div>

            <motion.div
                variants={borderAnimationVariant}
                animate={controls}
                style={{
                    width: borderWidth,
                    height: R(2),
                    position: 'absolute',
                    background: colors.mandy,
                    marginTop: R(20),
                    left: scrollBoxOriginPointForBorder
                }}
            />
        </Div>
    )
}