// Components
import {motion, AnimatePresence} from "framer-motion";
import Div from "components/html/Div";
import FinishedMatchDetailsHead from "components/matches/FinishedMatchDetailsHead";
import FinishedMatchDetailsTabs from "components/matches/FinishedMatchDetailsTabs";
import MatchHighlights from "components/matches/MatchHighlights";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";
import {useRef, useState} from "react";

// Constants
import {ONE, ZERO} from "constants/arrayIndexes";

// Animation
import {
    highlightsTabContentAnimation,
    statisticsPointsTabContentAnimation
} from "Animations/matches/FinishedMatchDetailsAnimation";
import MatchStatistics from "./MatchStatistics";

// Styles
const getStyles = (R) => {
    return {

        contentContainer: {
            display: 'grid',
            width: '100%',
            overflow: 'hidden'
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

export default function MatchDetails({
    match,
    showMatchDetails,
}) {

    const STYLES = {...getStyles(R)}
    const { matchDetails } = match

    const [selectedTab, setSelectedTab] = useState(ZERO)
    const [borderWidth, setBorderWidth] = useState(0)
    const [hideHighlightsBox, setHideHighlightsBox] = useState(false)
    const [hideStatBox, setHideStatBox] = useState(false)

    const highlightsTabRef = useRef(null)
    const statisticsTabRef = useRef(null)

    const handleHighlightsClick = (tabNumber) => {
        setBorderWidth(highlightsTabRef.current.getBoundingClientRect().width)
        setSelectedTab(tabNumber)
    }

    const handleStatisticsClick = (tabNumber) => {
        setBorderWidth(statisticsTabRef.current.getBoundingClientRect().width)
        setSelectedTab(tabNumber)
    }

    return (
        showMatchDetails ? (
            <AnimatePresence>
                <motion.div
                    // variants={matchDetailsAnimation()}
                    variants={''}
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
                    <div style={STYLES.contentContainer}>
                        <motion.div
                            variants={highlightsTabContentAnimation()}
                            animate={selectedTab === ZERO ? 'moveRight' : 'moveLeft'}
                            style={{ ...STYLES.content, display: hideHighlightsBox ? 'none' : 'block'}}
                            onAnimationStart={() => {
                                if (selectedTab === ONE) {
                                    setHideStatBox(false)
                                }
                            }}
                            onAnimationComplete={() => {
                                if (selectedTab === ZERO) {
                                    setHideStatBox(true)
                                }
                            }}
                        >
                            <MatchHighlights selectedTab={selectedTab} match={match}/>
                        </motion.div>

                        <motion.div
                            variants={statisticsPointsTabContentAnimation()}
                            animate={selectedTab === ZERO ? 'moveRight' : 'moveLeft'}
                            style={{
                                ...STYLES.content,
                                ...STYLES.statistics,
                                display: hideStatBox ? 'none' : 'block'
                            }}
                            onAnimationStart={() => {if (selectedTab === ZERO) {setHideHighlightsBox(false)}}}
                            onAnimationComplete={() => {if (selectedTab === ONE) {setHideHighlightsBox(true)}}}
                        >
                            <MatchStatistics selectedTab={selectedTab} match={match} />
                        </motion.div>
                    </div>
                    {/*Footer*/}
                    <Div h={30} mt={-25} w={'100%'} className={'bg-mystic-alabaster-reverse'}/>
                </motion.div>
            </AnimatePresence>
            ): (
                <AnimatePresence/>
        )
    )
}