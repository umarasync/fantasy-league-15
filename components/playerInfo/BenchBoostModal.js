// Packages
import { useDispatch, useSelector } from "react-redux";

// Components
import PointsBoostModalContent from "components/playerInfo/PointsBoostModalContent";

// Utils
import { handleBenchBoost } from "utils/chipBoosterHelper";

// Constants
import { BOOST_TYPE_BENCH } from "constants/universalConstants";

export default function BenchBoostModal({
  players,
  showBenchBoostModal,
  setShowBenchBoostModal,
}) {
  const dispatch = useDispatch();

  // Global States
  const user = useSelector(({ auth }) => auth.user);

  const handleBenchBoostConfirmed = async () => {
    await handleBenchBoost({
      boostType: BOOST_TYPE_BENCH,
      dispatch,
      user,
      setShowModal: setShowBenchBoostModal,
    });
  };

  return (
    <PointsBoostModalContent
      title={"Bench boost"}
      heading={`The points scored by your bench players in the next Gameweek are included in your total.`}
      subHeading={"(can be used once a season)"}
      players={players}
      show={showBenchBoostModal}
      onCancel={() => setShowBenchBoostModal(false)}
      onConfirmed={handleBenchBoostConfirmed}
    />
  );
}
