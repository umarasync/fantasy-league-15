// Components
import Div from "components/html/Div";
import Text from "components/html/Text";

// Constants
import colors from "constants/colors";

export default function MatchProgressBar({
    value,
    total,
    title,
    rightAlign,
    w=311,
    mb= 28,
    h=26,
 }) {
    return (
        <>
            {
                rightAlign ? (
                    <Div className={'relative flex justify-end'} w={w} h={h} mb={mb}>
                        <Div position={'absolute'} w={'100%'} h={'100%'} bg={colors.link_water} br={100}/>
                        <Div position={'absolute'} w={`${value / total * 100}%`} h={'100%'} bg={colors.mandy}
                             br={100} className={'flex justify-end items-center'}
                             pr={16}
                        >
                            <Text text={value} fs={14} lh={18} fw={600} color={colors.white} mr={8} nowrap/>
                            <Text text={title} fs={14} lh={18} color={colors.white} nowrap/>
                        </Div>
                    </Div>
                ): (
                    <Div className={'relative flex'} w={w} h={h} mb={mb}>
                        <Div position={'absolute'} w={'100%'} h={'100%'} bg={colors.link_water} br={100}/>
                        <Div position={'absolute'} w={`${value / total * 100}%`} h={'100%'} bg={colors.mandy}
                             br={100} className={'flex items-center'}
                             pl={16}
                        >
                            <Text text={title} fs={14} lh={18} color={colors.white} mr={8} nowrap/>
                            <Text text={value} fs={14} lh={18} fw={600} color={colors.white} nowrap />
                        </Div>
                    </Div>
                )
            }
        </>

    )
}