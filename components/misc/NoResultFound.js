// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

// Styles
const getStyles = (R) => {
    return {
        noResultFoundText: {
            fontSize: R(18),
            color: colors.regent_grey,
        }
    }
}

export default function NoResultFound({
   style
}) {

    const STYLES =  { ... getStyles(R) }

    return (
        <p className={'flex items-center justify-center text-center'} style={{...STYLES.noResultFoundText, ...style}}>⚽️ No results <br/>Try to reset your filters</p>
    )
}