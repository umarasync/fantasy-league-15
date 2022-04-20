// Packages
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// Components
import Layout from "components/layout";
import FooterBar from "components/footer/FooterBar";
import BuildTeamLeftSection from "components/buildTeam/BuildTeamLeftSection";
import BuildTeamRightSection from "components/buildTeam/BuildTeamRightSection";
import TransferWindowModal from "components/transferWindow/TransferWindowModal";

// Utils
import R from "utils/getResponsiveValue";
import { clone, isEmpty } from "utils/helpers";
import {
  playerSelectionHandler,
  playerDeselectionHandler,
  initialSettingsForBuildYourTeam,
} from "utils/buildYourTeamHelper";
import {
  initialSettingsForTransferWindows,
  playerTransferDeselectHandler,
  playerTransferSelectionHandler,
} from "utils/makeTransferHelper";

// Constants
import { SELECTED_PLAYERS } from "constants/data/players";

// Actions
import { getFantasyTeamById } from "redux/FantasyTeams/api";

export default function BuildTeamPlayers({ players: $players, clubs }) {
  const dispatch = useDispatch();

  // Global States
  const user = useSelector(({ auth }) => auth.user);
  const totalBudget = useSelector(({ fantasyTeam }) => fantasyTeam.totalBudget);

  const SELECTED_PLAYERS_INITIAL = clone(SELECTED_PLAYERS);

  // Picked-Players
  const [pickedPlayers, setPickedPlayers] = useState(SELECTED_PLAYERS_INITIAL);
  const [clubsForWhichPlayersPicked, setClubsForWhichPlayersPicked] = useState(
    {}
  );

  // Players States
  const [playersData, setPlayersData] = useState([]);
  const [playersDataInitial, setPlayersDataInitial] = useState([]); // contains all players

  // States-for-Player-Transfer
  const [remainingBudget, setRemainingBudget] = useState("");
  const [noOfFreeTransfersLeft, setNoOfFreeTransfersLeft] = useState("");
  const [isOneFreeTransferWindow, setIsOneFreeTransferWindow] = useState(false);
  const [showFooterBar, setShowFooterBar] = useState(false);
  const [transferInProgress, setTransferInProgress] = useState(false);
  const [currentTransferredToBePlayer, setCurrentTransferredToBePlayer] =
    useState({});
  const [additionalTransferredPlayers, setAdditionalTransferredPlayers] =
    useState(0);
  const [transferResetDisabled, setTransferResetDisabled] = useState(true);
  const [transferConfirmDisabled, setTransferConfirmDisabled] = useState(true);
  const [transferredPlayers, setTransferredPlayers] = useState([]);
  const [showTransferWindowModal, setShowTransferWindowModal] = useState(false);

  // Footer Bar States
  const [totalChosenPlayers, setTotalChosenPlayers] = useState(0);

  // Player-Selection
  const handlePlayerSelection = (player) => {
    return playerSelectionHandler({
      // Player
      player,
      playersDataInitial,
      setPlayersDataInitial,
      totalChosenPlayers,
      setTotalChosenPlayers,
      pickedPlayers,
      setPickedPlayers,
      clubsForWhichPlayersPicked,
      setClubsForWhichPlayersPicked,
      // Budget
      remainingBudget,
      setRemainingBudget,
    });
  };

  // Player-Deselection
  const handlePlayerDeselection = (position, i) => {
    return playerDeselectionHandler({
      position,
      i,
      pickedPlayers,
      setPickedPlayers,
      remainingBudget,
      setRemainingBudget,
      totalChosenPlayers,
      setTotalChosenPlayers,
      playersDataInitial,
      setPlayersDataInitial,
      clubsForWhichPlayersPicked,
      setClubsForWhichPlayersPicked,
    });
  };

  // Player-Transfer-Player-Deselection
  const executeTransferPlayerDeselect = () => {
    setTransferInProgress(true);
    return playerTransferDeselectHandler({
      position: currentTransferredToBePlayer.position,
      i: currentTransferredToBePlayer.index,
      pickedPlayers,
      setPickedPlayers,
      remainingBudget,
      setRemainingBudget,
      playersDataInitial,
      setPlayersDataInitial,
    });
  };

  useEffect(() => {
    if (
      isEmpty(currentTransferredToBePlayer) ||
      currentTransferredToBePlayer.position === null ||
      transferInProgress
    )
      return;
    executeTransferPlayerDeselect();
  }, [currentTransferredToBePlayer]);

  const handleTransferPlayerDeselect = (position, i) => {
    setCurrentTransferredToBePlayer({ position: position, index: i });
  };

  // Player-Transfer-Player-Selection
  const handleTransferPlayerSelection = (player) => {
    playerTransferSelectionHandler({
      player,
      // Players-Data
      playersDataInitial,
      setPlayersDataInitial,
      // Picked-Players
      pickedPlayers,
      setPickedPlayers,
      // Remaining-Budget
      remainingBudget,
      setRemainingBudget,
      // Transfer
      setTransferInProgress,
      noOfFreeTransfersLeft,
      setNoOfFreeTransfersLeft,
      additionalTransferredPlayers,
      setAdditionalTransferredPlayers,
      transferredPlayers,
      setTransferredPlayers,
      // Buttons
      setTransferResetDisabled,
      setTransferConfirmDisabled,
    });
  };

  // Player-Transfer-Reset
  const onTransferResetClick = () => {
    runInitialSettingsForTransferWindows();
  };

  // Player-Transfer-Confirm
  const onTransferConfirmClick = () => {
    setShowTransferWindowModal(true);
  };

  const runInitialSettingsForTransferWindows = async () => {
    const { success, data } = await dispatch(
      getFantasyTeamById({
        gameWeek: user.currentGameweek,
        fantasyTeamId: user.fantasyTeamId,
      })
    );
    if (success) {
      initialSettingsForTransferWindows({
        // Team Data
        squad: data,
        // Picked Players
        setPickedPlayers,
        // Budget
        remainingBudget: totalBudget - user.fantasyTeamValue,
        setRemainingBudget,
        // Players-Data
        setPlayersData,
        playersDataInitial: $players,
        setPlayersDataInitial,
        setClubsForWhichPlayersPicked,
        // Transfer Window
        freeTransfers: user.freeTransfers,
        setIsOneFreeTransferWindow,
        setTransferInProgress,
        setCurrentTransferredToBePlayer,
        setNoOfFreeTransfersLeft,
        setAdditionalTransferredPlayers,
        setTransferResetDisabled,
        setTransferConfirmDisabled,
        setTransferredPlayers,
        // Footer
        setShowFooterBar,
      });
    }
  };

  const runInitialSettingsForBuildYourTeam = () => {
    initialSettingsForBuildYourTeam({
      players: $players,
      pickedPlayers,
      setPlayersDataInitial,
      setPlayersData,
    });
  };

  const runDidMount = () => {
    /*** If team already exists run transfer window ****/
    if (user.fantasyTeamId) {
      return runInitialSettingsForTransferWindows();
    }
    runInitialSettingsForBuildYourTeam();
  };
  useEffect(() => {
    runDidMount();
  }, [$players]);

  useEffect(() => {
    runDidMount();
    setShowFooterBar(true);
    setRemainingBudget(totalBudget);
  }, []);

  console.log("1=-============", $players);

  return (
    <Layout title="Build Team All Player" showToast={true}>
      <div className="mx-auto flex bg-white">
        {/*Left-Section*/}
        <div className="w-[57%]">
          <BuildTeamLeftSection
            isOneFreeTransferWindow={isOneFreeTransferWindow}
            pickedPlayers={pickedPlayers}
            onDeselectPlayer={
              isOneFreeTransferWindow
                ? handleTransferPlayerDeselect
                : handlePlayerDeselection
            }
          />
        </div>
        {/*Right-Section*/}
        <div className="w-[43%] flex justify-center" style={{ minHeight: R() }}>
          <BuildTeamRightSection
            // Players Data
            playersData={playersData}
            setPlayersData={setPlayersData}
            playersDataInitial={playersDataInitial}
            // Clubs
            clubs={clubs}
            // Player Selection
            handlePlayerSelection={
              isOneFreeTransferWindow
                ? handleTransferPlayerSelection
                : handlePlayerSelection
            }
          />
        </div>
        {showFooterBar && (
          <FooterBar
            // Players
            players={$players}
            pickedPlayers={pickedPlayers}
            setPickedPlayers={setPickedPlayers}
            totalChosenPlayers={totalChosenPlayers}
            setTotalChosenPlayers={setTotalChosenPlayers}
            setPlayersDataInitial={setPlayersDataInitial}
            selectedPlayersInitial={SELECTED_PLAYERS_INITIAL}
            // Clubs Info
            setClubsForWhichPlayersPicked={setClubsForWhichPlayersPicked}
            // Budget
            totalBudget={totalBudget}
            remainingBudget={remainingBudget}
            setRemainingBudget={setRemainingBudget}
            // Transfer-Window
            isOneFreeTransferWindow={isOneFreeTransferWindow}
            noOfFreeTransfersLeft={noOfFreeTransfersLeft}
            transferResetDisabled={transferResetDisabled}
            transferConfirmDisabled={transferConfirmDisabled}
            onTransferResetClick={onTransferResetClick}
            onTransferConfirmClick={onTransferConfirmClick}
            additionalTransferredPlayers={additionalTransferredPlayers}
          />
        )}

        <TransferWindowModal
          showTransferWindowModal={showTransferWindowModal}
          setShowTransferWindowModal={setShowTransferWindowModal}
          transferredPlayers={transferredPlayers}
          // Additional Data
          remainingBudget={remainingBudget}
          additionalTransferredPlayers={additionalTransferredPlayers}
        />
      </div>
    </Layout>
  );
}
