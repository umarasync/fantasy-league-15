// Components
import Image from "components/html/Image";
import Text from "components/html/Text";
import Div from "components/html/Div";

// Constants
import colors from "constants/colors";

// Utils
import {nFormatterWOSign} from "utils/helpers";
import Animated from "../animation/Animated";

export default function LeagueCard({
    league,
    pb = 24,
    pt = 24,
    onClick,
    toggleAnimation
}) {
    const limitToShowPlusSign = 100000
    const minLimitToShowPlusSign = 999
    const {image, name, totalMembers, points} = league

    return (
        <Div className={`w-full flex items-center justify-between ${onClick && 'cursor-pointer'}`} pb={pb} pt={pt} onClick={() => onClick ? onClick(league): false}>
            <Div className={'flex'}>
                <Image w={42} h={42} src={`/images/${image}`} alt={'league_image'}/>
                <Div ml={12}>
                    <Text text={name} fs={18} fw={'600'} lh={22} color={colors.dark_indigo} mb={4}/>
                    <Text text={
                        `${nFormatterWOSign(totalMembers)}
                            ${totalMembers < limitToShowPlusSign && totalMembers > minLimitToShowPlusSign ? '+' : ''} 
                          
                            ${totalMembers === 1 ? 'Member' : 'Members'}
                        `}
                          fs={12}
                          lh={16}
                          color={colors.regent_grey}
                    />
                </Div>
            </Div>
            <Div className={'flex items-center'}>
                <Animated toggleAnimation={toggleAnimation}>
                    <Text text={points} fs={22} fw={'600'} lh={26} color={colors.mandy} minW={70} textAlign={'right'}/>
                </Animated>
                <Image w={16} h={16} src={'/images/right_arrow.png'} pl={16.5} alt={'right_arrow'}/>
            </Div>
        </Div>
    )
}