// Components
import Div from "components/html/Div";
import Image from "components/html/Image";
import Text from "components/html/Text";

// Constants
import colors from "constants/colors";
export default function EditSuccessBox({
    title,
}){
    return (
        <Div h={'100%'} w={'100%'} className={'flex flex-col items-center justify-center'}>
            <Image src={'/images/check_red.png'} h={80} w={80} alt={'check_red'}/>
            <Text
                text={title}
                fs={22}
                lh={26}
                fw={900}
                fst={'italic'}
                tt={'uppercase'}
                color={colors.black_rock}
                textAlign={'center'}
                mt={24}
            />
        </Div>
    )
}