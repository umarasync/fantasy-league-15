// Packages
import {useDispatch, useSelector} from "react-redux";
import {motion, AnimatePresence} from "framer-motion";

// Components
import Div from "components/html/Div";
import BackDrop from "components/misc/BackDrop";
import ProfileSettingsHeader from "components/profileSettings/ProfileSettingsHeader";
import EditPersonalInfoSettings from "components/profileSettings/EditPersonalInfoSettings";
import EditPasswordSettings from "components/profileSettings/EditPasswordSettings";
import EditEmailSettings from "components/profileSettings/EditEmailSettings";
import EditClubSettings from "components/profileSettings/EditClubSettings";

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
        },
        body: {
            flexGrow: 1,
            overflow: 'scroll',
            paddingBottom: R(20),
        }
    }
}
export default function ProfileSettingsSideDrawer({
    containerStyle
}){

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
                            style={{...STYLES.container, ...containerStyle}}
                            className={'flex flex-col justify-between'}
                        >
                            <Div ml={40} mr={40}>
                                <ProfileSettingsHeader handleToggleSideDrawer={handleToggleSideDrawer}/>
                            </Div>
                            <Div style={STYLES.body}>
                                <Div mb={40}/>

                                {/*Personal-Settings*/}
                                <Div bs={SHADOW_WHITE_SMOKE} bg={colors.white} h={390} p={24} br={12} ml={40} mr={40} mb={24}>
                                    <EditPersonalInfoSettings/>
                                </Div>

                                {/*Club-Selection*/}
                                <Div bs={SHADOW_WHITE_SMOKE} bg={colors.white} h={455} p={24} br={12} ml={40} mr={40} mb={24} mt={24}>
                                    <EditClubSettings/>
                                </Div>

                                {/*Email-Settings*/}

                                <Div bs={SHADOW_WHITE_SMOKE} bg={colors.white} h={400} p={24} br={12} ml={40} mr={40} mb={24} mt={24}>
                                    <EditEmailSettings/>
                                </Div>

                                {/*Password-Settings*/}
                                <Div bs={SHADOW_WHITE_SMOKE} bg={colors.white} h={495} p={24} br={12} ml={40} mr={40}
                                     mb={24} mt={24}>
                                    <EditPasswordSettings/>
                                </Div>
                            </Div>
                        </motion.div>
                    </AnimatePresence>
                ) : <AnimatePresence/>
            }
        </>

    )
}