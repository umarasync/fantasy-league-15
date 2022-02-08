// Components
import Username from "components/user/Username";
import Div from "components/html/Div";
import Text from "components/html/Text";

// Colors
import colors from "constants/colors";

export default function InfoBoardHead() {
    return(
        <>
            <Div mt={45}>
                <Text text={'gameweek 10'} fs={34} fw={900} fst={'italic'} tt={'uppercase'} lh={38}
                      color={colors.dark_indigo}/>
                <Div mt={8}>
                    <Text text={'Transfer deadline:'} fs={18} lh={26} color={colors.dark_indigo} className={'inline'}/>
                    <Text text={' 10 Nov, 18:45'} fs={18} lh={26} color={colors.brick_red} className={'inline'}/>
                </Div>
            </Div>
        </>
    )
}