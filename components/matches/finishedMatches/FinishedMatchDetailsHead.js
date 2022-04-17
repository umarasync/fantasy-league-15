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
            {/*<Div w={'43.5%'}/>*/}
            <Div w={'100%'} className={'flex justify-end'}>
                {
                    matchDetails.awardedPlayers.map((item, index) => (
                        <Div key={index} className={'flex flex-col items-center'} mr={40}>
                            <PlayerImage player={item.player} w={70} h={70}/>
                            <Text
                                text={
                                    <>
                                        <Text text={item.player.matchName} inline fw={600} nowrap/>
                                        <Text text={`${item.totalPoints}pts`} inline ml={5}
                                              className={'text-froly-cerise_red'} fw={600} nowrap/>
                                    </>
                                }
                                fs={24}
                                lh={28}
                                color={colors.black_rock}
                            />
                            {
                                item.award && (
                                    <Text text={item.award} fs={12} lh={16} color={colors.regent_grey} mt={6}/>
                                )
                            }
                        </Div>
                    ))
                }
            </Div>
        </Div>
    )
}