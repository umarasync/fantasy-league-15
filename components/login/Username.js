// Constants
import colors from "constants/colors";

// Utils
import R from "utils/getResponsiveValue";

const getStyles = (R) => {
    return {
        username: {
            color: colors.regent_grey,
            fontSize: R(14),
            marginRight: R(5)
        },
        person: {
            width: R(18.2),
            height: R(18.2)
        }
    }
}

export default function Username({
     username
 }) {

    const STYLES =  { ... getStyles(R) }

    return (
        <div className={'flex'}>
            <p style={STYLES.username}>{username}</p>
            <div style={STYLES.person}><img src="/images/person.png" alt="" width={'100%'} height={'100%'}/></div>
        </div>
    )
}