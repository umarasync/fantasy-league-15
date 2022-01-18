// Packages
import {useState} from "react";

// Components
import AllPlayersOnField from "components/player/AllPlayersOnField";
import Div from 'components/html/Div'
import Text from "components/html/Text";
import MatchBoard from "components/mySquad/MatchBoard";
import SelectedSquadOnPitch from 'components/mySquad/SelectedSquadOnPitch'

// Utils
import R from "utils/getResponsiveValue";
import {isEmpty} from "utils/helpers";

// Constants
import colors from "constants/colors";

// Styles
const getStyles = (R) => {
    return {
        container: {
            paddingTop: R(34),
            paddingLeft: R(81.26),
            paddingRight: R(81.26),
            // paddingBottom: R(150),
            // paddingBottom: R(950),
            paddingBottom: R(40),
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
        },
        subHeading: {
            fontSize: R(18),
            lineHeight: R(26, 'px'),
            marginTop: R(20)
        },
        fieldImage: {
            width: R(610),
            height: R(621),
            marginTop: R(44),
        }
    }
}
export default function MySquadLeftSection({
     pickedPlayers,
     autoPickDisabled,
     onPlayerChange,
     transferInProgress
 }) {

    const TOTAL_POINTS = 'Total pts'
    const PRICES = 'Price'
    const MATCHES = 'Matches'

    const [currentActiveButton, setCurrentActiveButton] = useState(TOTAL_POINTS)

    const STYLES =  { ... getStyles(R) }

    const handleClick = (v) => setCurrentActiveButton(v)


    return (
        <div className="bg-[url('/images/bg_my_squad.png')] bg-[length:100%_100%] bg-no-repeat  w-full h-full"
             style={STYLES.container}>
            <div className="" style={STYLES.logo}>
                <img src="/images/logo_white.png" alt="" width="100%" height="100%"/>
            </div>

            <Div center mt={64}>
                <Div className={'bg-red-200 inline-flex'} pl={20} pr={20} br={100} bg={colors.gloomy_blue}>
                    <Text text={TOTAL_POINTS} pt={14} pb={14} fs={16} lh={20} fw={600} cursor='pointer' color={colors.white} onClick={() => handleClick(TOTAL_POINTS)} />
                    <Text text={'Price'} pt={14} pb={14} ml={40} mr={40} fs={16} lh={20} cursor='pointer' fw={600} color={colors.white} onClick={() => handleClick(PRICES)} />
                    <Text text={'Matches'} pt={14} pb={14} fs={16} lh={20} fw={600} cursor='pointer' color={colors.white} onClick={() => handleClick(MATCHES)} />
                </Div>
            </Div>

            <div className={'flex items-center justify-center'}>
                <div style={STYLES.fieldImage}>
                    <div className="bg-[url('/images/field1.png')] bg-[length:100%_100%] bg-no-repeat h-full w-full" >
                        {
                            !pickedPlayers.length && (
                                <SelectedSquadOnPitch
                                    transferInProgress={transferInProgress}
                                    pickedPlayers={pickedPlayers}
                                    autoPickDisabled={autoPickDisabled}
                                    onPlayerChange={onPlayerChange}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
            <Div mt={115}>
                <MatchBoard/>
            </Div>
        </div>
    )
}