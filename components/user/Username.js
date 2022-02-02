// Components
import Text from "components/html/Text";
import Image from "components/html/Image";

// Constants
import colors from "constants/colors";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        // username: {
        //     color: colors.regent_grey,
        //     fontSize: R(14),
        //     marginRight: R(5)
        // },
        person: {
            width: R(18.2),
            height: R(18.2)
        }
    }
}

export default function Username({
    username,
    iConW = 18.2,
    iconH = 18.2
 }) {

    const STYLES =  { ... getStyles(R) }

    return (
        <div className={'flex'}>
            <Text
                text={username}
                fs={14}
                lh={18}
                mr={5}
                color={colors.regent_grey}
            />
            <Image
                src={'/images/person.png'}
                w={iConW}
                h={iconH}
            />
        </div>
    )
}