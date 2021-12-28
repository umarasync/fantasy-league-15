// Components
import Layout from "components/layout";
import SelectClubCard from "components/selectClub/SelectClubCard";

export default function SelectClub() {

    return (
        <Layout title="Select Club">
            <div className="bg-[url('/images/green_grunge_border_with_halftone_background_2.png')] bg-[length:100%_100%] h-full bg-no-repeat pt-[3.4rem] bg-cover w-full">
                <div>
                    <img src="/images/logo_white.png" alt="" className="w-[16.4rem] h-[4rem] mb-[2rem] ml-[8rem]"/>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-white font-[800] leading-[5.4rem] text-[5rem] italic uppercase text-center">select your <br/>favorite club</p>
                    <p className="text-[1.8rem] leading-[2.6rem] font-[300] text-center text-white opacity-[0.7] mt-[2.4rem]">
                        Based on this choice, players will be prioritized when creating <br/>a team, and you will join a fan league of the selected club
                    </p>
                </div>

                <div className="flex justify-between items-center mt-[6rem]">
                    <div className="w-[11.11%]">
                        <img
                            src="/images/card_blue_small_left.png"
                            alt=""
                            className="w-[100%]"
                        />
                    </div>
                    <SelectClubCard
                        image={{
                            name: 'fortuna.png',
                            width: 68,
                            height: 81
                        }}
                        heading ={{
                            title: 'FORTUNA SITTARD',
                            color: 'text-white',
                            text: 20,
                            pt: 20,
                            leading: 24
                        }}
                        subHeading ={{
                            title: 'Sittard',
                            color: 'text-lavender_grey',
                            text: 14,
                            leading: 22,
                            mt: 4
                        }}
                        containerStyle="w-[20.76%]"
                        bgImage={'card_blue.png'}
                        itemsCenter
                    />

                    {/*Select Box 3*/}

                    <SelectClubCard
                        image={{
                            name: 'sparta.png',
                            width: 150,
                            height: 150
                        }}
                        heading ={{
                            title: 'ajax',
                            color: 'text-black',
                            text: 32,
                            pt: 20,
                            leading: 44
                        }}

                        subHeading ={{
                            title: 'Rotterdam',
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
                            }
                        }}
                    />

                    {/*Select Box 4*/}

                    <SelectClubCard
                        image={{
                            name: 'sparta.png',
                            width: 81,
                            height: 81
                        }}
                        heading ={{
                            title: 'SPARTA ROTTERDAM',
                            color: 'text-white',
                            text: 20,
                            pt: 20,
                            leading: 24
                        }}
                        subHeading ={{
                            title: 'Rotterdam',
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
                    <div className="w-[11.11%]">
                        <img
                            src="/images/card_blue_small_right.png"
                            alt=""
                            className="w-[100%]"
                        />
                    </div>
                </div>
                <div className="h-[23rem]">

                </div>
            </div>
        </Layout>
    )
}
