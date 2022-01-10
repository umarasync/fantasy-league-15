// Components
import Image from "components/html/Image";
import Text from "components/html/Text";
import Div from "components/html/Div";

// Constants
import colors from "constants/colors";

export default function LeagueCard() {
    return (
        <Div className={'w-full flex items-center justify-between'}>
            <Div className={'flex'}>
                <Image w={42} h={42} name={'club_ajax.png'}/>
                <Div ml={12}>
                    <Text text={'Eredivisie league'} fs={18} fw={'600'} lh={22} color={colors.dark_indigo} mb={4}/>
                    <Text text={'1.2m Members'} fs={12} fw={'600'} lh={16} color={colors.regent_grey}/>
                </Div>
            </Div>
            <Div className={'flex items-center'}>
                <Text text={'8413'} fs={22} fw={'600'} lh={26} color={colors.mandy}/>
                <Div>
                    <Image w={16} h={16} name={'right_arrow.png'} pl={16.5}/>
                </Div>
            </Div>
        </Div>
    )
}