// Packages
import {useEffect, useRef, useState} from "react";
import {motion, AnimatePresence, useAnimation} from "framer-motion";

// Components
import Div from "components/html/Div";
import FinishedMatchDetailsHead from "components/matches/finishedMatches/FinishedMatchDetailsHead";
import FinishedMatchDetailsTabs from "components/matches/finishedMatches/FinishedMatchDetailsTabs";
import MatchHighlights from "components/matches/finishedMatches/MatchHighlights";
import MatchStatistics from "components/matches/finishedMatches/MatchStatistics";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import {ONE, ZERO} from "constants/arrayIndexes";

// Animation
import {
    finishedMatchDetailsAnimation,
    highlightsTabContentAnimation,
    statisticsPointsTabContentAnimation,
    contentContainerAnimation,
} from "Animations/matches/FinishedMatchDetailsAnimation";

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

export default function FinishedMatchDetails({
    match,
    showMatchDetails,
}) {

    const STYLES = {...getStyles(R)}
    const { matchDetails } = match

    const controls = useAnimation()

    const [selectedTab, setSelectedTab] = useState(ZERO)
    const [borderWidth, setBorderWidth] = useState(0)
    const [containerHeight, setContainerHeight] = useState(0)

    // Tabs & Content Refs
    const highlightsTabRef = useRef(null)
    const statisticsTabRef = useRef(null)
    const highlightsContentRef = useRef(null)
    const statisticsContentRef = useRef(null)

    const handleHighlightsClick = (tabNumber) => {
        setBorderWidth(highlightsTabRef.current.getBoundingClientRect().width)
        setSelectedTab(tabNumber)
        setContainerHeight(highlightsContentRef.current.getBoundingClientRect().height)

    }

    const handleStatisticsClick = (tabNumber) => {
        setBorderWidth(statisticsTabRef.current.getBoundingClientRect().width)
        setSelectedTab(tabNumber)
        setContainerHeight(statisticsContentRef.current.getBoundingClientRect().height)
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
                    variants={finishedMatchDetailsAnimation()}
                    initial={'initial'}
                    animate={'animate'}
                    exit={'exit'}
                    className={'flex flex-col items-center'}
                >
                    {/*Head*/}
                    <Div w={'100%'} mb={40} mt={25} pt={24} className={'bg-mystic-alabaster'}>
                        <FinishedMatchDetailsHead matchDetails={matchDetails}/>
                    </Div>
                    {/*Tabs*/}
                    <FinishedMatchDetailsTabs
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
                            variants={highlightsTabContentAnimation()}
                            animate={selectedTab === ZERO ? 'moveRight' : 'moveLeft'}
                            style={STYLES.content}
                        >
                            <MatchHighlights
                                selectedTab={selectedTab}
                                match={match}
                                containerRef={highlightsContentRef}
                            />
                        </motion.div>

                        <motion.div
                            variants={statisticsPointsTabContentAnimation()}
                            animate={selectedTab === ZERO ? 'moveRight' : 'moveLeft'}
                            style={{ ...STYLES.content, ...STYLES.statistics}}
                        >
                            <MatchStatistics
                                selectedTab={selectedTab} match={match}
                                containerRef={statisticsContentRef}
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