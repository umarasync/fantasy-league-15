// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";
import BorderHorizontal from "components/borders/BorderHorizontal";

// Constants
import colors from "constants/colors";
import PLAYER_POINTS from "constants/data/playerPoints";

export default function SeasonPoints ({
    player
}) {
    const seasonPoints = player.pointsInfo.seasonPoints
    return (
        <Div pr={30} mt={24} pl={24} pb={24}>
            {
                seasonPoints.length > 0 && seasonPoints.map((item, index) => {
                    return (
                        <Div key={index}>
                            <Div justifyBetween>
                                <Div center>
                                    {
                                        item.icon && (
                                            <Image alt={'icon'} mr={4} pt={4} src={`/images/${item.icon}`} w={18} h={18}/>
                                        )
                                    }

                                    <Text text={item.title} fs={16} lh={20} color={colors.black_rock}/>
                                </Div>
                                <Text text={`${item.points}pts`} fs={16} lh={20} color={colors.black_rock} fw={600}/>
                            </Div>
                            {
                                index !== PLAYER_POINTS.seasonPoints.length - 1 && (
                                    <Div mt={20} mb={20}><BorderHorizontal/></Div>
                                )
                            }
                        </Div>
                    )
                })
            }

        </Div>
    )
}