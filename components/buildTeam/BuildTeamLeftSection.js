// Packages
import {useRouter} from "next/router";

// Components
import AllPlayersOnField from "components/player/AllPlayersOnField";
import Div from "components/html/Div";
import Text from "components/html/Text";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

// Styles
const getStyles = (R) => {
    return {
        container: {
            paddingTop: R(34),
            paddingLeft: R(81.26),
            paddingRight: R(81.26),
            paddingBottom: R(150),
            minHeight: R()
        },
        logo: {
            width: R(164),
            height: R(40),
            marginLeft: R(-10)
        },
        heading: {
            fontSize: R(42),
            lineHeight: R(46, 'px'),
        },
        textContainer:{
            paddingRight: R(50),
            marginTop: R(50)
        },
        subHeading: {
            fontSize: R(18),
            lineHeight: R(26, 'px'),
            marginTop: R(20)
        },
        fieldImage: {
            width: R(610),
            height: R(621),
            marginTop: R(40),
        }
    }
}
export default function BuildTeamLeftSection({
    pickedPlayers,
    autoPickDisabled,
    onDeselectPlayer,
    isOneFreeTransferWindow
}) {
    const router = useRouter()

    // TODO:DUMMY
    const removeTeamDataFromLocalStorage = () => {
        localStorage.removeItem('teamData')
        router.reload('/build_team_all_players')
    }

    const STYLES =  { ... getStyles(R) }

    return (
        <div className="bg-[url('/images/bg_blue_1.png')] bg-[length:100%_100%] bg-no-repeat  w-full h-full"
             style={STYLES.container}>
            <div className="" style={STYLES.logo}>
                <img src="/images/logo_white.png" alt="" width="100%" height="100%"/>
            </div>

            <div className="flex flex-col items-center" style={STYLES.textContainer}>
                <p className="uppercase font-[900] italic text-white cursor-pointer" style = {STYLES.heading} onClick={removeTeamDataFromLocalStorage}>
                    {
                        isOneFreeTransferWindow ? 'Transfers': 'make your selection'
                    }
                </p>
                {
                    isOneFreeTransferWindow && (
                        <Div mt={8} className={'flex items-center justify-center'}>
                            <Text text={`Transfer deadline:`} inline fs={18} lh={26} color={colors.lavender_grey} nowrap/>
                            <Text text={`10 Nov, 18:45`} inline ml={3} fs={18} lh={26} color={colors.hibiscus} nowrap />
                        </Div>
                    )
                }

                <p className="font-[300] text-center text-lavender_grey" style={STYLES.subHeading}>
                    Select a maximum of 3 players from a single team <br/>{`or 'Auto Pick' if you're short of time.`}
                </p>
            </div>

            <div>
                <div style={STYLES.fieldImage}>
                    <div className="bg-[url('/images/field2.png')] bg-[length:100%_100%] bg-no-repeat h-full w-full" >
                        <AllPlayersOnField
                            pickedPlayers={pickedPlayers}
                            autoPickDisabled={autoPickDisabled}
                            onDeselectPlayer={onDeselectPlayer}
                            isOneFreeTransferWindow={isOneFreeTransferWindow}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}