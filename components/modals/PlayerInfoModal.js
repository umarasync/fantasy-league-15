// Packages
import {useRouter} from "next/router";

// Components
import Modal from "components/modals";
import Div from "components/html/Div"
import Header from "components/playerInfo/Header"
import PlayerPoints from "components/playerInfo/PlayerPoints";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";
import PointsBoard from "../playerInfo/PointsBoard";

// Styles
const getStyles = (R) => {
    return {
        pointsBox: {
            overflowY: 'scroll',
            overflowX: 'hidden',
        }
    }
}

export default function PlayerInfoModal({
   player,
   show,
   onClose
}) {
    const STYLES = {...getStyles(R)}

    return (
        <Modal>
            <div
                className={`${!show && 'hidden'} fixed z-50 overflow-auto top-0 left-0 w-full h-full bg-backdrop flex items-center justify-center`}>
                <Div w={482} br={12} bg={colors.white} className={'h-[74%]'}>
                    <Div h={'40%'}>
                        <Header player={player} onClose={onClose}/>
                    </Div>
                    <Div h={'60%'} style={STYLES.pointsBox}>
                        <PointsBoard player={player}/>
                    </Div>
                </Div>
            </div>
        </Modal>
    )
}