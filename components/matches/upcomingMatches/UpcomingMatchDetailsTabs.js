// Packages
import {motion} from "framer-motion";

// Components
import Div from "components/html/Div";
import BorderHorizontal from "components/borders/BorderHorizontal";

// Constants
import colors from "constants/colors";
import {ZERO, ONE} from "constants/arrayIndexes";

// Animation
import {tabsAnimation, tabsBorderAnimation} from "Animations/matches/UpcomingMatchDetailsAnimation";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        tabsBox: {
            zIndex: 1
        },
        tab1: {
            marginRight: R(40)
        },
        tab2: {
            marginLeft: R(40)
        },
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
        border1: {
            width: R(175)
        },
    }
}

export default function UpcomingMatchDetailsTabs({
   borderWidth,
   selectedTab,
   highlightsTabRef,
   statisticsTabRef,
   onHighlightsClick,
   onStatisticsClick
}) {
    const STYLES = {...getStyles(R)}

    return (
        <Div w={'100%'} mt={25} pt={24} className={'bg-mystic-alabaster'}>
            <Div center>
                <Div ml={30} mr={30} className={'flex items-center justify-between'} style={STYLES.tabsBox}
                     position={'relative'}>
                    {
                        borderWidth ? (
                            <motion.div
                                variants={tabsBorderAnimation()}
                                animate={selectedTab === ZERO ? 'tabOne' : 'tabTwo'}
                                style={{
                                    ...STYLES.border,
                                    width: borderWidth
                                }}
                            />
                        ) : (
                            <motion.div
                                variants={tabsBorderAnimation()}
                                animate={selectedTab === ZERO ? 'tabOne' : 'tabTwo'}
                                style={{...STYLES.border, ...STYLES.border1}}
                            />
                        )
                    }
                    <motion.p
                        variants={tabsAnimation()}
                        animate={selectedTab === ZERO ? 'animate' : 'initial'}
                        style={{
                            ...STYLES.tabs,
                            ...STYLES.tab1,
                            color: colors.black_rock
                        }}
                        ref={highlightsTabRef}
                        onClick={() => onHighlightsClick(ZERO)}
                    >Last matchups
                    </motion.p>
                    <motion.p
                        variants={tabsAnimation()}
                        animate={selectedTab === ONE ? 'animate' : 'initial'}
                        style={{
                            ...STYLES.tabs,
                            ...STYLES.tab2,
                            color: colors.regent_grey
                        }}
                        ref={statisticsTabRef}
                        onClick={() => onStatisticsClick(ONE)}
                    >head-to-head
                    </motion.p>
                </Div>
            </Div>
            <Div mt={10}><BorderHorizontal opacity={0.5}/></Div>
        </Div>
    )
}