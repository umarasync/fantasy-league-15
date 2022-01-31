// Packages
import {useEffect, useRef, useState} from "react";
import {motion, AnimatePresence, useAnimation} from "framer-motion";
import UpcomingMatchDetailsTabs from "components/matches/upcomingMatches/UpcomingMatchDetailsTabs";
import LastMatchUps from "components/matches/upcomingMatches/LastMatchUps";
import HeadToHead from "components/matches/upcomingMatches/HeadToHead";

// Components
import Div from "components/html/Div";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import {ONE, ZERO} from "constants/arrayIndexes";

// Animation
import {
    upcomingMatchDetailsAnimation,
    contentContainerAnimation,
    lastMatchUpsTabContentAnimation,
    headToHeadTabContentAnimation
} from "Animations/matches/UpcomingMatchDetailsAnimation";

// Styles
const getStyles = (R) => {
    return {
        contentContainer: {
            display: 'grid',
            width: '100%',
            overflow: 'hidden',
        },
        content: {
            gridColumn: 1,
            gridRow: 1,
            width: '100%'
        },
        statistics: {
            marginLeft: '110%'
        }
    }
}

export default function UpcomingMatchDetails({
    match,
    showMatchDetails,
}) {

    const STYLES = {...getStyles(R)}

    const controls = useAnimation()

    const [selectedTab, setSelectedTab] = useState(ZERO)
    const [borderWidth, setBorderWidth] = useState(0)
    const [containerHeight, setContainerHeight] = useState(0)

    // Tabs & Content Refs
    const highlightsTabRef = useRef(null)
    const statisticsTabRef = useRef(null)
    const lastMatchUpContentRef = useRef(null)
    const headToHeadContentRef = useRef(null)

    const handleHighlightsClick = (tabNumber) => {
        setBorderWidth(highlightsTabRef.current.getBoundingClientRect().width)
        setSelectedTab(tabNumber)
        setContainerHeight(lastMatchUpContentRef.current.getBoundingClientRect().height)

    }

    const handleStatisticsClick = (tabNumber) => {
        setBorderWidth(statisticsTabRef.current.getBoundingClientRect().width)
        setSelectedTab(tabNumber)
        setContainerHeight(headToHeadContentRef.current.getBoundingClientRect().height)
    }

    useEffect(() => {
        if (!containerHeight) return
        controls.start('changeHeight')
    }, [containerHeight])

    const resetStates = () => {
        setSelectedTab(ZERO)
        setContainerHeight(0)
        setBorderWidth(0)
    }

    useEffect(() => {
        resetStates()
    }, [showMatchDetails])

    return (
        showMatchDetails ? (
            <AnimatePresence>
                <motion.div
                    variants={upcomingMatchDetailsAnimation()}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}
                    className={'flex flex-col items-center'}
                >

                    {/*Tabs*/}
                    <UpcomingMatchDetailsTabs
                        borderWidth={borderWidth}
                        selectedTab={selectedTab}
                        highlightsTabRef={highlightsTabRef}
                        statisticsTabRef={statisticsTabRef}
                        onHighlightsClick={handleHighlightsClick}
                        onStatisticsClick={handleStatisticsClick}
                    />
                    {/*Content*/}
                    <motion.div
                        variants={contentContainerAnimation()}
                        animate={controls}
                        custom={{height: containerHeight}}
                        style={STYLES.contentContainer}
                    >
                        <motion.div
                            variants={lastMatchUpsTabContentAnimation()}
                            animate={selectedTab === ZERO ? 'moveRight' : 'moveLeft'}
                            style={STYLES.content}
                        >
                            <LastMatchUps
                                selectedTab={selectedTab}
                                match={match}
                                containerRef={lastMatchUpContentRef}
                            />
                        </motion.div>

                        <motion.div
                            variants={headToHeadTabContentAnimation()}
                            animate={selectedTab === ZERO ? 'moveRight' : 'moveLeft'}
                            style={{ ...STYLES.content, ...STYLES.statistics}}
                        >
                            <HeadToHead
                                selectedTab={selectedTab}
                                match={match}
                                containerRef={headToHeadContentRef}
                            />
                        </motion.div>
                    </motion.div>
                    {/*Footer*/}
                    <Div h={30} mt={-25} w={'100%'} className={'bg-mystic-alabaster-reverse'}/>
                </motion.div>
            </AnimatePresence>
            ): (
                <AnimatePresence/>
        )
    )
}