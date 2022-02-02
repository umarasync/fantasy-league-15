// Components
import Layout from "components/layout";
import Div from "components/html/Div";
import Image from "components/html/Image";
import Text from "components/html/Text";
import Button from "components/html/Button";
import Username from "components/user/Username";
import LeagueHeader from "components/leaguesAndRanking/leagueInner/LeagueHeader";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";
import LeagueBoard from "../components/leaguesAndRanking/leagueInner/LeagueBoard";

export default function LeagueInner() {
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

                <LeagueHeader mb={32}/>
                <LeagueBoard/>
            </Div>
        </Layout>
    )
}