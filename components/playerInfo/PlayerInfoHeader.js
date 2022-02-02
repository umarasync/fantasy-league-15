// Components
import Div from "components/html/Div"
import Text from "components/html/Text"
import Image from "components/html/Image"
import PlayerImage from "components/player/PlayerImage";

// Constants
import colors from "constants/colors";
import PlayerInfoControls from "./PlayerInfoControls";

export default function PlayerInfoHeader ({
    player,
    onClose,
    onMakeCaptain,
    onMakeViceCaptain
}) {
    const { isSubstitutePlayer, captain, viceCaptain } = player

    return (
        <Div h={208} pt={24} pl={24} pr={24} pb={12} btlr={12} btrr={12}
             className={`relative ${isSubstitutePlayer ? 'bg-ocean__sherwood_green' : 'bg-coastline_blue-congress_blue'}`}>
            {/*close icon*/}
            <Div
                position={'absolute'}
                cursor={'pointer'}
                right={24}
                onClick={onClose}
            >
                <Image alt={'close'} src={'/images/close2.png'}/>
            </Div>

            {/*header*/}
            <Div className={'flex items-center'}>
                <PlayerImage
                    w={120}
                    h={120}
                    ciw={44}
                    cih={44}
                    player={player}
                />
                <Div ml={20}>
                    <Text text={'Naoufal'} fw={600} fs={18} lh={22} mb={2} color={colors.white}/>
                    <Text text={'Bannis'} fw={600} fs={24} lh={28} mb={6} color={colors.white}/>
                    <Text text={'PEC Zwolle • MID'} fw={'normal'} fs={18} lh={22} color={colors.link_water}/>
                </Div>
            </Div>

            {/*controls*/}
            <Div mt={24} className={'flex items-center justify-center'}>
                <PlayerInfoControls
                    heading={'Sub'}
                    subHeading={`${isSubstitutePlayer ? 'in' : 'out'}`}
                    icon={`${isSubstitutePlayer ? 'polygon_green.png' : 'polygon_red.png'}`}
                />
                <PlayerInfoControls
                    heading={'Transfer'}
                    subHeading={'out'}
                    icon={'money.png'}
                />
                {
                    !isSubstitutePlayer && (
                        <>
                            {
                                !captain && (
                                    <PlayerInfoControls
                                        heading={'Make'}
                                        subHeading={'captain'}
                                        icon={'captain.png'}
                                        action={onMakeCaptain}
                                    />
                                )
                            }

                            {
                                !viceCaptain && (
                                    <PlayerInfoControls
                                        heading={'Make'}
                                        subHeading={'vice-captain'}
                                        icon={'vice_captain.png'}
                                        action={onMakeViceCaptain}
                                    />
                                )
                            }

                        </>
                    )
                }

            </Div>
        </Div>
    )
}