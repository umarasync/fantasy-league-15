// Packages
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

export default function BuildTeamPlayers({ players, clubs }) {
  const dispatch = useDispatch();

  // Global States
  const user = useSelector(({ auth }) => auth.user);
  const totalBudget = useSelector(({ fantasyTeam }) => fantasyTeam.totalBudget);
  const teamAlreadyExists = user.fantasyTeamId;

  const squadInfoInitialState = {
    squad: clone(SELECTED_PLAYERS),
    clubsCount: {},
    remainingBudget: totalBudget,
    totalChosenPlayers: 0,
  };
  // Squad Info
  const [squadInfo, setSquadInfo] = useState(squadInfoInitialState);

  /*****
   * playersData can be more or less when filter runs
   * playersDataInitial will always contain all players
   * *****/
  const [playersData, setPlayersData] = useState([]);
  const [playersDataInitial, setPlayersDataInitial] = useState([]);

  // States-for-Player-Transfer
  const [noOfFreeTransfersLeft, setNoOfFreeTransfersLeft] = useState("");
  const [isOneFreeTransferWindow, setIsOneFreeTransferWindow] = useState(false);
  const [transferInProgress, setTransferInProgress] = useState(false);
  const [currentTransferredToBePlayer, setCurrentTransferredToBePlayer] =
    useState({});
  const [additionalTransferredPlayers, setAdditionalTransferredPlayers] =
    useState(0);
  const [transferResetDisabled, setTransferResetDisabled] = useState(true);
  const [transferConfirmDisabled, setTransferConfirmDisabled] = useState(true);
  const [transferredPlayers, setTransferredPlayers] = useState([]);
  const [showTransferWindowModal, setShowTransferWindowModal] = useState(false);

  // Player-Selection
  const handlePlayerSelection = (player) => {
    return playerSelectionHandler({
      // Player
      player,
      // Squad info
      squadInfo,
      setSquadInfo,
      // Players data initial
      playersDataInitial,
      setPlayersDataInitial,
    });
  };

  // Player-Deselection
  const handlePlayerDeselection = (position, i) => {
    return playerDeselectionHandler({
      // Position
      position,
      i,
      // Squad info
      squadInfo,
      setSquadInfo,
      // Players data initial
      playersDataInitial,
      setPlayersDataInitial,
    });
  };

  // Player-Transfer-Player-Deselection
  const executeTransferPlayerDeselect = () => {
    setTransferInProgress(true);
    return playerTransferDeselectHandler({
      position: currentTransferredToBePlayer.position,
      i: currentTransferredToBePlayer.index,
      squadInfo,
      setSquadInfo,
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
      squadInfo,
      setSquadInfo,
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
        setSquadInfo,
        // Budget
        remainingBudget: totalBudget - user.fantasyTeamValue,
        // Players-Data
        setPlayersData,
        playersDataInitial: players,
        setPlayersDataInitial,
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
      });
    }
  };

  const runInitialSettingsForBuildYourTeam = () => {
    initialSettingsForBuildYourTeam({
      squadInfo,
      players,
      setPlayersData,
      setPlayersDataInitial,
    });
  };

  useEffect(() => {
    if (teamAlreadyExists) {
      return runInitialSettingsForTransferWindows();
    }
    runInitialSettingsForBuildYourTeam();
  }, [players]);

  return (
    <Layout title="Build Team All Player" showToast={true}>
      <div className="mx-auto flex bg-white">
        {/*Left-Section*/}
        <div className="w-[57%]">
          <BuildTeamLeftSection
            isOneFreeTransferWindow={isOneFreeTransferWindow}
            squadInfo={squadInfo}
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

        <FooterBar
          // Players
          players={players}
          squadInfo={squadInfo}
          setSquadInfo={setSquadInfo}
          squadInfoInitialState={squadInfoInitialState}
          setPlayersDataInitial={setPlayersDataInitial}
          // Transfer-Window
          isOneFreeTransferWindow={isOneFreeTransferWindow}
          noOfFreeTransfersLeft={noOfFreeTransfersLeft}
          transferResetDisabled={transferResetDisabled}
          transferConfirmDisabled={transferConfirmDisabled}
          onTransferResetClick={onTransferResetClick}
          onTransferConfirmClick={onTransferConfirmClick}
          additionalTransferredPlayers={additionalTransferredPlayers}
        />

        <TransferWindowModal
          showTransferWindowModal={showTransferWindowModal}
          setShowTransferWindowModal={setShowTransferWindowModal}
          transferredPlayers={transferredPlayers}
          // Additional Data
          squadInfo={squadInfo}
          additionalTransferredPlayers={additionalTransferredPlayers}
        />
      </div>
    </Layout>
  );
}
