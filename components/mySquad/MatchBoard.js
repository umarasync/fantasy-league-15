// Packages
import {motion, useAnimation} from "framer-motion";
import {createRef, useEffect, useRef, useState} from "react";
import dayjs from 'dayjs'

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";
import Button from "components/html/Button";

// Constants
import {SHADOW_WHITE_SMOKE} from "constants/boxShadow";
import colors from "constants/colors";
import {MATCHES} from "constants/data/matches";

// utils
import {clone} from "utils/helpers";
import R from "utils/getResponsiveValue";
import MatchBoardContent from "components/mySquad/MatchBoardContent";

// Styles
const getStyles = (R) => {
    return {
        scrollBox: {
            whiteSpace: 'nowrap',
        },
        scrollContainer:{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            width: R(1080)
        },
        item: {
            height: 'max-content',
            cursor: 'pointer',
            display: 'inline-block',
            textAlign: 'center',
            background: 'white',
            marginLeft: R(35),
            marginRight: R(35),
            opacity: 0,
        },
        subHeading: {
            color: colors.regent_grey,
            fontSize: R(28),
            lineHeight: R(32, 'px')
        },
        borderStyle: {
            height: R(2),
            position: 'absolute',
            background: colors.mandy,
            marginTop: R(20),
        },
        calendarIcon: {
            position: 'absolute',
            top: R(15),
            left: R(23)
        }
    }
}

