// Components
import Text from "components/html/Text";
import Image from "components/html/Image";
import Div from "components/html/Div";

// Constants
import colors from "constants/colors";

export default function Username({
    username,
    iConW = 18,
    iconH = 18,
    iconSrc = '/images/person.png'
 }) {

    return (
        <Div className={'inline-flex items-center justify-center'}>
            <Text
                text={username}
                fs={14}
                lh={18}
                mr={5}
                color={colors.regent_grey}
            />
            <Image
                src={iconSrc}
                w={iConW}
                h={iconH}
            />
        </Div>
    )
}