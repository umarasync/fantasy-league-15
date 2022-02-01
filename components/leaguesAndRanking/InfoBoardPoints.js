// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import BorderHorizontal from "components/Borders/BorderHorizontal";

// Constants
import colors from "constants/colors";

export default function InfoBoardPoints() {
    return (
        <Div className={'white-shadowed-background'} mt={32}>
            <Text text={'Champions fc'} fw={900} fst={'italic'} tt={'uppercase'} fs={22} p={24}
                  color={colors.black_rock}/>
            <BorderHorizontal/>

            <Div className={'flex justify-evenly'} pt={24} pb={24}>
                <Div className={'flex flex-col items-center'}>
                    <Text text={40} className={'text-froly-cerise_red'} fs={42} lh={46} mb={8} pr={10} fst={'italic'}
                          fw={800}/>
                    <Text text={'Weekly points'} fs={18} color={colors.regent_grey}/>
                </Div>
                <Div className={'flex flex-col items-center'}>
                    <Text text={813} fs={42} lh={46} mb={8} pr={10} fst={'italic'} fw={800}/>
                    <Text text={'Total points'} fs={18} color={colors.regent_grey}/>
                </Div>
            </Div>
        </Div>
    )
}