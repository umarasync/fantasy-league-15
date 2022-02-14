// Packages
import React, {useState} from "react";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";

// Constants
import colors from "constants/colors";

// UTILS
import {TOTAL_POINTS, PRICES, MATCHES} from "utils/mySquadHelper";
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        backgroundSlider: {
            backgroundColor: colors.white,
            borderRadius: R(100)
        },
        container: {
            zIndex: 0
        }
    }
}

export default function MySquadFilterButtons({
  handleClick
}) {
    const STYLES =  { ... getStyles(R) }

    const [clickedButton, setClickedButton] = useState(0);
    const buttons= [TOTAL_POINTS, PRICES, MATCHES]
    const leftOffsets = ["left-0", "left-1/3", "left-2/3"];

    const getColor = (index) => {
        if(clickedButton === index) {
            return colors.black_rock
        }
        return colors.white
    }

    const onClick = (v, index) => {
        handleClick(v)
        setClickedButton(index)
    }

    return (
        <Div center mt={64}>
            <Div className={'bg-red-200 inline-flex relative'} br={100} bg={colors.gloomy_blue} style={STYLES.container}>
                <div
                    style={STYLES.backgroundSlider}
                    className={`w-1/3 top-0 absolute h-full duration-200 transition-all ${leftOffsets[clickedButton]}`}
                />
                {
                    buttons.map((button, index) => {
                        return (
                        <Text  text={button} center key={button} pt={14} pb={14} fs={16} w={103} lh={20} z={1} cursor='pointer' fw={600} color={getColor(index)} onClick={() => onClick(button, index)} />
                        )
                    })
                }
            </Div>
        </Div>
    )
}