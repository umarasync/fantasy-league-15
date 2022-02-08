// Components
import Div from "components/html/Div";
import Image from "components/html/Image";
import Text from "components/html/Text";

// Constants
import {STATUS_INJURED, STATUS_SUSPENDED} from "constants/data/filters";
import colors from "constants/colors"

// Utils
import {nFormatter, truncate} from "utils/helpers";

export default function PlayerOnPitchText({player, mt}) {

    return (
        <Div
            pr={18}
            pl={18}
            pt={4}
            pb={4}
            br={40}
            mt={mt}
            w={90}
            className={'items-center relative items-center text-center justify-center cursor-pointer primary-button-color text-white whitespace-nowrap'}
        >
            {
                player.status === STATUS_INJURED || player.status === STATUS_SUSPENDED && (
                    <Div
                        w={15}
                        h={15}
                        position={'absolute'}
                        top={0}
                        right={0}
                        br={20}
                        bg={colors.white}
                        className={'flex items-center justify-center'}
                    >
                        <Image src={`/images/${player.statusImage}`} w={10} h={10} alt={''}/>
                    </Div>
                )
            }

            <Text
                text={truncate(`${player.name}`, player.captain || player.viceCaptain ? 10 : 12)}
                fs={10}
                lh={14}
                color={colors.white}
                mb={2}
                fw={600}
            />
            <Text
                text={`${nFormatter(player.price)} ${player.position}`}
                fs={10}
                lh={14}
                color={colors.white}
            />
        </Div>
    )
}