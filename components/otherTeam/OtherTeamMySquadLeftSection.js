// Packages
import {useRouter} from "next/router";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";
import OtherTeamSelectedSquadOnPitch from "components/otherTeam/OtherTeamSelectedSquadOnPitch";
import OtherTeamGameWeeksSlider from "components/otherTeam/OtherTeamGameWeeksSlider";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

export default function OtherTeamMySquadLeftSection({
   pickedPlayers,
   playersFormationAnimation,
   onSelectWeek,
   otherTeamData
}) {

    const router = useRouter()

    const onBackClick = () => {
        router.push('/league_inner')
    }

    return (
        <Div
            pt={34}
            pb={136}
            pl={81.26}
            pr={81.26}
            className="bg-[url('/images/bg_my_squad.png')] bg-[length:100%_100%] bg-no-repeat w-full h-full"
            style={{minHeight: R()}}
        >
            <Image src={'/images/logo_white.png'} w={164} h={40} alt={'logo_white'}/>
            <Div className={'flex items-center'} mt={50}>
                <Image
                    src={'/images/arrow_backward.png'}
                    w={32}
                    h={32}
                    mt={-7}
                    cursor={'pointer'}
                    alt={'arrow_backward'}
                    onClick={onBackClick}
                />
                <Div className={'flex flex-col'} ml={17}>
                    <Text
                        text={'klopps and robbers'}
                        fs={42}
                        lh={46}
                        fw={900}
                        fst={'italic'}
                        tt={'uppercase'}
                        color={colors.white}
                        mb={8}
                    />
                </Div>
            </Div>
            <Div mt={40} mb={50}>
                <OtherTeamGameWeeksSlider
                    onSelectWeek={onSelectWeek}
                    otherTeamDataInitial={otherTeamData}
                />
            </Div>
            <div className={'flex items-center justify-center'}>
                <Div w={610} h={621}>
                    <div className="bg-[url('/images/field2.png')] bg-[length:100%_100%] bg-no-repeat h-full w-full">
                        {
                            pickedPlayers.length ? (
                                <OtherTeamSelectedSquadOnPitch
                                    playersFormationAnimation={playersFormationAnimation}
                                    pickedPlayers={pickedPlayers}
                                />
                            ) : null
                        }
                    </div>
                </Div>
            </div>
        </Div>
    )
}