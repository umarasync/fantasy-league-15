import PointsBoostModalContent from "components/playerInfo/PointsBoostModalContent";

export default function BenchBoostModal({
    players,
    show,
    onCancel,
    onConfirmed,
}) {
    return (
        <PointsBoostModalContent
            title={'Bench boost'}
            heading={`The points scored by your bench players in the next Gameweek are included in your total.`}
            subHeading={'(can be used once a season)'}
            players={players}
            show={show}
            onCancel={onCancel}
            onConfirmed={onConfirmed}
        />
    )
}