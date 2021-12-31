// Packages
import {arrayMoveImmutable} from 'array-move';
import {useRouter} from "next/router";
import {useState} from "react";


// Components
import Layout from "components/layout";
import CardSection from "components/selectClub/CardSection";
import ClubControls from "components/selectClub/ClubControls";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import cardsDataI from "constants/data/cardsData";

export default function SelectClub() {

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
            <div
                className="bg-[url('/images/green_grunge_border_with_halftone_background_2.png')]
                bg-[length:100%_100%] bg-no-repeat pt-[3.4rem] w-full relative"
                 style={{
                     minHeight: R()
                 }}
            >
                <div className="absolute"
                     style={{
                         top: R(34),
                         left: R(80),
                         zIndex: 1
                     }}
                >
                    <img src="/images/logo_white.png" alt="" className="w-[16.4rem] h-[4rem]"/>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-white font-[800] leading-[5.4rem] mt-[5rem] text-[5rem] italic uppercase text-center">select your <br/>favorite club</p>
                    <p className="text-[1.8rem] leading-[2.6rem] font-[300] text-center text-white opacity-[0.7] mt-[2.4rem]">
                        Based on this choice, players will be prioritized when creating <br/>a team, and you will join a fan league of the selected club
                    </p>
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
                    <ClubControls onControlsClick={onControlsClick} onNextClick={onNextClick}  />
                </div>


                {/*left gradient*/}
                <div
                    className="bg-[url('/images/gradient_blue_left.png')] absolute bg-[length:100%_100%] bg-no-repeat  top-[0] left-[0] "
                    style={{
                        width: R(299),
                        height: '100%'
                    }}
                />
                {/*right gradient*/}
                <div
                    className="bg-[url('/images/gradient_blue_right.png')] absolute bg-[length:100%_100%] bg-no-repeat  top-[0] right-[0] "
                    style={{
                        width: R(299),
                        height: '100%'
                    }}
                />
            </div>
        </Layout>
    )
}
