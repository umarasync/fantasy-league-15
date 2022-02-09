// Packages
import {motion, AnimatePresence} from "framer-motion";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

// Components
import Layout from "components/layout";
import Div from "components/html/Div";
import Image from "components/html/Image";
import Username from "components/user/Username";
import LeagueHeader from "components/leaguesAndRanking/leagueInner/LeagueHeader";
import LeagueBoard from "components/leaguesAndRanking/leagueInner/LeagueBoard";
import LeagueSettingsHeader from "components/leaguesAndRanking/leagueInner/LeagueSettingsHeader";
import LeagueSettingsBoard from "components/leaguesAndRanking/leagueInner/LeagueSettingsBoard";
import Animated from "components/animation/Animated";

// Utils
import R from "utils/getResponsiveValue";

export default function LeagueInner() {

    const [league, setLeague] = useState({
        isLeagueOwner: true
    })

    // Router
    const router = useRouter()
    const {query} = router
    let {leagueId} = query

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

    useEffect(() => {
        // fetch league by leagueId and set the league data here
    }, [])

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
                    <Animated
                        toggleAnimation={showSettings}
                        children2={
                           <>
                               <LeagueHeader
                                   mb={32}
                                   onSettingsClick={handleSettingsClick}
                                   onBackClick={handleBackClick}
                                   league={league}
                               />
                               <LeagueBoard league={league}/>
                           </>
                        }
                    >
                        <>
                            <LeagueSettingsHeader mb={32} onBackArrowClick={handleSettingsBackClick}/>
                            <LeagueSettingsBoard/>
                        </>
                    </Animated>

                </Div>
            </Div>
        </Layout>
    )
}