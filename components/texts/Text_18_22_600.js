// Components
import Text from "components/html/Text"

// Constants
import colors from "constants/colors";

export default function Text_18_22_600({
    title,
    color = colors.black_rock,
    textAlign = 'left',
    fw= 600
}) {
    return (
        <Text text={title} fs={18} lh={22} fw={fw} color={color} textAlign={textAlign}/>
    )
}