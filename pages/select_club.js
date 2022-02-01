// Packages
import {arrayMoveImmutable} from 'array-move';
import {useRouter} from "next/router";
import {useState} from "react";

// Components
import Layout from "components/layout";
import CardSection from "components/selectClub/CardSection";
import ClubControls from "components/selectClub/ClubControls";
import Div from "components/html/Div";
import Image from "components/html/Image"
import Text from "components/html/Text"

// Utils
import R from "utils/getResponsiveValue";

// Constants
import cardsDataI from "constants/data/cardsData";
import colors from "constants/colors";

// Styles
const getStyles = (R) => {
    return {
        gradient: {
            width: R(299),
            height: '100%'
        },
        image: {
            top: R(34),
            left: R(80),
            zIndex: 1
        }
    }
}

export default function SelectClub() {

    const STYLES =  { ... getStyles(R) }

    const router = useRouter()
    const [cardsData, setCardsData] = useState(cardsDataI);
    const [cardsNextData, setCardsNextData] = useState(cardsDataI);
    const [changeCard, setChangeCard] = useState(true)

    const onControlsClick = (isLeftPressed = false) => {
        let dataI = []
        if(isLeftPressed){
            dataI = arrayMoveImmutable(cardsData, -1, 0);
        }else {
            dataI = arrayMoveImmutable(cardsData, 0, -1);
        }

        setCardsNextData(dataI)
        setChangeCard(!changeCard)
        setCardsData(dataI)
    }

    const onNextClick = () => {
        router.push('/build_team_all_players')
    }

    const firstCard = cardsData[0]
    const secondCard = cardsData[1]
    const thirdCard = cardsData[2]
    const fourthCard = cardsData[3]
    const fifthCard = cardsData[4]

    const nextFirstCard = cardsNextData[0]
    const nextSecondCard = cardsNextData[1]
    const nextThirdCard = cardsNextData[2]
    const nextFourthCard = cardsNextData[3]
    const nextFifthCard = cardsNextData[4]

    return (
        <Layout title="Select Club">
            <Div
                className="bg-[url('/images/green_grunge_border_with_halftone_background_2.png')]
                bg-[length:100%_100%] bg-no-repeat w-full relative"
                 style={{minHeight: R()}}
                pt={34}
            >
                <div className="absolute" style={STYLES.image}>
                    <Image name={'logo_white.png'} alt={''} w={164} h={40}/>
                </div>
                <div className="flex flex-col items-center">
                    <Text
                        text={<span>select your <br/>favorite club</span>}
                        fs={50}
                        fst={'italic'}
                        tt={'uppercase'}
                        textAlign={'center'}
                        fw={800}
                        lh={54}
                        mt={50}
                        color={colors.white}
                    />
                    <Text
                        text={<span> Based on this choice, players will be prioritized when creating <br/>a team, and you will join a fan league of the selected club</span>}
                        fs={18}
                        textAlign={'center'}
                        lh={26}
                        color={colors.white}
                        mt={24}
                        opacity={0.7}
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mt-[6rem] w-full" >
                        <CardSection
                            firstCard={firstCard}
                            secondCard={secondCard}
                            thirdCard={thirdCard}
                            fourthCard={fourthCard}
                            fifthCard={fifthCard}

                            nextFirstCard={nextFirstCard}
                            nextSecondCard={nextSecondCard}
                            nextThirdCard={nextThirdCard}
                            nextFourthCard={nextFourthCard}
                            nextFifthCard={nextFifthCard}

                            changeCard={changeCard}
                        />
                    </div>
                    {/*Controls*/}
                    <ClubControls onControlsClick={onControlsClick} onNextClick={onNextClick}/>
                </div>

                {/*left gradient*/}
                <div
                    className="bg-[url('/images/gradient_blue_left.png')] absolute bg-[length:100%_100%] bg-no-repeat  top-[0] left-[0] "
                    style={STYLES.gradient}
                />
                {/*right gradient*/}
                <div
                    className="bg-[url('/images/gradient_blue_right.png')] absolute bg-[length:100%_100%] bg-no-repeat  top-[0] right-[0] "
                    style={STYLES.gradient}
                />
            </Div>
        </Layout>
    )
}
