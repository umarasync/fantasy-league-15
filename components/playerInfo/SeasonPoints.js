// Components
import Div from "components/html/Div";
import SeasonPointsItem from "components/playerInfo/SeasonPointsItem";

export default function SeasonPoints ({
    player
}) {
    const { seasonStats } = player
    return (
        <Div pr={30} mt={24} pl={24} pb={24}>
             <SeasonPointsItem title={`${seasonStats.minsPlayed} minutes played`} points={seasonStats.playingTimePoints}/>
             <SeasonPointsItem title={`${seasonStats.goals} goal scored`} points={seasonStats.scoringPoints}/>
             <SeasonPointsItem title={`${seasonStats.goalAssist} assists`} points={seasonStats.assistPoints} hideBorder/>
        </Div>
    )
}