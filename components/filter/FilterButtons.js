// Components
import PrimaryButtonSmall from "components/buttons/PrimaryButtonSmall";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";
import { PLAYERS_POSITIONS } from "constants/data/filters"

// Styles
const getStyles = (R) => {
    return {
        position: {
            borderRadius: R(12),
            fontSize: R(16),
            paddingTop: R(8),
            paddingBottom: R(8),
            paddingLeft: R(12),
            paddingRight: R(12),
            marginRight: R(10)
        }
    }
}

export default function FilterButtons({
   activePosition,
    onClick
}) {
    const STYLES =  { ... getStyles(R) }

    const getBgColor = (positionTitle) => {
        return activePosition === positionTitle ? {} : {background: colors.lavender_grey}
    }

    return (
        <div>
            {
                PLAYERS_POSITIONS.map((position) => {
                    return (
                        <PrimaryButtonSmall
                            title={position.label}
                            containerStyle={{
                                ...STYLES.position,
                                ...getBgColor(position.label)
                            }}
                            onClick={() => onClick(position.value)}
                            key={position.value}
                        />
                    )
                })
            }

        </div>
    )
}