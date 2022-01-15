// Packages
import {motion, useAnimation} from "framer-motion";
import {createRef, useEffect, useMemo, useRef, useState} from "react";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";

// Constants
import {SHADOW_WHITE_SMOKE} from "constants/data/boxShadow";
import colors from "constants/colors";
import {MATCHES} from "constants/data/matches";

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
            // background: 'red',
            // height: 80,
            // paddingLeft: R(167),
            // paddingRight: R(166),
            // height: 'max-content',
            // width: R(947)
            width: R(1080)
            // width: R(1107)
            // marginLeft: R(-10)
        },
        item: {
            height: 'max-content',
            cursor: 'pointer',
            display: 'inline-block',
            textAlign: 'center',
            background: 'white',
            // marginLeft: R(32),
            // marginRight: R(32),
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
        }
    }
}

export default function MatchBoard () {

    const STYLES =  { ...getStyles(R) }

    const INITIAL_MATCHES = clone(MATCHES)

    const [matches, setMatches] = useState([])

    const scrollContainer = useRef()
    let activeRef = useRef()

    const controls = useAnimation()
    const borderAnimationControls = useAnimation()

    const [moved, setMoved] = useState(0)
    const [initialRenderDone, setInitialRenderDone] = useState(false)
    const [animationInProgress, setAnimationInProgress] = useState(false)
    const [areElementsPositionSet, setAreElementsPositionSet] = useState(false)
    const [borderWidth, setBorderWidth] = useState(0)

    const [rights, setRights] = useState([]);
    const elementsRef = useRef(INITIAL_MATCHES.map(() => createRef()));

    // const calculateAllRefs = ($matches) => {
    //     const nextRights = elementsRef.current.map(ref => {
    //         if(ref.current){
    //             return getActiveRect(ref)
    //         }else if(activeRef){
    //             return getActiveRect(activeRef)
    //         }
    //     });
    //
    //     const $matchesI = $matches.map((match, index) => {
    //         match.elementPosition = nextRights[index]
    //         return match
    //     })
    //
    //     setMatches($matchesI)
    //     setRights(nextRights);
    //     setAreElementsPositionSet(true)
    //     // handleScroll()
    // }



    const calculateAllRefs = ($matches) => {

        const nextRights = elementsRef.current.map(ref => {
            if(ref.current){
                return getActiveRect(ref)
            }else if(activeRef){
                return getActiveRect(activeRef)
            }
        });

        if(!rights.length){
            setRights(nextRights)
        } else if(rights[0].activeLeft !== nextRights[0].activeLeft) {
            setRights(nextRights);
        }
    }

    useEffect(()=> {

        let currentActive = matches.findIndex((match) => match.active)

        const $matches = matches.map((item, index) => {
            const elPos = rights[index]
            item.overflowing = true
            if(elPos && elPos.activeLeft > 0 && elPos.activeLeft < 947 && elPos.activeRight < 0 && elPos.activeRight > -947) {
                item.overflowing = false
            }
            return item
        })

         setMatches($matches)

    }, [rights])

    const scrollBoxOriginPointForBorder = R(517.421)
    // const scrollBoxOriginPoint = R(350.421)
    const scrollBoxOriginPoint = R(417)

    const duration = 0.7
    // const duration = 3

    const getOpacity = (match) => {
        if(match.active || match.lastActive) {
            return 1
        }else if(!match.overflowing) {
            return 0.5
        }else {
            return 0.1
        }

    }

    const scrollAnimation = {
        scroll: (match) => {
            return {
                x: -moved,
                opacity: getOpacity(match),
                transition: {
                    duration: duration + 0.2,
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

        const scrollRect = scrollContainer.current.getBoundingClientRect()
        const activeRect = itemRef.current.getBoundingClientRect()

        return {
            activeRect,
            activeLeft: activeRect.left - scrollRect.left,
            activeRight: activeRect.right - scrollRect.right,
        };
    }

    const handleScroll = () => {

        const { activeLeft, activeRect, activeRight} = getActiveRect(activeRef)

        console.log('data=======', {
            activeLeft: parseInt(activeLeft),
            rights,
            scrollBoxOriginPoint: parseInt(scrollBoxOriginPoint)
        })

        if(animationInProgress || parseInt(activeLeft) === parseInt(scrollBoxOriginPoint)) return

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

            const elPos = rights[index]

            item.active = item.id === match.id;
            item.lastActive = index === currentActive

            item.overflowing = !(elPos && elPos.activeLeft > 0 && elPos.activeLeft < 947 && elPos.activeRight < 0 && elPos.activeRight > -947);

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
             const { activeRect } = getActiveRect(activeRef)
             setBorderWidth(activeRect.width)
             handleScroll()
         }, 50)
        }
    }, [matches, initialRenderDone])

    useEffect(() => {
        const $matches = INITIAL_MATCHES.map((item, index) => {
            item.active = index === 5;
            return item
        })
        setMatches($matches)
    }, [])

    const onAnimationComplete = (definition) => {
        if(definition === 'borderWidth') {
            setAnimationInProgress(false)
            calculateAllRefs()
        }
    }


    return (
        <Div h={720} pt={40} w={1280} style={STYLES.container}
             className={'bg-white'}
             position="relative" br={12} bs={SHADOW_WHITE_SMOKE}>
            <Div className={'flex justify-center'}>
                <div style={{...STYLES.scrollContainer}}
                    // className={'flex justify-between'}
                     ref={scrollContainer}>
                    {
                        matches.length > 0 && matches.map((match, index) => {
                            return (
                                <motion.div
                                    variants={scrollAnimation}
                                    animate={controls}
                                    custom={match}
                                    key={match.id}
                                    className={'flex flex-col items-center'}
                                    style={{
                                        ...STYLES.item,
                                        opacity: match.overflowing ? 0 : 1
                                    }}
                                >
                                    <div
                                        className={'flex flex-col items-center'}
                                        // ref={elementsRef.current[index]}
                                        ref={match.active ? activeRef : elementsRef.current[index]}
                                        // ref={ match.active ? activeRef : null }
                                        onClick={() => handleTabClick(match)}
                                        data-lastChild={match.lastChild}
                                        data-firstChild={match.firstChild}
                                    >
                                        <Text text={match.week} color={colors.regent_grey} fs={18} lh={26}/>
                                        <Text text={match.overflowing ? 'yes' : 'no'} color={colors.regent_grey}
                                              fs={18} lh={26}/>
                                        <motion.p
                                            variants={subHeadingAnimation}
                                            animate={controls}
                                            custom={match}
                                            className={'italic uppercase font-[700]'}
                                            style={STYLES.subHeading}
                                        >
                                            {match.date}
                                        </motion.p>
                                    </div>

                                </motion.div>
                            )
                        })
                    }
                </div>
            </Div>

            <Div position='absolute' top={40} left={40}>
                <Image w={60} h={60} name={'arrow-prev.png'} cursor={'pointer'} onClick={() => handleControls()}/>
            </Div>
            <Div position='absolute' top={40} right={40}>
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
    )
}