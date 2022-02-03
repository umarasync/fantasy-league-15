// Packages
import {motion} from "framer-motion";

// Components
import Div from "components/html/Div";
import BorderHorizontal from "components/borders/BorderHorizontal";

// Constants
import colors from "constants/colors";
import {ZERO, ONE} from "constants/arrayIndexes";

// Animation
import {pointsTabsAnimation, tabsBorderAnimation} from "Animations/playerInfo/PointsBoardAnimation";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        tabsBox: {
            zIndex: 1
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
            width: R(162)
        },
    }
}

export default function PointsTabs({
   borderWidth,
   selectedTab,
   matchPointsTabRef,
   seasonPointsTabRef,
   onMatchTabClick,
   onSeasonTabClick
}) {
    const STYLES = {...getStyles(R)}
    return (
        <>
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
                    variants={pointsTabsAnimation()}
                    animate={selectedTab === ZERO ? 'animate' : 'initial'}
                    style={{
                        ...STYLES.tabs,
                        color: colors.black_rock
                    }}
                    ref={matchPointsTabRef}
                    onClick={() => onMatchTabClick(ZERO)}
                >Match points
                </motion.p>

                <motion.p
                    variants={pointsTabsAnimation()}
                    animate={selectedTab === ONE ? 'animate' : 'initial'}
                    style={{
                        ...STYLES.tabs,
                        color: colors.regent_grey
                    }}
                    ref={seasonPointsTabRef}
                    onClick={() => onSeasonTabClick(ONE)}
                >season points
                </motion.p>

            </Div>
            <Div ml={30} mr={30} mt={10}><BorderHorizontal/></Div>
        </>
    )
}