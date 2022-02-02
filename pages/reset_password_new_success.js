// Packages
import {useRouter} from "next/router";

// Components
import Layout from "components/layout";
import Button from "components/html/Button";
import Image from "components/html/Image"
import Text from "components/html/Text"
import Div from "components/html/Div"

// Constants
import colors from "constants/colors"

// Utils
import R from "utils/getResponsiveValue";

export default function ResetPasswordSuccess() {
    const router = useRouter()
    return (
        <Layout title="Confirm Your Account">
            <Div
                className="flex justify-center bg-[url('/images/bg_full.png')] bg-[length:100%_100%] bg-no-repeat"
                pt={62}
                style={{minHeight: R()}}
            >
                <div className="flex flex-col items-center">
                    <Image src={'/images/logo_white.png'} alt={'logo_white'} w={231} h={56} mb={140}/>
                    <Image src={'/images/check_red.png'} alt={'check_red'} w={80} h={80} mb={40}/>
                    <Text
                        text={<span>You’ve successfully <br/>created new password!</span>}
                        fs={32} lh={40} fw={800} fst={'italic'} tt={'uppercase'}
                        textAlign={'center'}
                        color={colors.white} mb={24}
                    />
                    <Text
                        text={<span>Now you can sign in to your account using <br/>your new password</span>}
                        fs={18}
                        lh={26}
                        color={colors.lavender_grey}
                        textAlign={'center'}
                        mb={60}
                    />
                    <Button title={'SIGN IN'} onClick={() => router.push('/sign_in')} />
                </div>
            </Div>
        </Layout>
    )
}
