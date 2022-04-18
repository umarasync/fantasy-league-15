// Packages
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";

// Components
import Modal from "components/modals";
import Div from "components/html/Div"
import PlayerInfoHeader from "components/playerInfo/PlayerInfoHeader"
import PointsBoard from "components/playerInfo/PointsBoard";

// Utils
import R from "utils/getResponsiveValue";
import {CAPTAIN, makeCaptain, VICE_CAPTAIN} from "utils/mySquadHelper";

// Constants
import colors from "constants/colors";

// Actions
import {setFantasyTeamRole} from "redux/Players/api";

// Styles
const getStyles = (R) => {
    return {
        pointsBox: {
            overflowY: 'scroll',
            overflowX: 'hidden',
            marginTop: R(65),
            flexGrow: 1
        }
    }
}

export default function PlayerInfoModal({
    // Squad Info
    squadInfo,
    setSquadInfo,
    setSavedSquadInfo,
    // Modal
    showPlayerInfoModal,
    setShowPlayerInfoModal,
    // Player
    player,
}) {

    const STYLES = {...getStyles(R)}

    const dispatch = useDispatch()

    // Global States
    const user = useSelector(({ auth }) => auth.user);

    const handleCaptainChange = async (player, captainType) => {

          const squad = makeCaptain(
              {
                  squadInfo,
                  player,
                  captainType,
          })

          // Api Calling
          const inputData = {
              fantasyTeamId: user.fantasyTeamId,
              captain: { id: squad.find(p => p.captain).id }  ,
              viceCaptain: { id: squad.find(p => p.viceCaptain).id }
          }
          const {success, msg} = await dispatch(setFantasyTeamRole(inputData))

          if (!success) { return toast.error(msg); }

          toast.success(msg);
          setSquadInfo({...squadInfo, squad})
          setSavedSquadInfo({...squadInfo, squad})
          setShowPlayerInfoModal(false)
    }

    return (
        <Modal>
            <div
                className={`${!showPlayerInfoModal && 'hidden'} fixed z-50 overflow-auto top-0 left-0 w-full h-full bg-backdrop flex items-center justify-center`}>
                {
                    showPlayerInfoModal && (
                        <Div w={482} br={12} bg={colors.white} className={'h-[74%] flex flex-col'}>
                            <Div>
                                <PlayerInfoHeader
                                    player={player}
                                    onClose={() => setShowPlayerInfoModal(false)}
                                    onMakeCaptain={() => handleCaptainChange(player, CAPTAIN)}
                                    onMakeViceCaptain={() => handleCaptainChange(player, VICE_CAPTAIN)}
                                />
                            </Div>
                            <Div style={STYLES.pointsBox}>
                                <PointsBoard player={player}/>
                            </Div>
                        </Div>
                    )
                }
            </div>
        </Modal>
    )
}