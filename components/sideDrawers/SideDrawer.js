// Packages
import {useDispatch} from "react-redux";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";

// Constants
import colors from "constants/colors";

// Actions
import {toggleSideDrawer} from "redux/SideDrawer/actions";

export default function SideDrawer(){
    const dispatch = useDispatch()

    const handleToggleSideDrawer = () => {
        dispatch(toggleSideDrawer())
    }

    return (
        <Div w={540} bg={'red'} position={'fixed'} top={0} bottom={0}>
            <Text
                text={'Hello world'}
                fs={22}
                lh={26}
                fw={600}
                color={colors.black}
                onClick={handleToggleSideDrawer}
                className={'cursor-pointer'}
            >

            </Text>
        </Div>
    )
}