export default function MatchBoard () {

    const STYLES =  { ...getStyles(R) }

    const INITIAL_MATCHES = clone(MATCHES)

    const [matches, setMatches] = useState([])

    const scrollContainerRef = useRef()
    let activeRef = useRef()

    const controls = useAnimation()
    const borderAnimationControls = useAnimation()

    const [moved, setMoved] = useState(0)
    const [initialRenderDone, setInitialRenderDone] = useState(false)
    const [animationInProgress, setAnimationInProgress] = useState(false)
    const [tabChanged, setTabChanged] = useState(false)
    const [borderWidth, setBorderWidth] = useState(0)
    const [activeTabContent, setActiveTabContent] = useState({})
    const MAKE_TRANSFERS = 'make transfers'

    const elementsRef = useRef(INITIAL_MATCHES.map(() => createRef()));

    const scrollBoxOriginPointForBorder = R(517.421)
    const scrollBoxOriginPoint = R(417)

    const duration = 0.7

    const scrollAnimation = {
        scroll: ({match}) => {
            return {
                x: -moved,
                opacity: match.active || match.lastActive ? 1 : 0.5,
                transition: {
                    duration: duration,
                },
            }
        },
    };

    const borderAnimation = {
        borderWidth: {
            width: borderWidth,
            transition: {
                duration: duration
            }
        }
    };

    const subHeadingAnimation = {
        changeTextColor: (match) => {
            return {
                color: match.active ? colors.black_rock : colors.regent_grey,
                transition: {
                    duration: duration
                }
            }
        }
    };

    useEffect(() => {
        if(initialRenderDone){
            controls.start('scroll')
            borderAnimationControls.start('borderWidth')
            controls.start('changeTextColor')
        }
    }, [moved])

    const getActiveRect = (itemRef) => {
        if(!itemRef.current) return;
        const scrollRect = scrollContainerRef.current.getBoundingClientRect()
        const activeRect = itemRef.current.getBoundingClientRect()
        return {
            activeRect,
            activeLeft: activeRect.left - scrollRect.left,
            activeRight: activeRect.right - scrollRect.right,
        };
    }

    const handleScroll = () => {
        const { activeLeft, activeRect, activeRight} = getActiveRect(activeRef)
        setBorderWidth(activeRect.width)
        let movedPixels = 0;
        if(activeLeft > scrollBoxOriginPoint) {
            movedPixels = activeLeft - scrollBoxOriginPoint
        }else {
            movedPixels = -1 * (scrollBoxOriginPoint - activeLeft)
        }
        setMoved(moved + movedPixels)
    }

    const handleTabClick = (match) => {
        let currentActive = matches.findIndex((match) => match.active)
        const $matches = matches.map((item, index) => {
            item.active = item.id === match.id;
            if(item.active) {
                setActiveTabContent({...item})
                setTabChanged(!tabChanged)
            }
            item.lastActive = index === currentActive
            return item
        })
        setMatches($matches)
    }

    const handleControls = (isNext = false) => {
        if(animationInProgress) return;
        const $matches = clone(matches)
        let objIndex = $matches.findIndex((match) => match.active)
        let nextIndex = isNext ? objIndex + 1 : objIndex - 1
        if(nextIndex === $matches.length || nextIndex === -1) return
        handleTabClick($matches[nextIndex])
    }

    useEffect(() => {
        const activeObj = matches.filter(match => match.active)
        setInitialRenderDone(true)
        if(initialRenderDone){
         setTimeout(() => {
             if(getActiveRect(activeRef)){
                 const { activeRect } = getActiveRect(activeRef)
                 setBorderWidth(activeRect.width)
                 handleScroll()
             }
         }, 50)
        }
    }, [matches, initialRenderDone])

    // useEffect(() => {
    //     setTabChanged(!tabChanged)
    // }, [nextActiveTabContent])

    useEffect(() => {
        const $matches = INITIAL_MATCHES.map((match, index) => {
            const todayDate = dayjs().format('YYYY-MM-D')

            if(dayjs(match.date).isSame(todayDate)) {
                match.date = MAKE_TRANSFERS
                match.active = true
                setActiveTabContent({...match})
            }
            return match
        })

        setMatches($matches)
    }, [])

    const onAnimationComplete = (definition) => {
        if(definition === 'borderWidth') {
            setAnimationInProgress(false)
            setTimeout(()=> {
            }, 300)
        }
    }

    return (
        <Div
            minHeight={720}
            pt={40}
            pb={50}
            w={1280}
            className={'bg-white'}
            position="relative"
            br={12}
            bs={SHADOW_WHITE_SMOKE}
        >
            <Div justifyBetween ml={40} mr={40} mb={40}>
                <Text text={'MATCHES'} fs={34} fw={900} lh={38} color={colors.black_rock} fst={'italic'} />
                <Div position={'relative'} cursor={'pointer'}>
                    <Button title={'Sync to calendar'} h={50} pr={24} pl={55} pt={15} pb={15}/>
                    <div style={STYLES.calendarIcon}>
                        <Image w={20} h={20} name={'calendar.png'}/>
                    </div>
                </Div>
            </Div>

            {/*Tabs*/}
            <Div position={'relative'} style={STYLES.scrollBox}>
                <Div className={'flex justify-center'}>
                    <div style={{...STYLES.scrollContainer}}
                        // className={'flex justify-between'}
                         ref={scrollContainerRef}
                    >
                        {
                            matches.length > 0 && matches.map((match, index) => {
                                return(
                                    <motion.div
                                        variants={scrollAnimation}
                                        animate={controls}
                                        custom={{match}}
                                        key={match.id}
                                        className={'flex flex-col items-center'}
                                        style={{...STYLES.item}}
                                    >
                                        <div
                                            className={'flex flex-col items-center'}
                                            ref={match.active ? activeRef : elementsRef.current[index]}
                                            onClick={() => handleTabClick(match)}
                                            data-lastChild={match.lastChild}
                                            data-firstChild={match.firstChild}
                                        >
                                            <Text text={match.week} color={colors.regent_grey} fs={18} lh={26}/>
                                            <motion.p
                                                variants={subHeadingAnimation}
                                                animate={controls}
                                                custom={match}
                                                className={'italic uppercase font-[700]'}
                                                style={STYLES.subHeading}
                                            >
                                                {
                                                    match.date !== MAKE_TRANSFERS
                                                        ? dayjs(match.date).format('DD MMM')
                                                        : match.date
                                                }
                                            </motion.p>
                                        </div>

                                    </motion.div>
                                )
                            })
                        }
                    </div>

                </Div>

                <Div position='absolute' top={1} left={40}>
                    <Image w={60} h={60} name={'arrow-prev.png'} cursor={'pointer'} onClick={() => handleControls()}/>
                </Div>
                <Div position='absolute' top={1} right={40}>
                    <Image w={60} h={60} name={'arrow-next.png'} cursor={'pointer'}
                           onClick={() => handleControls(true)}/>
                </Div>

                <motion.div
                    variants={borderAnimation}
                    animate={borderAnimationControls}
                    onAnimationStart={() => setAnimationInProgress(true)}
                    onAnimationComplete={(definition) => onAnimationComplete(definition)}
                    style={{
                        ...STYLES.borderStyle,
                        width: borderWidth,
                        left: scrollBoxOriginPointForBorder
                    }}
                />
            </Div>

            {/*Content*/}
            <Div mt={30} center>
                <MatchBoardContent
                    tabChanged={tabChanged}
                    activeTabContent={activeTabContent}
                />
            </Div>
        </Div>
    )

}