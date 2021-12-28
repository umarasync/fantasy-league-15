// Packages
import {arrayMoveImmutable} from 'array-move';

// Components
import Layout from "components/layout";
import SelectClubCard from "components/selectClub/SelectClubCard";
import {useState} from "react";

// Utils
import R from "utils/getResponsiveValue";

const cardsData = [
    {
        image: 'gronigen.png',
        title: 'FEYENOORD',
        subTitle: 'Rotterdam'
    },
    {
        image: 'fortuna.png',
        title: 'FORTUNA SITTARD',
        subTitle: 'Sittard'
    },
    {
        image: 'fortuna.png',
        title: 'ajax',
        subTitle: 'Rotterdam'
    },
    {
        image: 'sparta.png',
        title: 'SPARTA ROTTERDAM',
        subTitle: 'Rotterdam'
    },
    {
        image: 'gronigen.png',
        title: 'Groningen',
        subTitle: 'Alkmaar'
    }
]

export default function SelectClub() {

    const [data, setData] = useState(cardsData);
    const onControlsClick = (isLeftPressed = false) => {
        let dataI = []
        if(isLeftPressed){
            dataI = arrayMoveImmutable(data, -1, 0);
        }else {
            dataI = arrayMoveImmutable(data, 0, -1);
        }
        setData(dataI)
    }
    const firstCard = data[0]
    const secondCard = data[1]
    const thirdCard = data[2]
    const fourthCard = data[3]
    const fifthCard = data[4]

    return (
        <Layout title="Select Club">
            <div className="bg-[url('/images/green_grunge_border_with_halftone_background_2.png')]
            bg-[length:100%_100%] h-full bg-no-repeat pt-[3.4rem] bg-cover w-full bg-center relative"
                 style={{
                     height: R(900, '', true)
                 }}
            >
                <div className="absolute"
                     style={{
                         top: R(34),
                         left: R(80),
                         zIndex: 1
                     }}
                >
                    <img src="/images/logo_white.png" alt="" className="w-[16.4rem] h-[4rem]"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-white font-[800] leading-[5.4rem] mt-[5rem] text-[5rem] italic uppercase text-center">select your <br/>favorite club</p>
                    <p className="text-[1.8rem] leading-[2.6rem] font-[300] text-center text-white opacity-[0.7] mt-[2.4rem]">
                        Based on this choice, players will be prioritized when creating <br/>a team, and you will join a fan league of the selected club
                    </p>
                </div>


                <div className="flex justify-between items-center mt-[6rem]">
                    {/*1*/}
                    <SelectClubCard
                        image={{
                            name: firstCard.image,
                            width: 59,
                            height: 59
                        }}
                        heading ={{
                            title: firstCard.title,
                            color: 'text-white',
                            text: 14,
                            pt: 10,
                            leading: 18
                        }}
                        subHeading ={{
                            title: firstCard.subTitle,
                            color: 'text-lavender_grey',
                            text: 12,
                            leading: 16,
                            mt: 4
                        }}
                        containerStyle="w-[11.11%]"
                        bgImage={'card_blue_small_left.png'}
                        itemsCenter
                    />
                    {/*2*/}
                    <SelectClubCard
                        image={{
                            name: secondCard.image,
                            width: 81,
                            height: 81
                        }}
                        heading ={{
                            title: secondCard.title,
                            color: 'text-white',
                            text: 20,
                            pt: 20,
                            leading: 24
                        }}
                        subHeading ={{
                            title: secondCard.subTitle,
                            color: 'text-lavender_grey',
                            text: 14,
                            leading: 22,
                            mt: 4
                        }}
                        containerStyle="w-[20.76%]"
                        bgImage={'card_blue.png'}
                        itemsCenter
                    />
                    {/*3*/}
                    <SelectClubCard
                        image={{
                            name: thirdCard.image,
                            width: 150,
                            height: 150
                        }}
                        heading ={{
                            title: thirdCard.title,
                            color: 'text-black',
                            text: 32,
                            pt: 20,
                            leading: 44
                        }}
                        subHeading ={{
                            title: thirdCard.subTitle,
                            color: 'text-regent_grey',
                            text: 18,
                            leading: 26,
                            mt: 4
                        }}
                        containerStyle="w-[28.33%] items-start"
                        bgImage={'card_white.png'}
                        boxPaddingTop={17.5}
                        controls={{
                            buttonHeight: 70,
                            bottom: -130,
                            buttonText: {
                                fontSize: 16
                            },
                            mb: 40,
                            icon: {
                                width: 60,
                                height: 60
                            },
                            onControlsClick: onControlsClick
                        }}
                    />
                    {/*4*/}
                    <SelectClubCard
                        image={{
                            name: fourthCard.image,
                            width: 81,
                            height: 81
                        }}
                        heading ={{
                            title: fourthCard.title,
                            color: 'text-white',
                            text: 20,
                            pt: 20,
                            leading: 24
                        }}
                        subHeading ={{
                            title: fourthCard.subTitle,
                            color: 'text-lavender_grey',
                            text: 14,
                            leading: 22,
                            mt: 4
                        }}
                        containerStyle="w-[20.76%]"
                        bgImage={'card_blue.png'}
                        itemsCenter
                    />
                    {/*5*/}
                    <SelectClubCard
                        image={{
                            name: fifthCard.image,
                            width: 59,
                            height: 59
                        }}
                        heading ={{
                            title: fifthCard.title,
                            color: 'text-white',
                            text: 14,
                            pt: 10,
                            leading: 18
                        }}
                        subHeading ={{
                            title: firstCard.subTitle,
                            color: 'text-lavender_grey',
                            text: 12,
                            leading: 16,
                            mt: 4
                        }}
                        containerStyle="w-[11.11%]"
                        bgImage={'card_blue_small_right.png'}
                        itemsCenter
                    />
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
