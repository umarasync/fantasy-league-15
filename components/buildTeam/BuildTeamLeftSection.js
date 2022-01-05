// Components
import AllPlayersOnField from "components/player/AllPlayersOnField";

// Utils
import R from "utils/getResponsiveValue";

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
        },
        heading: {
            fontSize: R(42),
            lineHeight: R(46, 'px'),
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
     autoPickedPlayers,
                                                 autoPickDisabled
}) {

    const STYLES =  { ... getStyles(R) }

    return (
        <div className="bg-[url('/images/bg-blue.png')] bg-[length:100%_100%] bg-no-repeat  w-full h-full"
             style={STYLES.container}>
            <div className="" style={STYLES.logo}>
                <img src="/images/logo_white.png" alt="" width="100%" height="100%"/>
            </div>

            <div className="mt-[5rem] flex flex-col items-center">
                <p className="uppercase font-[900] italic text-white" style = {STYLES.heading}>make your selection</p>
                <p className="font-[300] text-center text-lavender_grey" style={STYLES.subHeading}>
                    Select a maximum of 3 players from a single team <br/>{`or 'Auto Pick' if you're short of time.`}
                </p>
            </div>

            <div>
                <div style={STYLES.fieldImage}>
                    <div className="bg-[url('/images/field2.png')] bg-[length:100%_100%] bg-no-repeat h-full w-full" >
                        <AllPlayersOnField
                            autoPickedPlayers={autoPickedPlayers}
                            autoPickDisabled={autoPickDisabled}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}