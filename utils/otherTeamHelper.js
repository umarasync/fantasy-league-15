// Utils
import {clone} from "./helpers";

export const setInitialSettings = ({
   initialOtherTeamData,
   setOtherTeamData,
   setActiveTab,
}) => {
    const $initialOtherTeamData = clone(initialOtherTeamData)
    $initialOtherTeamData[0].active = true
    setActiveTab({
        data: {...$initialOtherTeamData[0]},
        animationChange: false
    })
    setOtherTeamData([...initialOtherTeamData])
}