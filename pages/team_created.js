// Packages
import {useRouter} from "next/router";

// Components
import Layout from "components/layout";
import Button from "components/html/Button";

// Utils
import R from "utils/getResponsiveValue";


// Styles
const getStyles = (R) => {
    return {
        container: {
            paddingTop: R(50),
            paddingBottom: R(220),
            minHeight: R(),
        },
        logo: {
            width: R(231),
            height: R(56),
            marginBottom: R(140),
        },
        content: {
            width: R(555)
        },
        heading: {
            fontSize: R(32),
            marginBottom: R(24),
            lineHeight: R(40, 'px')
        },
        checkIcon:{
          width: R(80),
          height: R(80),
            marginBottom: R(40)
        },
        subHeading: {
            fontSize: R(18),
            marginBottom: R(60),
            opacity: 0.7
        },
        input: {
            height: R(100),
            fontSize: R(36),
            background: 'transparent',
            color: 'white',
        },
        border: {
            border: '1px solid white',
            marginTop: R(-20),
        },
        button: {
            width: R(412),
        }
    }
}

export default function ConfirmAccount() {

    const router = useRouter()

    const STYLES =  { ... getStyles(R) }

    const handleOnClick = () => {
        router.push('/my_squad_game_week')
    }

    return (
        <Layout title="Team Created">
            <div className="bg-[url('/images/bg_full.png')] bg-[length:100%_100%] bg-no-repeat  w-full" style={STYLES.container}>
                <div className="flex flex-col items-center justify-center">
                    <div style={STYLES.content}>
                        <div className="w-full flex flex-col items-center justify-center">
                            <div style={STYLES.logo}>
                                <img src="/images/logo_white.png" alt="" width={'100%'} height={'100%'}/>
                            </div>
                            <div style={STYLES.checkIcon}>
                                <img src="/images/check_red.png" alt="" width={'100%'} height={'100%'}/>
                            </div>
                        </div>
                        <p className="text-white font-[800]  text-center italic uppercase" style={STYLES.heading}>
                            You’ve successfully <br/>created your team!

                        </p>
                        <p className="normal text-center text-link_water" style={STYLES.subHeading}>
                            {`You can change your team's players at any time`} <br/>before the first match of a new gameweek.
                        </p>
                        <div className="w-full flex items-center justify-center">
                            <div style={STYLES.button}>
                                <Button title={'CONFIRM'} onClick={handleOnClick}/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}
