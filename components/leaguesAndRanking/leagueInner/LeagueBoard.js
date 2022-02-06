// Packages
import {createRef, useEffect, useRef, useState} from "react";
import {motion, useAnimation} from "framer-motion";
import dayjs from 'dayjs'

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import LeagueBoardControls from "components/leaguesAndRanking/leagueInner/LeagueBoardControls";
import LeagueBoardBorder from "components/leaguesAndRanking/leagueInner/LeagueBoardBorder";
import BorderHorizontal from "components/borders/BorderHorizontal";
import LeagueBoardContent from "components/leaguesAndRanking/leagueInner/LeagueBoardContent";
import LeagueBoardLastRank from "components/leaguesAndRanking/leagueInner/LeagueBoardLastRank";

// Constants
import {SHADOW_WHITE_SMOKE} from "constants/boxShadow";
import colors from "constants/colors";
import getLeaguesGameWeeksRanking from "constants/data/leaguesGameWeeks";

// utils
import {clone, isEmpty} from "utils/helpers";
import R from "utils/getResponsiveValue";

import {
    setInitialSettings,
    controlsHandler,
    tabClickHandler
} from "utils/leagueBoardHelper";

// Animations
import {subHeadingAnimation, scrollAnimation} from "Animations/leaguesAndRanking/LeagueAndRankingAnimation";

// Styles
const getStyles = (R) => {
    return {
        item: {
            cursor: 'pointer',
            marginLeft: R(31),
            marginRight: R(31),
        },
        scrollBox: {
            whiteSpace: 'nowrap',
        },
        scrollContainer: {
            width: R(1080),
            paddingLeft: R(10)
        },
        subHeading: {
            color: colors.regent_grey,
            fontSize: R(28),
            lineHeight: R(32, 'px'),
            fontWeight: 'bold'
        }
    }
}

export default function LeagueBoard ({league}) {

    const STYLES =  { ...getStyles(R) }

    const INITIAL_GAME_WEEKS_RANKINGS = clone(getLeaguesGameWeeksRanking())
    const [activeTab, setActiveTab] = useState({})
    const [animationInProgress, setAnimationInProgress] = useState(false)
    const [leaguesGameWeeksRanking, setLeaguesGameWeeksRanking] = useState([])
    const scrollContainerRef = useRef()
    const controls = useAnimation()
    const [borderData, setBorderData] = useState({})
    const [moved, setMoved] = useState(0)
    const elementsRef = useRef(INITIAL_GAME_WEEKS_RANKINGS.map(() => createRef()));
    const scrollBoxOriginPoint = R(40)

    const handleTabClick = (lgwr) => {
        tabClickHandler({
            // League and ranking
            lgwr,
            leaguesGameWeeksRanking,
            setLeaguesGameWeeksRanking,
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
            elementsRef
        })
    }

    const handleControls = (isNext = false) => {
        if(animationInProgress) return
        const nextLGRW = controlsHandler({
            isNext,
            leaguesGameWeeksRanking,
            setLeaguesGameWeeksRanking
        })

        if(!nextLGRW) return

        handleTabClick(nextLGRW)
    }

    useEffect(() => {
        controls.start('changeTextColor')
        controls.start('scroll')
    }, [activeTab])

    useEffect(() => {
        setInitialSettings({
            initialGameWeeksRankings: INITIAL_GAME_WEEKS_RANKINGS,
            setLeaguesGameWeeksRanking,
            setActiveTab
        })
    }, [])

    return (
        <Div>
            <Div
                minH={593}
                pt={40}
                w={1280}
                className={'flex flex-col bg-white'}
                position="relative"
                br={12}
                bs={SHADOW_WHITE_SMOKE}
            >

                {/*Slider*/}
                <Div position={'relative'} style={STYLES.scrollBox}>
                    <Div className={'flex justify-center'}>
                        <div style={{...STYLES.scrollContainer}} ref={scrollContainerRef}>
                            <Div className={'flex overflow-hidden'}>
                                {
                                    // lgrw = League-Game-Week-Ranking
                                    leaguesGameWeeksRanking.length > 0 && leaguesGameWeeksRanking.map((lgwr, index) => {
                                        return (
                                            lgwr.date ? (
                                                <motion.div
                                                    variants={scrollAnimation}
                                                    animate={controls}
                                                    custom={{
                                                        moved
                                                    }}
                                                    className={'flex flex-col items-center justify-center'}
                                                    style={STYLES.item}
                                                    ref={elementsRef.current[lgwr.id]}
                                                    onClick={() => handleTabClick(lgwr)}
                                                >
                                                    <Text
                                                        text={`Gameweek ${lgwr.week}`}
                                                        fs={18}
                                                        lh={26}
                                                        color={colors.regent_grey}
                                                        mb={4}
                                                    />
                                                    <motion.p
                                                        variants={subHeadingAnimation()}
                                                        custom={{lgwr}}
                                                        animate={controls}
                                                        className={'italic uppercase'}
                                                        style={STYLES.subHeading}
                                                    >
                                                        {dayjs(lgwr.date).format('DD MMM')}
                                                    </motion.p>
                                                </motion.div>
                                            ) : (

                                                <motion.div
                                                    variants={scrollAnimation}
                                                    animate={controls}
                                                    custom={{
                                                        moved
                                                    }}
                                                    className={'flex items-center justify-center'}
                                                    style={STYLES.item}
                                                    ref={elementsRef.current[lgwr.id]}
                                                    onClick={() => handleTabClick(lgwr)}
                                                >
                                                    <motion.p
                                                        variants={subHeadingAnimation()}
                                                        custom={{lgwr}}
                                                        animate={controls}
                                                        className={'italic uppercase'}
                                                        style={STYLES.subHeading}
                                                    >
                                                        {lgwr.week}
                                                    </motion.p>
                                                </motion.div>
                                            )
                                        )
                                    })
                                }
                            </Div>
                            <LeagueBoardBorder
                                borderData={borderData}
                                setAnimationInProgress={setAnimationInProgress}
                            />
                        </div>
                    </Div>

                    <Div mt={20}><BorderHorizontal opacity={0.5}/></Div>
                    <LeagueBoardControls onPrevious={handleControls} onNext={() => handleControls(true)}/>
                </Div>

                {/*Content*/}
                {
                    !isEmpty(activeTab) && (
                        <LeagueBoardContent activeTab={{...activeTab}}/>
                    )
                }

            </Div>

            <LeagueBoardLastRank/>
        </Div>

    )

}