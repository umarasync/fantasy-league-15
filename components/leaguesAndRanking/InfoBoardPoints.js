// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import BorderHorizontal from "components/borders/BorderHorizontal";
import Animated from "components/animation/Animated";

// Constants
import colors from "constants/colors";

export default function InfoBoardPoints({
    weeklyPoints,
    totalPoints,
    toggleAnimation
}) {
    return (
        <Div className={'white-shadowed-background'} mt={32}>
            <Text text={'Champions fc'} fw={900} fst={'italic'} tt={'uppercase'} fs={22} p={24}
                  color={colors.black_rock}/>
            <BorderHorizontal/>

            <Div className={'flex justify-evenly'} pt={24} pb={24}>
                <Div w={'50%'}>
                    {
                        <Animated toggleAnimation={toggleAnimation}>
                            <Div className={'flex flex-col items-center'} mr={-25}>
                                <Text
                                    text={weeklyPoints}
                                    className={'text-froly-cerise_red'}
                                    fs={42}
                                    lh={46}
                                    mb={8}
                                    pr={10}
                                    fst={'italic'}
                                    fw={800}
                                />
                                <Text text={'Weekly points'} fs={18} color={colors.regent_grey}/>
                            </Div>
                        </Animated>
                    }
                </Div>
                <Div w={'50%'}>
                    {
                        <Animated toggleAnimation={toggleAnimation}>
                            <Div className={'flex flex-col items-center'} ml={-25}>
                                <Text text={totalPoints} fs={42} lh={46} mb={8} pr={10} fst={'italic'} fw={800}/>
                                <Text text={'Total points'} fs={18} color={colors.regent_grey}/>
                            </Div>
                        </Animated>
                    }
                </Div>

            </Div>
        </Div>
    )
}