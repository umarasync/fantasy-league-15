// Packages
import {useDispatch, useSelector} from "react-redux";
import {motion, AnimatePresence} from "framer-motion";

// Components
import Div from "components/html/Div";
import BackDrop from "components/misc/BackDrop";
import ProfileSettingsHeader from "components/profileSettings/ProfileSettingsHeader";
import PersonalInfo from "components/profileSettings/PersonalInfo";

// Constants
import colors from "constants/colors";
import {SHADOW_WHITE_SMOKE} from "constants/boxShadow";

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
            paddingTop: R(40),
            paddingBottom: R(40),
        },
        body: {
            flexGrow: 1,
            overflow: 'scroll'
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
                            className={'flex flex-col justify-between'}
                        >
                            <Div ml={40} mr={40}>
                                <ProfileSettingsHeader handleToggleSideDrawer={handleToggleSideDrawer}/>
                            </Div>
                            <Div style={STYLES.body}>
                                <Div mb={40}/>
                                <Div bs={SHADOW_WHITE_SMOKE} bg={colors.white} p={24} br={12} ml={40} mr={40} mb={24}>
                                    <PersonalInfo/>
                                </Div>
                            </Div>
                        </motion.div>
                    </AnimatePresence>
                ) : <AnimatePresence/>
            }
        </>

    )
}