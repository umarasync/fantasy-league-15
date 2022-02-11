// Packages
import {useDispatch} from "react-redux";

// Components
import Text from "components/html/Text";
import Image from "components/html/Image";
import Div from "components/html/Div";

// Constants
import colors from "constants/colors";

// Actions
import {toggleSideDrawer} from "redux/SideDrawer/actions";

export default function Username({
    username,
    iConW = 18,
    iconH = 18,
    iconSrc = '/images/person.png'
 }) {

    const dispatch = useDispatch()

    const handleToggleSideDrawer = () => {
        dispatch(toggleSideDrawer())
    }

    return (
        <Div className={'inline-flex items-center justify-center cursor-pointer'} onClick={handleToggleSideDrawer}>
            <Text
                text={username}
                fs={14}
                lh={18}
                mr={5}
                color={colors.regent_grey}
            />
            <Image
                src={iconSrc}
                w={iConW}
                h={iconH}
                alt={'userIcon'}
            />
        </Div>
    )
}