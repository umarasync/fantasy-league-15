// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

// Styles
const getStyles = (R) => {
    return {
        icon: {
            width: R(71),
            height: R(50),
            paddingLeft: R(20),
            paddingRight: R(20),
            paddingTop: R(15),
            paddingBottom: R(15),
            border: `1px solid ${colors.link_water}`,
            borderRadius: R(12),
        }
    }
}

export default function FilterIcon ({
    showAllFilters,
    onClick
}) {

    const STYLES =  { ... getStyles(R) }

    return (
        <div className={'flex items-center justify-center cursor-pointer'} onClick={onClick} style={STYLES.icon}>
            <img src={`/images/${showAllFilters ? 'filter_icon_red.png': 'filter_icon_black.png'}`} alt="" width={'100%'} height={'100%'}/>
        </div>
    )
}