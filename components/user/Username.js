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
     iconStyle
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
            />

            <div style={{...STYLES.person, ...iconStyle}}>
                <img
                    src="/images/person.png" alt="" width={'100%'}
                                                               height={'100%'}/></div>

            {/*<p style={STYLES.username}>{username}</p>*/}
            {/*<div style={{...STYLES.person, ...iconStyle}}><img src="/images/person.png" alt="" width={'100%'} height={'100%'}/></div>*/}

        </div>
    )
}