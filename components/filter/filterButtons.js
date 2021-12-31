// Components
import PrimaryButtonSmall from "components/buttons/PrimaryButtonSmall";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

// Styles
const getStyles = (R) => {
    return {
        button: {
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

const buttons = [
    {
        title: 'All'
    },
    {
        title: 'GK'
    },
    {
        title: 'DEF'
    },
    {
        title: 'MID'
    },
    {
        title: 'FWD'
    },
]

export default function FilterButtons({
   activeButton,
    onClick
}) {
    const STYLES =  { ... getStyles(R) }

    const getBgColor = (name) => {
        return activeButton === name ? {} : {
                background: colors.lavender_grey
            }
    }

    return (
        <div>
            {
                buttons.map((button) => {
                    return (
                        <PrimaryButtonSmall
                            title={button.title}
                            style={{
                                ...STYLES.button,
                                ...getBgColor(button.title)
                            }}
                            onClick={() => onClick(button.title)}
                            key={button.title}
                        />
                    )
                })
            }

        </div>
    )
}