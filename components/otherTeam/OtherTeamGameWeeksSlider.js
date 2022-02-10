// Packages
import {motion, useAnimation} from "framer-motion";
import {useEffect, useRef, useState} from "react";
import dayjs from 'dayjs'

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import OtherTeamSliderTabBorder from "components/otherTeam/OtherTeamSliderTabBorder";
import OtherTeamSliderControls from "components/otherTeam/OtherTeamSliderControls";

// Constants
import colors from "constants/colors";

// utils
import {clone, isEmpty} from "utils/helpers";
import R from "utils/getResponsiveValue";
import {
    controlsHandler,
    scrollRenderer,
    tabClickHandler,
    setInitialSettings
} from "utils/otherTeamHelper";

// Animations
import {scrollAnimation, subHeadingAnimation} from "Animations/otherTeam/OtherTeamAnimation";
import BorderHorizontal from "components/borders/BorderHorizontal";

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
            color: colors.lavender_grey,
            fontSize: R(28),
            lineHeight: R(32, 'px'),
            fontWeight: 'bold',
            marginLeft: R(-5)
        }
    }
}

export default function OtherTeamGameWeeksSlider({
    onSelectWeek,
    otherTeamDataInitial
}) {

    const STYLES = {...getStyles(R)}

    const [activeTab, setActiveTab] = useState({})
    const [otherTeamData, setOtherTeamData] = useState([])
    const [borderData, setBorderData] = useState({})

    const [moved, setMoved] = useState(0)
    const [initialRenderDone, setInitialRenderDone] = useState(false)
    const [animationInProgress, setAnimationInProgress] = useState(false)
    const scrollBoxOriginPoint = R(235)

    // Refs
    const scrollContainerRef = useRef()
    const activeRef = useRef()

    // Animation Controls
    const controls = useAnimation()

    useEffect(() => {
        if (initialRenderDone) {
            controls.start('scroll')
            controls.start('changeTextColor')
        }
    }, [moved])

    const handleTabClick = (ot) => {
        if (animationInProgress) return
        tabClickHandler({
            ot,
            otherTeamData,
            setOtherTeamData,
            activeTab,
            setActiveTab,
        })
    }
    const handleControls = (isNext = false) => {
        if(animationInProgress) return
        controlsHandler({
            isNext,
            otherTeamData,
            setOtherTeamData,
            activeTab,
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
                    setBorderData,
                })
            }, 100)
        }
    }, [otherTeamData, initialRenderDone])

    useEffect(()=> {
        if(isEmpty(activeTab)) return
        onSelectWeek(activeTab)
    }, [activeTab])

    useEffect(() => {
        setInitialSettings({
            otherTeamDataInitial,
            setOtherTeamData,
            setActiveTab
        })
    }, [])

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
                                                <Text
                                                    text={`Gameweek ${ot.week}`}
                                                    fs={18}
                                                    lh={26}
                                                    color={colors.lavender_grey}
                                                    mb={4}
                                                />
                                                <motion.p
                                                    variants={subHeadingAnimation()}
                                                    animate={controls}
                                                    custom={{otherTeam: ot}}
                                                    className={'italic uppercase'}
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