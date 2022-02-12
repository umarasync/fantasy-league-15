// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";

// Constants
import colors from "constants/colors";

export default function ProfileSettingsHeader({
     handleToggleSideDrawer
 }) {
    return (
        <Div className={'flex items-center justify-between'}>
            <Text
                text={'Account settings'}
                fs={28}
                lh={32}
                fw={900}
                tt={'uppercase'}
                fst={'italic'}
                color={colors.black_rock}
            />
            <Image src={'/images/close_rounded.png'} w={32} h={32}
                   onClick={handleToggleSideDrawer} alt={'close_rounded'}/>
        </Div>
    )
}