// Components
import Layout from "components/layout";

export default function ConfirmAccount() {
    return (
        <Layout title="Confirm Your Account">
            <div className="bg-[url('/images/bg_full.png')] bg-[length:100%_100%] h-screen bg-no-repeat pt-[6.2rem]">
                <div className="flex flex-col items-center">
                    <img src="/images/logo_white.png" alt="" className="w-[23rem] h-[5.6rem] mb-[14rem]"/>
                    <img src="/images/check_red.png" alt="" className="w-[8rem] h-[8rem] mb-[4rem]"/>
                    <p className="text-white font-[800] leading-[5.4rem] text-[5rem] italic uppercase">confirm your account</p>
                    <p className="text-[1.8rem] leading-[2.6rem] normal text-center text-regent_grey mt-[2.4rem]">Thanks for signing up!
                        <br/>
                        Visit your email (<span className="text-white">martine.bakker@gmail.com</span>) and use a link
                        <br/>we've sent you to activate your account
                    </p>
                </div>
            </div>
        </Layout>
    )
}
