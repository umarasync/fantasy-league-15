// Components
import Text from "components/html/Text";
import Div from "components/html/Div";

// Constants
import colors from "constants/colors"
import {getLastTeamRank} from "constants/data/leaguesGameWeeks";

// Utils
import {SHADOW_WHITE_SMOKE} from "constants/boxShadow";

export default function LeagueBoardLastRank() {

    const { teamName, weeklyPoints, totalPoints } = getLastTeamRank()

    return (
        <Div
            bg={colors.white}
            bs={SHADOW_WHITE_SMOKE}
            br={12}
            mt={10}
            pl={40}
            pr={40}
        >
            <Div className={'flex items-center'} pt={24} pb={24}>
                <Div w={'70%'}>
                    <Text text={`2138. ${teamName}`} fs={22} lh={26}
                          fw={900}
                          fst={'italic'}
                          tt={'uppercase'}
                          className={'text-froly-cerise_red'}
                    />
                </Div>
                <Div w={'15%'} center>
                    <Text text={weeklyPoints} fs={24} lh={28} fw={600}
                          className={'text-froly-cerise_red'}
                    />
                </Div>
                <Div w={'15%'} textAlign={'right'}>
                    <Text text={totalPoints} fs={24} lh={28} fw={600}
                          className={'text-froly-cerise_red'}/>
                </Div>
            </Div>
        </Div>
    )
}