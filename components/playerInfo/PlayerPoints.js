// Packages
import Div from 'components/html/Div'
import Text from 'components/html/Text'

// Components
import Border from "components/borders/Border";

// Constants
import {SHADOW_WHITE_SMOKE} from "constants/boxShadow";
import colors from "constants/colors"

export default function PlayerPoints({
    player
 }) {

    const { pointsInfo } = player

    return (
        <Div h={126} mt={32} ml={24} mr={24} br={12} bs={SHADOW_WHITE_SMOKE} className={'flex items-center'}>
            <Div w={'33.3%'} className={'flex flex-col items-center'}>
                <Text text={pointsInfo.previousWeekPoints} fst={'italic'} fw={800} fs={28} lh={32} color={colors.black_rock}/>
                <Text text={'Previous week'} fs={14} lh={16} mt={6} color={colors.regent_grey}/>
                <Text text={'points'} fs={14} lh={16} color={colors.regent_grey}/>
            </Div>
            <Div w={'33.3%'} className={'flex items-center justify-center'}>
                <Border/>
                <Div className={'flex flex-col items-center'} ml={44} mr={45}>
                    <Text text={pointsInfo.weeklyPoints} fst={'italic'} fw={800} fs={28} lh={32} pr={5} className={'text-froly-cerise_red'}/>
                    <Text text={'Weekly'} fs={14} lh={16} mt={6} color={colors.regent_grey}/>
                    <Text text={'points'} fs={14} lh={16} color={colors.regent_grey}/>
                </Div>
                <Border/>
            </Div>
            <Div w={'33.3%'} className={'flex flex-col items-center'}>
                <Text text={pointsInfo.totalPoints} fst={'italic'} fw={800} fs={28} lh={32} color={colors.black_rock}/>
                <Text text={'Total'} fs={14} lh={16} mt={6} color={colors.regent_grey}/>
                <Text text={'points'} fs={14} lh={16} color={colors.regent_grey}/>
            </Div>
        </Div>
    )
}