// Components
import Text from "components/html/Text";

// Constants
import colors from "constants/colors";

const Goals = ({
    team1Goals,
    team2Goals,
    fs= 24,
    fw = 600,
    lh = 28
}) => {

    return (
        <div className={'flex'}>
            <Text
                text={team1Goals}
                fs={fs}
                fw={fw}
                lh={lh}
                color={team1Goals > team2Goals ? colors.mandy : colors.black_rock}
            />
            <Text
                text={':'}
                fs={fs}
                fw={fw}
                lh={lh}
            />
            <Text
                text={team2Goals}
                fs={fs}
                fw={fw}
                lh={lh}
                color={team2Goals > team1Goals ? colors.mandy : colors.black_rock}
            />
        </div>

    )
}

export default Goals