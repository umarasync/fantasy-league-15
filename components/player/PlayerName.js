// Components
import Div from "components/html/Div";
import Image from "components/html/Image";

// Utils
import {truncate} from "utils/helpers";


export default function PlayerName({
    player
}) {
    return (
        <Div className={'flex items-center justify-center'}>
            <span>{truncate(`${player.name}`, player.captain || player.viceCaptain ? 10 : 12)}</span>
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