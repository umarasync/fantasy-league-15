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
import {
    controlsHandler,
    scrollRenderer,
    tabClickHandler,
    MAKE_TRANSFERS,
    setInitialSettings
} from "utils/otherTeamHelper";

// Animations
import {scrollAnimation, subHeadingAnimation} from "Animations/otherTeam/OtherTeamAnimation";
import BorderHorizontal from "../borders/BorderHorizontal";
import OtherTeamSliderControls from "./OtherTeamSliderControls";
import {getOtherTeamData} from "../../constants/data/otherTeam";

// Styles
const getStyles = (R) => {
    return {
        item: {
            cursor: 'pointer',
            marginLeft: R(37),
            marginRight: R(37),
        },
        scrollBox: {
            whiteSpace: 'nowrap',
        },
        scrollContainer: {
            width: '80%',
            paddingLeft: R(10),
        },
        subHeading: {
            color: colors.regent_grey,
            fontSize: R(28),
            lineHeight: R(32, 'px'),
            fontWeight: 'bold'
        }
    }
}

export default function MatchBoard() {


    const STYLES = {...getStyles(R)}

    const INITIAL_MATCHES = clone(MATCHES)



    const [matches, setMatches] = useState([]) // TODO:REMOVED



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
    const scrollBoxOriginPoint = R(235)



    /**********************NEW STATES *************/
    const INITIAL_OTHER_TEAM_DATA = clone(getOtherTeamData())
    const [activeTab, setActiveTab] = useState({})
    const [otherTeamData, setOtherTeamData] = useState([])
    /**********************NEW STATES *************/


    useEffect(() => {
        if (initialRenderDone) {
            controls.start('scroll')
            borderAnimationControls.start('borderWidth')
            controls.start('changeTextColor')
        }
    }, [moved])

    const handleTabClick = (ot) => {
        console.log('1=====', ot)
        tabClickHandler({
            ot,
            animationInProgress,
            matches,
            setMatches,
            tabChanged,
            setTabChanged,
            setActiveTabContent,
        })
    }
    const handleControls = (isNext = false) => {
        controlsHandler({
            animationInProgress,
            isNext,
            matches,
            setMatches,
            tabChanged,
            setTabChanged,
            setActiveTabContent,
        })
    }

    useEffect(() => {
        setInitialRenderDone(true)
        if (initialRenderDone) {
            setTimeout(() => {
                scrollRenderer({
                    activeRef,
                    scrollContainerRef,
                    scrollBoxOriginPoint,
                    moved,
                    setMoved,
                    setBorderWidth,
                })
            }, 50)
        }
    }, [matches, initialRenderDone])


    useEffect(() => {
        setInitialSettings({
            initialOtherTeamData: INITIAL_OTHER_TEAM_DATA,
            setOtherTeamData,
            setActiveTab
        })
    }, [])


    // useEffect(() => {
    //     setInitialSettings({
    //         initialMatches: INITIAL_MATCHES,
    //         setActiveTabContent,
    //         setMatches
    //     })
    // }, [])
    //
    // const onAnimationComplete = (definition) => {
    //     if (definition === 'borderWidth') {
    //         setAnimationInProgress(false)
    //         setTimeout(() => {
    //         }, 300)
    //     }
    // }

    return (
        <Div>
            {/*Tabs*/}
            <Div position={'relative'} style={STYLES.scrollBox}>
                <Div className={'flex justify-center'}>
                    <div style={{...STYLES.scrollContainer}}
                         ref={scrollContainerRef}
                    >
                        <Div className={'flex overflow-hidden'}>
                            {
                                otherTeamData.length > 0 && otherTeamData.map((ot, index) => {
                                    return (
                                        <motion.div
                                            variants={scrollAnimation}
                                            animate={controls}
                                            custom={{
                                                ot,
                                                moved
                                            }}
                                            key={ot.id}
                                            className={'flex flex-col items-center'}
                                            style={{...STYLES.item}}
                                        >
                                            <div
                                                className={'flex flex-col items-center'}
                                                ref={ot.active ? activeRef : null}
                                                onClick={() => handleTabClick(ot)}
                                            >
                                                <Text text={`Gameweek ${ot.week}`} color={colors.regent_grey} fs={18} lh={26}/>
                                                <motion.p
                                                    variants={subHeadingAnimation()}
                                                    animate={controls}
                                                    custom={{otherTeam: ot}}
                                                    className={'italic uppercase font-[700]'}
                                                    style={STYLES.subHeading}
                                                >
                                                    {dayjs(ot.date).format('DD MMM')}
                                                </motion.p>
                                            </div>

                                        </motion.div>
                                    )
                                })
                            }
                        </Div>

                    </div>

                </Div>

                <Div mt={20}><BorderHorizontal opacity={0.5}/></Div>
                <OtherTeamSliderControls onPrevious={handleControls} onNext={() => handleControls(true)}/>
            </Div>
        </Div>
    )

}