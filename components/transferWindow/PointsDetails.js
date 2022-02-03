// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Border from "components/borders/Border";

// Constants
import colors from "constants/colors";

export default function PointsDetails({
    player1,
    player2
}) {

    return (
        <>
            <Div className={'flex items-center'} mb={26}>
                <Text text={player1.points} fs={30} lh={38} fw={600}
                      className={'text-froly-cerise_red'}
                      mr={24}
                />
                <Border h={70}/>
                <Text text={player2.points} fs={30} lh={38} fw={600}
                      className={'text-froly-cerise_red'}
                      ml={24}
                />
            </Div>
            <Div className={'flex flex-col items-center'}>
                <Text text={'Name'} fs={14} lh={18} color={colors.regent_grey} mb={10}/>
                <Text text={'Next match'} fs={14} lh={18} color={colors.regent_grey} mb={10}/>
                <Text text={'Price'} fs={14} lh={18} color={colors.regent_grey} mb={10}/>
                <Text text={'Position'} fs={14} lh={18} color={colors.regent_grey} mb={10}/>
            </Div>
        </>
    )
}