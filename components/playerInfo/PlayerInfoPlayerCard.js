// Components
import PlayerImage from "components/player/PlayerImage";
import Border from "components/borders/Border";
import Div from "components/html/Div";
import Image from "components/html/Image";
import Text from "components/html/Text";

// Constants
import colors from "constants/colors";
import {SHADOW_WHITE_SMOKE} from "constants/boxShadow";

export default function PlayerInfoPlayerCard({
       player,
       mt
}) {

    return (
        <Div
            className={'card-box flex items-center justify-between cursor-pointer'}
            h={94}
            br={12}
            mt={mt}
            bg={colors.white}
            bs={SHADOW_WHITE_SMOKE}
        >
            {/*left side*/}
            <div className={'flex items-center'}>
                <Image alt={'info'} src={'/images/info_grey.png'} w={20} h={20} ml={20} mr={17}/>
                <Border/>
                <PlayerImage player={player} ml={16} mr={16} w={70} h={70}/>
                <div>
                    <Text text={player.name}
                          fs={18}
                          lh={22}
                          color={colors.black_rock}
                          fw={600}
                    />
                    <Div className={'flex'} mt={7}>
                        <Text text={player.nextMatch.club}
                              fs={18}
                              lh={22}
                              color={colors.black_rock}
                              fw={600}
                        />
                        <Text text={`vs ${player.nextMatch.vs}`}
                              ml={4}
                              fs={18}
                              lh={22}
                              color={colors.regent_grey}
                        />
                    </Div>
                </div>
            </div>
            {/*right side*/}
            <div className={'flex items-center'}>
                <Div mr={16}>
                    <Text text={player.formattedPrice} fs={18} lh={22} color={colors.black_rock} textAlign={'right'} fw={600}/>
                    <Text text={player.position} fs={18} lh={22} color={colors.regent_grey} textAlign={'right'}  mt={3}/>
                </Div>
                <Border/>
                <Text
                    className={'text-heliotrope-purple'}
                    text={player.points}
                    fs={22}
                    fw={600}
                    ml={16}
                    mr={34}
                />
            </div>
        </Div>
    )
}