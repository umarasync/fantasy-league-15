// Components
import Div from "components/html/Div";
import Image from "components/html/Image";
import Text from "components/html/Text";

// Constants
import colors from "constants/colors";

export default function PlayerInfoControls({
    icon,
    heading,
    subHeading,
    action,
}) {
    return (
        <Div
            w={110}
            h={100}
            br={12}
            // ml={index ? 10 : 0}
            ml={5}
            mr={5}
            bg={colors.white}
            cursor={action && 'pointer'}
            onClick={action}
            className={'box-shadow-electric-indigo flex items-center justify-center flex-col'}
        >
            <Image src={`/images/${icon}`} w={24} h={24}/>
            <Text text={heading} fs={14} lh={16} mt={10} color={colors.regent_grey}/>
            <Text text={subHeading} fs={14} lh={16} color={colors.regent_grey}/>
        </Div>
    )
}