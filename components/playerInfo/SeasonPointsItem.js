// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import BorderHorizontal from "components/borders/BorderHorizontal";

// Constants
import colors from "constants/colors";

export default function SeasonPointsItem ({
    title,
    points,
    hideBorder
}) {
    return (
        <Div>
            <Div justifyBetween>
                <Div center>
                    <Text text={title} fs={16} lh={20} color={colors.black_rock}/>
                </Div>
                <Text text={`${points}pts`} fs={16} lh={20} color={colors.black_rock} fw={600}/>
            </Div>
            { !hideBorder && <Div mt={20} mb={20}><BorderHorizontal/></Div>}
        </Div>
    )
}