// Components
import Layout from "components/layout";

export default function ConfirmAccount() {
    return (
        <Layout title="Confirm Your Account">
            <div className="bg-[url('/images/green_grunge_border_with_halftone_background_2.png')] bg-[length:100%_100%] h-screen bg-no-repeat pt-[3.4rem]">
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
                    <div className="bg-[url('/images/card_blue_small_left.png')] w-[16rem] h-[14.7rem] rounded-[1.2rem] bg-no-repeat"></div>
                    <div className="bg-[url('/images/card_blue.png')] w-[29.9rem] h-[23.1rem] rounded-[1.2rem] bg-no-repeat ml-[2.8rem]"></div>
                    <div className="bg-white w-[28.33%] h-[36rem] bg-cover ">

                    </div>
                    <div className="bg-[url('/images/card_blue.png')] w-[29.9rem] h-[23.1rem] rounded-[1.2rem] bg-no-repeat mr-[2.8rem]"></div>
                    <div className="bg-[url('/images/card_blue_small_right.png')] w-[16rem] h-[14.7rem] rounded-[1.2rem] bg-no-repeat"></div>
                </div>


                <div className="flex justify-between items-center mt-[6rem]">
                    <div className="bg-[url('/images/card_blue_small_left.png')] w-[11.11%] h-[14.7rem] rounded-[1.2rem] bg-no-repeat"></div>
                    <div className="bg-[url('/images/card_blue.png')] w-[20.76%] h-[23.1rem] rounded-[1.2rem] bg-no-repeat"></div>
                    <div className="bg-[url('/images/card_white.png')] w-[28.33%] h-[36rem] rounded-[1.2rem] bg-no-repeat"></div>
                    <div className="bg-[url('/images/card_blue.png')] w-[20.76%] h-[23.1rem] rounded-[1.2rem] bg-no-repeat"></div>
                    <div className="bg-[url('/images/card_blue_small_right.png')] w-[11.11%] h-[14.7rem] rounded-[1.2rem] bg-no-repeat"></div>
                </div>
                <div className="flex justify-between items-center mt-[6rem]">
                    <div className="bg-[url('/images/card_blue_small_left.png')] w-[16rem] h-[14.7rem] rounded-[1.2rem] bg-no-repeat"></div>
                    <div className="bg-[url('/images/card_blue.png')] w-[29.9rem] h-[23.1rem] rounded-[1.2rem] bg-no-repeat ml-[2.8rem]"></div>
                    <div className="bg-[url('/images/card_white.png')] w-[40.8rem] h-[36rem] rounded-[1.2rem] bg-no-repeat mx-[2.8rem]"></div>
                    <div className="bg-[url('/images/card_blue.png')] w-[29.9rem] h-[23.1rem] rounded-[1.2rem] bg-no-repeat mr-[2.8rem]"></div>
                    <div className="bg-[url('/images/card_blue_small_right.png')] w-[16rem] h-[14.7rem] rounded-[1.2rem] bg-no-repeat"></div>
                </div>

            </div>
        </Layout>
    )
}
