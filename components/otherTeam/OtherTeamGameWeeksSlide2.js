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
import OtherTeamSliderTabBorder from "./OtherTeamSliderTabBorder";
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
            // width: R(570),
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

export default function OtherTeamGameWeeksSlider() {

    const STYLES = {...getStyles(R)}

    const INITIAL_OTHER_TEAM_DATA = clone(getOtherTeamData())
    const [otherTeamData, setOtherTeamData] = useState([])
    const [matches, setMatches] = useState([]) //TODO:REMOVE

    const scrollContainerRef = useRef()
    let activeRef = useRef()

    const controls = useAnimation()
    const borderAnimationControls = useAnimation()

    const [moved, setMoved] = useState(0)
    const [borderData, setBorderData] = useState({})
    const [initialRenderDone, setInitialRenderDone] = useState(false)
    const [animationInProgress, setAnimationInProgress] = useState(false)
    const [tabChanged, setTabChanged] = useState(false)
    const [borderWidth, setBorderWidth] = useState(0)
    const [activeTab, setActiveTab] = useState({})
    // const scrollBoxOriginPointForBorder = R(517.421)
    const scrollBoxOriginPoint = R(235)

    useEffect(() => {
        if (initialRenderDone) {
            controls.start('scroll')
            borderAnimationControls.start('borderWidth')
            controls.start('changeTextColor')
        }
    }, [moved])

    const handleTabClick = (otherTeamObj) => {
        tabClickHandler({
            otherTeamObj,
            animationInProgress,
            otherTeamData,
            setOtherTeamData,
            activeTab,
            setActiveTab,
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
            setActiveTab,
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
    }, [otherTeamData, initialRenderDone])


    // useEffect(() => {
    //     setInitialSettings({
    //         initialOtherTeamData: INITIAL_OTHER_TEAM_DATA,
    //         setOtherTeamData,
    //         setActiveTab,
    //     })
    // }, [])




    const onAnimationComplete = (definition) => {
        if (definition === 'borderWidth') {
            setAnimationInProgress(false)
            setTimeout(() => {
            }, 300)
        }
    }

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
                                // lgrw = League-Game-Week-Ranking
                                otherTeamData.length > 0 && otherTeamData.map((otherTeam, index) => {
                                    return (
                                        <motion.div
                                            key={otherTeam.id}
                                            variants={scrollAnimation}
                                            animate={controls}
                                            custom={{
                                                moved
                                            }}
                                            className={'flex flex-col items-center justify-center'}
                                            style={STYLES.item}
                                            // ref={otherTeam.active ? activeRef : elementsRef.current[index]}
                                            ref={otherTeam.active ? activeRef : null}
                                            onClick={() => handleTabClick(otherTeam)}
                                        >
                                            <Text
                                                text={`Gameweek ${otherTeam.week}`}
                                                fs={18}
                                                lh={26}
                                                color={colors.regent_grey}
                                                mb={4}
                                            />
                                            <Text
                                                text={`${otherTeam.active}`}
                                                fs={18}
                                                lh={26}
                                                color={colors.regent_grey}
                                                mb={4}
                                            />
                                            <motion.p
                                                variants={subHeadingAnimation()}
                                                custom={{otherTeam}}
                                                animate={controls}
                                                className={'italic uppercase'}
                                                style={STYLES.subHeading}
                                            >
                                                {dayjs(otherTeam.date).format('DD MMM')}
                                            </motion.p>
                                        </motion.div>
                                    )
                                })
                            }
                        </Div>

                        <OtherTeamSliderTabBorder
                            borderData={borderData}
                            setAnimationInProgress={setAnimationInProgress}
                        />
                    </div>

                </Div>
                <Div mt={20}><BorderHorizontal opacity={0.5}/></Div>
                <OtherTeamSliderControls onPrevious={handleControls} onNext={() => handleControls(true)}/>
            </Div>

        </Div>
    )

}