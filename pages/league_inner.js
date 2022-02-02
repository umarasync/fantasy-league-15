// Components
import Layout from "components/layout";
import Div from "components/html/Div";
import Image from "components/html/Image";

// Utils
import R from "utils/getResponsiveValue";

export default function LeagueInner() {
    return (
        <Layout title={'Leagues'}>
            <Div
                className="bg-[url('/images/green_grunge_border_with_halftone_background_2.png')]
                bg-[length:100%_100%] bg-no-repeat w-full relative"
                style={{minHeight: R()}}
                pt={34}
            >
                <Div>
                    <Image src={'/images/logo_white.png'} w={164} h={40}/>
                </Div>
            </Div>
        </Layout>
    )
}