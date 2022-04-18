// Packages
import {useDispatch, useSelector} from "react-redux";

// Components
import PointsBoostModalContent from "components/playerInfo/PointsBoostModalContent";

// Utils
import {handleBenchBoost} from "utils/chipBoosterHelper";

// Constants
import {BOOST_TYPE_TRIPLE_CAPTAIN} from "constants/universalConstants";

export default function TripleCaptainModal({
    showTripleCaptainModal,
    setShowTripleCaptainModal,
    player,
}) {

    const dispatch = useDispatch()

      // Global States
      const user = useSelector(({ auth }) => auth.user);

    const handleTripleCaptainConfirmed = async () => {
        await handleBenchBoost({
            boostType: BOOST_TYPE_TRIPLE_CAPTAIN,
            dispatch,
            user,
            setShowModal: setShowTripleCaptainModal
        })
    }

    return (
        <PointsBoostModalContent
            title={'Triple captain'}
            heading={`The captain's points will be tripled. You will not be able to change the choice.`}
            subHeading={`(can be used once a season)`}
            players={player}
            show={showTripleCaptainModal}
            onCancel={() => setShowTripleCaptainModal(false)}
            onConfirmed={handleTripleCaptainConfirmed}
        />
    )
}