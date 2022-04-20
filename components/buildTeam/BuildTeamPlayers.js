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

  /**** Global States ****/
  const user = useSelector(({ auth }) => auth.user);
  const totalBudget = useSelector(({ fantasyTeam }) => fantasyTeam.totalBudget);
  const teamAlreadyExists = user.fantasyTeamId;

  /**** Squad Info ****/
  const squadInfoInitialState = {
    squad: clone(SELECTED_PLAYERS),
    clubsCount: {},
    remainingBudget: totalBudget,
    totalChosenPlayers: 0,
  };
  const [squadInfo, setSquadInfo] = useState(squadInfoInitialState);

  /*****
   * playersData: It can be more or less when filters get applied
   * playersDataInitial: It will always contain all players
   * *****/
  const [playersData, setPlayersData] = useState([]);
  const [playersDataInitial, setPlayersDataInitial] = useState([]);

  /**** Transfer Info ****/
  const transferInfoInitialState = {
    noOfFreeTransfersLeft: null,
    isOneFreeTransferWindow: false,
    transferInProgress: false,
    additionalTransferredPlayers: 0,
    currentTransferredToBePlayer: {},
    transferResetDisabled: true,
    transferConfirmDisabled: true,
    transferredPlayers: [],
  };
  const [transferInfo, setTransferInfo] = useState(transferInfoInitialState);

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
    setTransferInfo({ ...transferInfo, transferInProgress: true });
    return playerTransferDeselectHandler({
      transferInfo,
      squadInfo,
      setSquadInfo,
      playersDataInitial,
      setPlayersDataInitial,
    });
  };

  useEffect(() => {
    const { currentTransferredToBePlayer, transferInProgress } = transferInfo;
    if (
      isEmpty(currentTransferredToBePlayer) ||
      currentTransferredToBePlayer.position === null ||
      transferInProgress
    )
      return;
    executeTransferPlayerDeselect();
  }, [transferInfo.currentTransferredToBePlayer]);

  const handleTransferPlayerDeselect = (position, i) => {
    setTransferInfo({
      ...transferInfo,
      setCurrentTransferredToBePlayer: { position: position, index: i },
    });
  };

  // Player-Transfer-Player-Selection
  const handleTransferPlayerSelection = (player) => {
    playerTransferSelectionHandler({
      player,
      // Transfer Info
      transferInfo,
      setTransferInfo,
      // Players-Data
      playersDataInitial,
      setPlayersDataInitial,
      // Squad info
      squadInfo,
      setSquadInfo,
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
        // Squad info
        setSquadInfo,
        // Budget
        remainingBudget: totalBudget - user.fantasyTeamValue,
        // Players-Data
        setPlayersData,
        playersDataInitial: players,
        setPlayersDataInitial,
        // Transfer Window
        freeTransfers: user.freeTransfers,
        // Transfer Info
        transferInfo,
        setTransferInfo,
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

  const {
    isOneFreeTransferWindow,
    noOfFreeTransfersLeft,
    transferResetDisabled,
    transferConfirmDisabled,
    additionalTransferredPlayers,
    transferredPlayers,
  } = transferInfo;

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
