// Packages
import {createRef, useEffect, useRef, useState} from "react";
import {motion, useAnimation} from "framer-motion";
import dayjs from "dayjs";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import BorderHorizontal from "components/borders/BorderHorizontal";
import OtherTeamSliderTabBorder from "components/otherTeam/OtherTeamSliderTabBorder";
import OtherTeamSliderControls from "components/otherTeam/OtherTeamSliderControls";

// Animation
import {scrollAnimation, subHeadingAnimation} from "Animations/otherTeam/OtherTeamAnimation";

// Constants
import colors from "constants/colors";
import {getOtherTeamData} from "constants/data/otherTeam";

// Utils
import R from "utils/getResponsiveValue";
import {clone, isEmpty} from "utils/helpers";
import {setInitialSettings, tabClickHandler, controlsHandler, scrollRenderer} from "utils/otherTeamHelper";

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
    const [activeTab, setActiveTab] = useState({})
    const [initialRenderDone, setInitialRenderDone] = useState(false)
    const [animationInProgress, setAnimationInProgress] = useState(false)
    const [borderWidth, setBorderWidth] = useState(0)
    const [otherTeamData, setOtherTeamData] = useState([])

    const controls = useAnimation()
    const [borderData, setBorderData] = useState({})
    const [moved, setMoved] = useState(0)

    // Refs
    let activeRef = useRef(null)
    const scrollContainerRef = useRef()
    const elementsRef = useRef(INITIAL_OTHER_TEAM_DATA.map(() => createRef()));
    const scrollBoxOriginPoint = R(235)

    const handleTabClick = (lgwr) => {
        tabClickHandler({
            // League and ranking
            lgwr,
            otherTeamData,
            setOtherTeamData,
            // active tab
            activeTab,
            setActiveTab,
            // scroll container
            scrollContainerRef,
            scrollBoxOriginPoint,
            // moved
            moved,
            setMoved,
            // border
            setBorderData,
            // animation
            animationInProgress,
            // refs
            activeRef,
            elementsRef
        })
    }

    const handleControls = (isNext = false) => {
        if (animationInProgress) return
        const nextLGRW = controlsHandler({
            isNext,
            otherTeamData,
        })

        if (!nextLGRW) return

        handleTabClick(nextLGRW)
    }

    useEffect(() => {
        controls.start('changeTextColor')
        controls.start('scroll')
    }, [activeTab, moved])


    useEffect(() => {
        setInitialRenderDone(true)
        if (initialRenderDone && activeRef && activeRef.current) {
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

    useEffect(() => {
        setInitialSettings({
            initialOtherTeamData: INITIAL_OTHER_TEAM_DATA,
            setOtherTeamData,
            setActiveTab
        })
    }, [])


    return (
        <Div position={'relative'} style={STYLES.scrollBox}>
            <Div className={'flex justify-center'}>
                <div style={{...STYLES.scrollContainer}} ref={scrollContainerRef}>
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
                                        ref={elementsRef.current[otherTeam.id]}
                                        // ref={otherTeam.active ? activeRef : null}
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
    )
}