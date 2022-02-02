// Packages
import {useEffect, useState} from "react";

// Components
import Layout from "components/layout";
import Image from "components/html/Image"
import Text from "components/html/Text"
import Div from "components/html/Div"

// Constants
import colors from "constants/colors"

// Utils
import R from "utils/getResponsiveValue";

export default function ConfirmAccount() {
    const [userEmail, setUserEmail] = useState(false)
    useEffect(() => {
        setUserEmail(localStorage.getItem('email') ? localStorage.getItem('email'): 'Your Email Address');
}, [])
    
    return (
        <Layout title="Confirm Your Account">
            <Div
                className="bg-[url('/images/bg_full.png')] bg-[length:100%_100%] bg-no-repeat"
                style={{minHeight: R()}}
                pt={62}
            >
                <div className="flex flex-col items-center">
                    <Image src={'/images/logo_white.png'} alt={'logo_white'} w={231} h={56} mb={140}/>
                    <Image src={'/images/check_red.png'} alt={'check_red'} w={80} h={80} mb={40}/>
                    <Text text={'confirm your account'} fs={50} lh={54} fw={800} fst={'italic'} tt={'uppercase'} color={colors.white} mb={24}/>
                    <Text
                        text={<>
                            <span>Thanks for signing up!</span><br/>
                            <span>Visit your email (<span className="text-white">{userEmail}</span>) and use the link</span><br/>
                            <span>{`we've sent you to activate your account`}</span>
                        </>}
                        fs={18}
                        lh={26}
                        color={colors.regent_grey}
                        textAlign={'center'}
                    />
                </div>
            </Div>
        </Layout>
    )
}
