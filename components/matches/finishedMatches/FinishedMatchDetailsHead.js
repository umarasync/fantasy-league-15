// Components
import Div from "components/html/Div";
import PlayerImage from "components/player/PlayerImage";
import Text from "components/html/Text";

// Constants
import colors from "constants/colors";

export default function FinishedMatchDetailsHead({
     matchDetails
 }) {
    return (
        <Div className={'flex'}>
            <Div w={'43.5%'}/>
            <Div w={'56.6%'} className={'flex'}>
                {
                    matchDetails.awardedPlayers.map((player, index) => (
                        <Div key={index} className={'flex flex-col items-center'} mr={40}>
                            <PlayerImage player={player.player} w={70} h={70}/>
                            <Text
                                text={
                                    <>
                                        <Text text={player.player.name} inline fw={600} nowrap/>
                                        <Text text={`${player.points}pts`} inline ml={5}
                                              className={'text-froly-cerise_red'} fw={600} nowrap/>
                                    </>
                                }
                                fs={24}
                                lh={28}
                                color={colors.black_rock}
                            />
                            {
                                player.award && (
                                    <Text text={player.award} fs={12} lh={16} color={colors.regent_grey} mt={6}/>
                                )
                            }
                        </Div>
                    ))
                }
            </Div>
        </Div>
    )
}