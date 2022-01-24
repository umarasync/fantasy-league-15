import PointsBoostModalContent from "components/playerInfo/PointsBoostModalContent";

export default function TripleCaptainModal({
    player,
    show,
    onCancel,
    onConfirmed,
}) {

    return (
        <PointsBoostModalContent
            title={'Triple captain'}
            heading={`The captain's points will be tripled. You will not be able to change the choice.`}
            subHeading={`(can be used once a season)`}
            players={player}
            show={show}
            onCancel={onCancel}
            onConfirmed={onConfirmed}
        />
    )
}