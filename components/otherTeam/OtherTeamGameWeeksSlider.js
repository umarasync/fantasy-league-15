// Packages
import {createRef, useEffect, useRef, useState} from "react";
import {motion, useAnimation} from "framer-motion";
import dayjs from "dayjs";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import BorderHorizontal from "components/borders/BorderHorizontal";
import LeagueBoardBorder from "components/leaguesAndRanking/leagueInner/LeagueBoardBorder";
import OtherTeamSliderControls from "components/otherTeam/OtherTeamSliderControls";

// Animation
import {scrollAnimation, subHeadingAnimation} from "Animations/leaguesAndRanking/LeagueAndRankingAnimation";

// Constants
import colors from "constants/colors";
import {getOtherTeamData} from "constants/data/otherTeam";

// Utils
import R from "utils/getResponsiveValue";
import {clone} from "utils/helpers";
import {setInitialSettings} from "utils/otherTeamHelper";

// Styles
const getStyles = (R) => {
    return {
        item: {
            cursor: 'pointer',
            marginLeft: R(35),
            marginRight: R(35),
        },
        scrollBox: {
            whiteSpace: 'nowrap',
        },
        scrollContainer: {
            width: '80%',
            // width: R(570),
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

export default function OtherTeamGameWeeksSlider() {

    const STYLES = {...getStyles(R)}

    const INITIAL_OTHER_TEAM_DATA = clone(getOtherTeamData())
    const [activeTab, setActiveTab] = useState({})
    const [animationInProgress, setAnimationInProgress] = useState(false)
    const [otherTeamData, setOtherTeamData] = useState([])

    const controls = useAnimation()
    const [borderData, setBorderData] = useState({})
    const [moved, setMoved] = useState(0)

    // Refs
    const scrollContainerRef = useRef()
    const elementsRef = useRef(INITIAL_OTHER_TEAM_DATA.map(() => createRef()));
    const scrollBoxOriginPoint = R(40)

    const handleControls = (isNext) => {
        return false
    }

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
                            otherTeamData.length > 0 && otherTeamData.map((lgwr, index) => {
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
            <OtherTeamSliderControls onPrevious={handleControls} onNext={() => handleControls(true)}/>
        </Div>
    )
}