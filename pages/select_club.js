// Packages
import {useRef} from "react";

// Components
import Layout from "components/layout";
import PrimaryButton from "components/buttons/primaryButton";
import useResize from "hooks/useResize";
import getResponsiveValue from "utils/getResponsiveValue";
import SelectClubCard from "../components/selectClub/SelectClubCard";

export default function SelectClub() {

    const pictureBoxRef = useRef()
    const { width: pictureBoxWidth, height: pictureBoxHeight } = useResize(pictureBoxRef)

    const getResponsiveMeasure = (value) => {
        return getResponsiveValue(pictureBoxHeight, value, 'px')
    }

    return (
        <Layout title="Select Club">
            <div className="bg-[url('/images/green_grunge_border_with_halftone_background_2.png')] bg-[length:100%_100%] h-full bg-no-repeat pt-[3.4rem] fixed w-full">
                <div>
                    <img src="/images/logo_white.png" alt="" className="w-[16.4rem] h-[4rem] mb-[2rem] ml-[8rem]"/>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-white font-[800] leading-[5.4rem] text-[5rem] italic uppercase text-center">select your <br/>favorite club {pictureBoxWidth} { pictureBoxHeight/40}  </p>
                    <p className="text-[1.8rem] leading-[2.6rem] font-[300] text-center text-white opacity-[0.7] mt-[2.4rem]">
                        Based on this choice, players will be prioritized when creating <br/>a team, and you will join a fan league of the selected club
                    </p>
                </div>

                <div className="bg-green-500 flex justify-between items-center mt-[6rem]" ref={pictureBoxRef}>



                    <div className="w-[11.11%]">
                        <img
                            src="/images/card_blue_small_left.png"
                            alt=""
                            className="w-[100%]"
                        />
                    </div>

                    <SelectClubCard
                        pictureBoxHeight={pictureBoxHeight}
                        image={{
                            name: 'fortuna.png',
                            width: 5.27,
                            height: 4.43
                        }}
                        heading ={{
                            title: 'FORTUNA SITTARD',
                            color: 'text-white',
                            text: 17.95,
                            pt: 38.2,
                            leading: 8.68
                        }}
                        subHeading ={{
                            title: 'Sittard',
                            color: 'text-lavender_grey',
                            text: 27.14,
                            leading: 14.69,
                            mt: -10
                        }}
                        containerStyle="w-[20.76%]"
                        bgImage={'card_blue.png'}
                        itemsCenter
                    />

                    {/*3*/}

                    <SelectClubCard
                        pictureBoxHeight={pictureBoxHeight}
                        image={{
                            name: 'sparta.png',
                            width: 2.60,
                            height: 2.60
                        }}
                        heading ={{
                            title: 'ajax',
                            color: 'text-black',
                            text: 11.21,
                            pt: 11.21,
                            leading: 8.15
                        }}

                        subHeading ={{
                            title: 'Rotterdam',
                            color: 'text-regent_grey',
                            text: 19.94,
                            leading: 14.36,
                            mt: 89.75
                        }}

                        containerStyle="w-[28.33%] items-start"
                        bgImage={'card_white.png'}
                        boxPaddingTop={17.5}
                        controls={{
                            buttonHeight: 5.12,
                            top: 0.98,
                            mb: 9.56,
                            icon: {
                                width: 6.36,
                                height: 6.36
                            }
                        }}
                    />

                    {/*<div className="w-[28.33%] relative">*/}
                    {/*    <img*/}
                    {/*        src="/images/card_white.png"*/}
                    {/*        alt=""*/}
                    {/*        className="w-full"*/}
                    {/*    />*/}
                    {/*    <div className="flex absolute px-[5rem] w-full top-[-1rem] flex-col items-center">*/}
                    {/*        <img*/}
                    {/*            src="/images/sparta.png"*/}
                    {/*            alt=""*/}
                    {/*            className="text-center"*/}
                    {/*        />*/}
                    {/*        <p className="uppercase italic text-black_rock text-[3.2rem] leading-[4.4rem] font-[800]">ajax</p>*/}
                    {/*        <p className="text-regent_grey text-[1.8rem] leading-[2.6rem] normal">Amsterdam</p>*/}
                    {/*    </div>*/}

                    {/*    <div className="flex absolute px-[5rem] w-full bottom-[-13.4rem] flex-col items-center">*/}
                    {/*        <PrimaryButton title={'select'} />*/}
                    {/*        <div className="flex justify-center mt-[4rem]">*/}
                    {/*            <img src="/images/left_arrow_select_club.png" alt="" className="mr-[1rem]"/>*/}
                    {/*            <img src="/images/right_arrow_select_club.png" alt="" className="ml-[1rem]"/>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*4*/}


                    <SelectClubCard
                        pictureBoxHeight={pictureBoxHeight}
                        image={{
                            name: 'sparta.png',
                            width: 4.43,
                            height: 4.43
                        }}
                        heading ={{
                            title: 'SPARTA ROTTERDAM',
                            color: 'text-white',
                            text: 17.95,
                            pt: 38.2,
                            leading: 8.68
                        }}
                        subHeading ={{
                            title: 'Rotterdam',
                            color: 'text-lavender_grey',
                            text: 27.14,
                            leading: 14.69,
                            mt: -10
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

                <div className="h-[22rem]"></div>
            </div>
        </Layout>
    )
}
