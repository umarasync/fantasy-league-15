// Components
import Div from "components/html/Div";
import Image from "components/html/Image";
import PlayerImage from "components/player/PlayerImage";
import Text from "components/html/Text";

// Constants
import colors from "constants/colors";

export default function TransferIn({
    player
}) {
    return (
        <>
            <Div className={'flex items-center'} mb={24}>
                <Image name={'info_grey.png'} h={20} w={20} mr={35}/>
                <PlayerImage
                    w={70}
                    h={70}
                    ciw={26}
                    cih={26}
                    player={player}
                />
            </Div>
            <Div className={'flex flex-col'}>
                <Text
                    fs={18}
                    lh={22}
                    fw={600}
                    text={'O. Willson'}
                    textAlign={'right'}
                    color={colors.black_rock}
                    mb={6}
                />
                <Text
                    text={
                        <>
                            <Text inline text={`AZ`}/>
                            <Text inline text={` vs GRO`} color={colors.regent_grey}/>
                        </>
                    }
                    fs={18}
                    lh={22}
                    fw={400}
                    textAlign={'right'}
                    colo={colors.black_rock}
                    mb={6}
                />
                <Text
                    fs={18}
                    lh={22}
                    fw={600}
                    text={'€8.0m'}
                    textAlign={'right'}
                    color={colors.black_rock}
                    mb={6}
                />
                <Text
                    fs={18}
                    lh={22}
                    fw={400}
                    text={'DEF'}
                    textAlign={'right'}
                    color={colors.regent_grey}
                    mb={6}
                />
            </Div>
        </>
    )
}