import {toast} from "react-toastify";

// Actions
import {fantasyTeamBoosterStart} from "redux/FantasyTeams/actionCreators";
import {setFantasyTeamBooster} from "redux/FantasyTeams/api";

export const handleBenchBoost = async ({
    boostType,
    dispatch,
    user,
    setShowModal,
}) => {
    dispatch(fantasyTeamBoosterStart())
    const dataInput = {
        fantasyTeamId: user.fantasyTeamId,
        gameweek: user.currentGameweek,
        type: boostType
    }
    const { success, msg } = await dispatch(setFantasyTeamBooster(dataInput))

    if (!success) { return toast.error(msg)}
    toast.success(msg);
    setShowModal(false)
}