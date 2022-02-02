// Packages
import {motion, useAnimation} from "framer-motion";
import {createRef, useEffect, useRef, useState} from "react";
import dayjs from 'dayjs'

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import LeagueBoardControls from "components/leaguesAndRanking/leagueInner/LeagueBoardControls";
import LeagueBoardBorder from "components/leaguesAndRanking/leagueInner/LeagueBoardBorder";
import Image from "components/html/Image";
import Button from "components/html/Button";

// Constants
import {SHADOW_WHITE_SMOKE} from "constants/boxShadow";
import colors from "constants/colors";
import getLeaguesGameWeeksRanking from "constants/data/leaguesGameWeeks";

// utils
import {clone} from "utils/helpers";
import R from "utils/getResponsiveValue";
import MatchBoardContent from "components/mySquad/MatchBoardContent";
import {
    controlsHandler,
    scrollRenderer,
    tabClickHandler,
    MAKE_TRANSFERS
} from "utils/matchBoardHelper";
import {getActiveRect, setInitialSettings} from "utils/leagueBoardHelper";

// Animations
import {scrollAnimation, borderAnimation, subHeadingAnimation} from "Animations/matchBoard/MatchBoardAnimation";
import {ZERO} from "../../../constants/arrayIndexes";
import BorderHorizontal from "../../Borders/BorderHorizontal";


// Styles
const getStyles = (R) => {
    return {
        // New Styles
        item: {
            cursor: 'pointer',
            marginLeft: R(31),
            marginRight: R(31),
        },
        scrollContainer: {
            width: R(1080),
        },

        // Old Styles
        scrollBox: {
            whiteSpace: 'nowrap',
        },
        subHeading: {
            color: colors.regent_grey,
            fontSize: R(28),
            lineHeight: R(32, 'px')
        },
        borderStyle: {
            height: R(2),
            position: 'absolute',
            background: colors.mandy,
            marginTop: R(20),
        },
        calendarIcon: {
            position: 'absolute',
            top: R(15),
            left: R(23)
        }
    }
}

export default function LeagueBoard () {

    const STYLES =  { ...getStyles(R) }

    const INITIAL_GAME_WEEKS_RANKINGS = clone(getLeaguesGameWeeksRanking())
    const [activeTab, setActiveTab] = useState(INITIAL_GAME_WEEKS_RANKINGS[0])
    const [leaguesGameWeeksRanking, setLeaguesGameWeeksRanking] = useState([])



    const scrollContainerRef = useRef()


    const [moved, setMoved] = useState(0)
    const [initialRenderDone, setInitialRenderDone] = useState(false)
    const [animationInProgress, setAnimationInProgress] = useState(false)
    const [tabChanged, setTabChanged] = useState(false)

    const [borderData, setBorderData] = useState({})

    const [activeTabContent, setActiveTabContent] = useState({})
    let activeRef = useRef()
    const elementsRef = useRef(INITIAL_GAME_WEEKS_RANKINGS.map(() => createRef()));

    const handleTabClick = (lgwr) => {
        const el = elementsRef.current[lgwr.id]
        const { activeRect, activeLeft } = getActiveRect({
            itemRef: el,
            scrollContainerRef
        })
        setBorderData({
            width: activeRect.width,
            leftOffset: activeLeft
        })
    }

    const handleControls = (isNext = false) => {
        const nextLAR = controlsHandler({
            isNext,
            leaguesGameWeeksRanking
        })

        if(!nextLGWR) return
        setLeaguesGameWeeksRanking(nextLAR)

        handleTabClick(nextLAR[])
    }

    // const setBorderHeightDynamically = () => {
    //     console.log(elementsRef[0])
    //     if (!elementsRef[0]) return
    //     const firstElRect = elementsRef[0].current.getBoundingClientRect()
    //     setBorderData(firstElRect.width)
    // }

    useEffect(() => {
        setInitialSettings({
            initialGameWeeksRankings: INITIAL_GAME_WEEKS_RANKINGS,
            setLeaguesGameWeeksRanking,
            setActiveTabContent
        })
        // setLeaguesGameWeeksRanking([...INITIAL_GAME_WEEKS_RANKINGS])
        // setBorderHeightDynamically()
    }, [])


    return (
        <Div
            h={593}
            pt={40}
            pb={50}
            w={1280}
            className={'bg-white'}
            position="relative"
            br={12}
            bs={SHADOW_WHITE_SMOKE}
        >

            {/*Tabs*/}
            <Div position={'relative'} style={STYLES.scrollBox}>
                <Div className={'flex justify-center'}>
                    <div style={{...STYLES.scrollContainer}} ref={scrollContainerRef}>
                        <Div className={'flex overflow-hidden'}>
                            {
                                // lrw = League-Game-Week-Ranking
                                leaguesGameWeeksRanking.length > 0 && leaguesGameWeeksRanking.map((lgwr, index) => {
                                    return (
                                        lgwr.date ? (
                                            <div
                                                className={'flex flex-col items-center justify-center'}
                                                style={STYLES.item}
                                                ref={elementsRef.current[lgwr.id]}
                                                onClick={() => handleTabClick(lgwr)}
                                            >
                                                <Text
                                                    text={lgwr.week}
                                                    fs={18}
                                                    lh={26}
                                                    color={colors.regent_grey}
                                                    mb={4}
                                                />
                                                <Text
                                                    text={dayjs(lgwr.date).format('DD MMM')}
                                                    fs={28}
                                                    lh={32}
                                                    fw={'bold'}
                                                    fst={'italic'}
                                                    color={colors.regent_grey}
                                                />
                                            </div>
                                        ) : (
                                            <div
                                                className={'flex items-center justify-center'}
                                                style={STYLES.item}
                                                ref={elementsRef.current[index]}
                                                onClick={() => handleTabClick(lgwr)}
                                            >
                                                <Text
                                                    text={lgwr.week}
                                                    fs={28}
                                                    lh={32}
                                                    fw={'bold'}
                                                    fst={'italic'}
                                                    tt={'uppercase'}
                                                    color={colors.black_rock}
                                                />
                                            </div>
                                        )
                                    )
                                })
                            }
                        </Div>
                        <LeagueBoardBorder borderData={borderData}/>
                    </div>
                </Div>

                <Div mt={20}><BorderHorizontal opacity={0.5}/></Div>
                <LeagueBoardControls onPrevious={handleControls} onNext={() => handleControls(true)} />

            </Div>

            {/*Content*/}
            <Div/>
        </Div>
    )

}