// Components
import Div from "components/html/Div";
import Image from "components/html/Image";
import Text from "components/html/Text";

// Utils
import {truncate} from "utils/helpers";

// Constants
import colors from "constants/colors";

export default function PlayerName({
    player
}) {
    return (
        <Div className={'flex items-center justify-center'}>
            <Text
                text={truncate(`${player.name}`, player.captain || player.viceCaptain ? 10 : 12)}
                fs={10}
                lh={14}
                color={colors.white}
                mb={2}
                fw={600}
            />
            {
                player.captain && (
                    <Image src={'/images/captain1.png'} w={16} h={16} ml={4} alt={'captain1'}/>
                )
            }
            {
                player.viceCaptain && (
                    <Image src={'/images/vice-captain1.png'} w={16} h={16} ml={4} alt={'vice-captain1'}/>
                )
            }
        </Div>
    )
}