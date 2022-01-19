// Packages
import {useState} from "react";
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
            paddingTop: R(34),
            paddingBottom: R(220),
            minHeight: R(),
        },
        logo: {
            width: R(164),
            height: R(40),
            marginBottom: R(146),
        },
        content: {
          width: R(555)
        },
        heading: {
          fontSize: R(50),
            marginBottom: R(24),
            lineHeight: R(56, 'px')
        },

        subHeading: {
            fontSize: R(18),
            marginBottom: R(86),
            opacity: 0.7
        },
        input: {
            height: R(100),
            fontSize: R(36),
            background: 'transparent',
            color: 'white',
            border: 'none'
        },
        border: {
            border: '1px solid white',
            marginTop: R(-20),
        },
        button: {
            width: R(412),
            marginTop: R(100),
        }
    }
}

export default function ConfirmAccount() {

    const router = useRouter()

    const STYLES =  { ... getStyles(R) }

    const [teamName, setTeamName] = useState('Champions FC')

    const handleOnClick = () => {
        if(teamName) {
            router.push('/team_created')
        }
    }

    return (
        <Layout title="Create Your Team Name">
            <div className="bg-[url('/images/bg_dark_blue.png')] bg-[length:100%_100%] bg-no-repeat  w-full h-full" style={STYLES.container}>
                <div className="flex flex-col items-center justify-center">
                    <div style={STYLES.content}>
                        <div className="w-full flex items-center justify-center">
                            <div style={STYLES.logo}>
                                <img src="/images/logo_white.png" alt="" width={'100%'} height={'100%'}/>
                            </div>
                        </div>
                        <p className="text-white font-[800]  text-center italic uppercase" style={STYLES.heading}>come up with a <br/>name for your team
                        </p>
                        <p className="normal text-center text-link_water" style={STYLES.subHeading}>
                            You can edit your team name any time.
                        </p>
                        <input
                            className={'disable-input-outline font-[900] italic'} type="text"
                            style={STYLES.input}
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                        <hr className={'w-full'} style={STYLES.border}/>
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
