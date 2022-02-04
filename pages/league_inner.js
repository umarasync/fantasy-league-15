// Packages
import {motion, AnimatePresence} from "framer-motion";
import {useRouter} from "next/router";
import {useState} from "react";

// Components
import Layout from "components/layout";
import Div from "components/html/Div";
import Image from "components/html/Image";
import Username from "components/user/Username";
import LeagueHeader from "components/leaguesAndRanking/leagueInner/LeagueHeader";
import LeagueBoard from "components/leaguesAndRanking/leagueInner/LeagueBoard";
import LeagueSettingsHeader from "components/leaguesAndRanking/leagueInner/LeagueSettingsHeader";
import LeagueSettingsBoard from "components/leaguesAndRanking/leagueInner/LeagueSettingsBoard";

// Utils
import R from "utils/getResponsiveValue";

// Animations
import {leagueSettingsBoardAnimation} from "Animations/leaguesAndRanking/LeagueAndRankingSettingsAnimation";

// Styles
const getStyles = (R) => {
    return {
        content: {
            gridColumn: 1,
            gridRow: 1
        }
    }
}

export default function LeagueInner() {

    const STYLES = {...getStyles(R)}

    // Router
    const router = useRouter()
    const {query} = router
    const {leagueId} = query
    // States
    const [showSettings, setShowSettings] = useState(false)

    const handleSettingsBackClick = () => {
        setShowSettings(false)
    }

    const handleSettingsClick = () => {
        setShowSettings(true)
    }

    const handleBackClick = () => {
        router.push('/my_squad_game_week')
    }

    return (
        <Layout title={'Leagues'}>
            <Div
                className="bg-[url('/images/green_grunge_border_with_halftone_background_2.png')]
                bg-[length:100%_100%] bg-no-repeat w-full relative"
                style={{minHeight: R()}}
                pt={34}
                pb={66}
                pl={81}
                pr={81}
            >
                <Div className={'flex items-center justify-between'} mb={50}>
                    <Image src={'/images/logo_white.png'} w={164} h={40} alt={'logo_white'}/>
                    <Username username={'martine.bakker'} iconSrc={'/images/user_white.png'}/>
                </Div>
                <Div className={"grid"}>
                    {
                        showSettings ? (
                            <AnimatePresence>
                                <motion.div
                                    variants={leagueSettingsBoardAnimation()}
                                    initial={"initial"}
                                    animate={"animate"}
                                    exit={"exit"}
                                    key={1}
                                    style={STYLES.content}
                                >
                                    <LeagueSettingsHeader
                                        mb={32}
                                        onBackArrowClick={handleSettingsBackClick}
                                    />
                                    <LeagueSettingsBoard leagueId={leagueId}/>
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <AnimatePresence>
                                <motion.div
                                    variants={leagueSettingsBoardAnimation()}
                                    initial={"initial"}
                                    animate={"animate"}
                                    exit={"exit"}
                                    key={2}
                                    style={STYLES.content}
                                >
                                    <LeagueHeader
                                        mb={32}
                                        onSettingsClick={handleSettingsClick}
                                        onBackClick={handleBackClick}
                                    />
                                    <LeagueBoard leagueId={leagueId}/>
                                </motion.div>
                            </AnimatePresence>
                        )
                    }
                </Div>
            </Div>
        </Layout>
    )
}