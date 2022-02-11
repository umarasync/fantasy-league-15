// Packages
import {useDispatch, useSelector} from "react-redux";
import {motion, AnimatePresence} from "framer-motion";

// Components
import Text from "components/html/Text";
import Div from "components/html/Div";
import Image from "components/html/Image";
import BackDrop from "components/misc/BackDrop";

// Constants
import colors from "constants/colors";

// Actions
import {toggleSideDrawer} from "redux/SideDrawer/actions";

// Utils
import R from "utils/getResponsiveValue";

// Animations
import {getSideDrawerAnimation} from "Animations/ProfileSettings/ProfileSettingsSideDrawerAnimation";


// Styles
const getStyles = (R) => {
    return {
        container: {
            width: R(540),
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: R(-540),
            background: colors.white,
            padding: R(40)
        }
    }
}
export default function ProfileSettingsSideDrawer(){

    const STYLES = {...getStyles(R)};

    const dispatch = useDispatch()
    const showSideDrawer = useSelector(({sideDrawer}) => sideDrawer.showSideDrawer)

    const handleToggleSideDrawer = () => {
        dispatch(toggleSideDrawer())
    }

    return (
        <>
            <BackDrop show={showSideDrawer}/>
            {
                showSideDrawer ? (
                    <AnimatePresence>
                        <motion.div
                            variants={getSideDrawerAnimation()}
                            initial={"initial"}
                            animate={"animate"}
                            exit={"exit"}
                            key={1}
                            style={STYLES.container}
                        >
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
                                       onClick={handleToggleSideDrawer}/>
                            </Div>

                        </motion.div>
                    </AnimatePresence>
                ) : <AnimatePresence/>
            }
        </>

    )
}