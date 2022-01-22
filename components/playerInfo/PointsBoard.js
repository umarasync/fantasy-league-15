// Packages
import {useRef, useState} from "react";
import {motion} from "framer-motion";

// Components
import PlayerPoints from "components/playerInfo/PlayerPoints";
import BorderHorizontal from "components/Borders/BorderHorizontal";
import MatchPointsTable from "components/playerInfo/MatchPointsTable";
import Div from 'components/html/Div'
import SeasonPoints from "components/playerInfo/SeasonPoints";

// Constants
import {SHADOW_WHITE_SMOKE} from "constants/boxShadow";
import colors from "constants/colors"

// Utils
import R from "utils/getResponsiveValue";

// Animation
import {
    pointsTabsAnimation,
    tabsBorderAnimation,
    matchPointsTabContentAnimation,
    seasonPointsTabContentAnimation
} from "Animations/playerInfo/PointsBoardAnimation";

// Styles
const getStyles = (R) => {
        return {
            tabs: {
                fontSize: R(22),
                lineHeight: R(24, 'px'),
                textTransform: 'uppercase',
                cursor: 'pointer',
                color: colors.regent_grey,
                fontWeight: 'bold',
                fontStyle: 'italic'
            },
            border: {
                position: 'absolute',
                top: R(34),
                left: 0,
                background: colors.mandy,
                height: R(2),
            },
            tabsBox: {
              zIndex: 1
            },
            border1: {
                width: R(162)
            },
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
    const ONE = 1;
    const TWO = 2;
    const [selectedTab, setSelectedTab] = useState(ONE)
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
            <PlayerPoints/>
            <Div mt={24} ml={24} mr={24} br={12}  pt={24} pb={24}>
                <Div ml={30} mr={30} className={'flex items-center justify-between'} style={STYLES.tabsBox} position={'relative'}>
                    {
                        borderWidth ? (
                            <motion.div
                                variants={tabsBorderAnimation()}
                                animate={selectedTab === ONE ? 'tabOne' : 'tabTwo'}
                                style={{
                                    ...STYLES.border,
                                    width: borderWidth
                                }}
                            />
                        ): (
                            <motion.div
                                variants={tabsBorderAnimation()}
                                animate={selectedTab === ONE ? 'tabOne' : 'tabTwo'}
                                style={{...STYLES.border, ...STYLES.border1}}
                            />
                        )
                    }
                    <motion.p
                        variants={pointsTabsAnimation()}
                        animate={selectedTab === ONE ? 'animate' : 'initial'}
                        style={{
                            ...STYLES.tabs,
                            color: colors.black_rock
                        }}
                        ref={matchPointsTabRef}
                        onClick={() => handleMatchTabClick(ONE)}
                    >Match points
                    </motion.p>

                    <motion.p
                        variants={pointsTabsAnimation()}
                        animate={selectedTab === TWO ? 'animate' : 'initial'}
                        style={{
                            ...STYLES.tabs,
                            color: colors.regent_grey
                        }}
                        ref={seasonPointsTabRef}
                        onClick={() => handleSeasonTabClick(TWO)}
                    >season points</motion.p>

                </Div>
                <Div ml={30} mr={30} mt={10}><BorderHorizontal/></Div>


                <div style={STYLES.pointsBox}>
                    <motion.div
                        variants={matchPointsTabContentAnimation()}
                        animate={selectedTab === ONE ? 'moveRight' : 'moveLeft'}
                        style={STYLES.matchPointsBox}
                    >
                        <div style={{
                            ...STYLES.content,
                            display: hideTabsBox ? 'none' : 'block'
                        }}><MatchPointsTable player={player}/></div>

                    </motion.div>
                    <motion.div
                        variants={seasonPointsTabContentAnimation()}
                        animate={selectedTab === ONE ? 'moveRight' : 'moveLeft'}
                        onAnimationStart={() => {
                            if (selectedTab === ONE) {
                                setHideTabsBox(false)
                            }
                        }}
                        onAnimationComplete={() => {
                            if(selectedTab === TWO) {
                                setHideTabsBox(true)
                            }
                        }}
                        style={STYLES.seasonPointsBox}
                    >
                        <div style={{
                            ...STYLES.content,

                        }}><SeasonPoints player={player}/></div>
                    </motion.div>
                </div>
            </Div>
        </Div>
    )
}