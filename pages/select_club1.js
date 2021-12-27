// Components
import Layout from "components/layout";

export default function SelectYourClub() {
    return (
        <Layout title="Confirm Your Account">
            <div className="bg-[url('/images/green_grunge_border_with_halftone_background_2.png')] bg-[length:100%_100%] bg-no-repeat fixed top-0 left-0 relative pt-[3.4rem]">
                <div>
                    <img src="/images/logo_white.png" alt="" className="w-[16.4rem] h-[4rem] mb-[2rem] ml-[8rem]"/>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-white font-[800] leading-[5.4rem] text-[5rem] italic uppercase text-center">select your <br/>favorite club</p>
                    <p className="text-[1.8rem] leading-[2.6rem] font-[300] text-center text-white opacity-[0.7] mt-[2.4rem]">
                        Based on this choice, players will be prioritized when creating <br/>a team, and you will join a fan league of the selected club
                    </p>
                </div>

                {/*<div className="flex justify-between items-center mt-[6rem]">*/}
                {/*    <div className="bg-[url('/images/card_blue_small_left.png')] w-[16rem] h-[14.7rem] rounded-[1.2rem] bg-no-repeat"></div>*/}
                {/*    <div className="bg-[url('/images/card_blue.png')] w-[29.9rem] h-[23.1rem] rounded-[1.2rem] bg-no-repeat ml-[2.8rem]"></div>*/}
                {/*    <div className="bg-white w-[28.33%] h-[36rem] bg-cover ">*/}

                {/*    </div>*/}
                {/*    <div className="bg-[url('/images/card_blue.png')] w-[29.9rem] h-[23.1rem] rounded-[1.2rem] bg-no-repeat mr-[2.8rem]"></div>*/}
                {/*    <div className="bg-[url('/images/card_blue_small_right.png')] w-[16rem] h-[14.7rem] rounded-[1.2rem] bg-no-repeat"></div>*/}
                {/*</div>*/}


                <div className="flex justify-between items-center mt-[6rem]">
                    <div className="w-[11.11%] h-[14.7rem]">
                        <img
                            src="/images/card_blue_small_left.png"
                            alt=""
                            className="w-[100%]"
                        />
                    </div>
                    <div className="w-[20.76%] h-[23.1rem]">
                        <img
                            src="/images/card_blue.png"
                            alt=""
                            className="w-[100%]"
                        />
                    </div>
                    <div className=" w-[28.33%] h-[36rem]">

                        <img
                            src="/images/card_white.png"
                            alt=""
                            className="w-full"
                        />

                    </div>
                    <div className=" w-[20.76%] h-[23.1rem]">
                        <img
                            src="/images/card_blue.png"
                            alt=""
                            className="w-[100%]"
                        />
                    </div>
                    <div className="w-[11.11%] h-[14.7rem]">
                        <img
                            src="/images/card_blue_small_right.png"
                            alt=""
                            className="w-[100%]"
                        />
                    </div>
                </div>

                {/*2nd*/}
                <div className="flex justify-between items-center mt-[6rem]">
                    <div className="w-[16rem] h-[14.7rem] rounded-[1.2rem] bg-no-repeat">

                        <img
                            src="/images/card_blue_small_left.png"
                            alt=""
                            className="w-[100%]"
                        />

                    </div>
                    <div className="h-[23.1rem] rounded-[1.2rem] bg-no-repeat ml-[2.8rem]">
                        <img
                            src="/images/card_blue.png"
                            alt=""
                            className="w-[100%]"
                        />
                    </div>
                    <div className="bg-[url('/images/card_white.png')] w-[40.8rem] h-[36rem] rounded-[1.2rem] bg-no-repeat mx-[2.8rem]">
                        <img
                            src="/images/card_white.png"
                            alt=""
                            className="w-[100%]"
                        />
                    </div>
                    <div className=" w-[29.9rem] h-[23.1rem] rounded-[1.2rem] bg-no-repeat mr-[2.8rem]">
                        <img
                            src="/images/card_blue.png"
                            alt=""
                            className="w-[100%]"
                        />
                    </div>
                    <div className="w-[16rem] h-[14.7rem] rounded-[1.2rem] bg-no-repeat">
                        <img
                            src="/images/card_blue_small_right.png"
                            alt=""
                            className="w-[100%]"
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
