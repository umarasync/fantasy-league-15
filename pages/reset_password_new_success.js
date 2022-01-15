// Packages
import {useRouter} from "next/router";

// Components
import Layout from "components/layout";
import Button from "components/html/Button";

export default function ResetPasswordSuccess() {
    const router = useRouter()
    return (
        <Layout title="Confirm Your Account">
            <div className="flex justify-center bg-[url('/images/bg_full.png')] bg-[length:100%_100%] h-screen bg-no-repeat pt-[6.2rem]">
                <div className="flex flex-col items-center">
                    <img src="/images/logo_white.png" alt="" className="w-[23rem] h-[5.6rem] mb-[14rem]"/>
                    <img src="/images/check_red.png" alt="" className="w-[8rem] h-[8rem] mb-[4rem]"/>
                    <p className="text-white font-[800] leading-[4rem] text-[3.2rem] italic uppercase text-center mb-[2.4rem]">
                        You’ve successfully <br/>created new password!
                    </p>
                    <p className="text-[1.8rem] leading-[2.6rem] normal text-center text-lavender_grey mb-[6rem]">
                        Now you can sign in to your account using <br/>your new password
                    </p>
                    <Button title={'SIGN IN'} onClick={() => router.push('/sign_in')} />
                </div>
            </div>
        </Layout>
    )
}
