// Packages
import {useRef, useState} from "react";
import {motion} from "framer-motion";

// Components
import PlayerPoints from "components/playerInfo/PlayerPoints";
import MatchPointsTable from "components/playerInfo/MatchPointsTable";
import Div from 'components/html/Div'
import SeasonPoints from "components/playerInfo/SeasonPoints";
import PointsTabs from "components/playerInfo/PointsTabs";

// Constants
import {SHADOW_WHITE_SMOKE} from "constants/boxShadow";
import colors from "constants/colors"
import {ZERO, ONE} from "constants/arrayIndexes";

// Utils
import R from "utils/getResponsiveValue";

// Animation
import {
    matchPointsTabContentAnimation,
    seasonPointsTabContentAnimation
} from "Animations/playerInfo/PointsBoardAnimation";

// Styles
const getStyles = (R) => {
        return {
            pointsBox: {
                position: 'relative',
            },
            matchPointsBox: {
                position: 'absolute',
                marginTop: R(-65),
                width: '100%',
                paddingBottom: R(24),
            },
            seasonPointsBox: {
                position: 'absolute',
                marginTop: R(-65),
                width: '100%',
                left: '110%',
                paddingBottom: R(70),
            },
            content: {
                borderRadius: R(12),
                paddingTop: R(65),
                boxShadow: SHADOW_WHITE_SMOKE
            },
        }
}

export default function PointsBoard({
    player
}) {

    const STYLES = {...getStyles(R)}
    const [selectedTab, setSelectedTab] = useState(ZERO)
    const [borderWidth, setBorderWidth] = useState(0)
    const [hideTabsBox, setHideTabsBox] = useState(false)

    const matchPointsTabRef = useRef(null)
    const seasonPointsTabRef = useRef(null)

    const handleMatchTabClick = (tabNumber) => {
        setBorderWidth(matchPointsTabRef.current.getBoundingClientRect().width)
        setSelectedTab(tabNumber)
    }

    const handleSeasonTabClick = (tabNumber) => {
        setBorderWidth(seasonPointsTabRef.current.getBoundingClientRect().width)
        setSelectedTab(tabNumber)
    }

    return (
        <Div>
            <PlayerPoints player={player}/>
            <Div mt={24} ml={24} mr={24} br={12}  pt={24} pb={24}>
                {/*Tabs*/}
                <PointsTabs
                    borderWidth={borderWidth}
                    selectedTab={selectedTab}
                    matchPointsTabRef={matchPointsTabRef}
                    seasonPointsTabRef={seasonPointsTabRef}
                    onMatchTabClick={handleMatchTabClick}
                    onSeasonTabClick={handleSeasonTabClick}
                />
                {/*Content*/}
                <div style={STYLES.pointsBox}>
                    <motion.div
                        variants={matchPointsTabContentAnimation()}
                        animate={selectedTab === ZERO ? 'moveRight' : 'moveLeft'}
                        style={STYLES.matchPointsBox}
                    >
                        <div style={{
                            ...STYLES.content,
                            display: hideTabsBox ? 'none' : 'block'
                        }}><MatchPointsTable player={player}/></div>

                    </motion.div>
                    <motion.div
                        variants={seasonPointsTabContentAnimation()}
                        animate={selectedTab === ZERO ? 'moveRight' : 'moveLeft'}
                        onAnimationStart={() => {
                            if (selectedTab === ZERO) {
                                setHideTabsBox(false)
                            }
                        }}
                        onAnimationComplete={() => {
                            if(selectedTab === ONE) {
                                setHideTabsBox(true)
                            }
                        }}
                        style={STYLES.seasonPointsBox}
                    >
                        <div style={STYLES.content}><SeasonPoints player={player}/></div>
                    </motion.div>
                </div>
            </Div>
        </Div>
    )
}