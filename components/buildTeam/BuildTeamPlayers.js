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
  handleTransferWindowOnPlayerDataUpdate,
  initialSettingsForTransferWindows,
  playerTransferDeselectHandler,
  playerTransferSelectionHandler,
  putSquadUnderPositions,
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

  // Squad Info
  const remainingBudget = teamAlreadyExists
    ? totalBudget - user.fantasyTeamValue
    : totalBudget;
  const totalChosenPlayers = teamAlreadyExists ? 15 : 0;

  const squadInfoInitialState = {
    squad: clone(SELECTED_PLAYERS),
    clubsCount: {},
    remainingBudget,
    totalChosenPlayers,
  };

  // Transfer Info
  const noOfFreeTransfersLeft = user.freeTransfers;

  const transferInfoInitialState = {
    noOfFreeTransfersLeft,
    isOneFreeTransferWindow: teamAlreadyExists,
    additionalTransferredPlayers: 0,
    transferResetDisabled: true,
    transferConfirmDisabled: true,
    transferredPlayers: [],
    initialRendered: false,
  };

  /*****
   * playersData: It can be more or less when filters get applied
   * playersDataInitial: It will always contain all players
   * *****/
  const [teamInfo, setTeamInfo] = useState({
    squadInfo: squadInfoInitialState,
    players: [],
    playersInitial: [],
    transferInfo: transferInfoInitialState,
  });

  const [showTransferWindowModal, setShowTransferWindowModal] = useState(false);

  // Build your team: Player selection
  const handlePlayerSelection = (player) => {
    return playerSelectionHandler({
      player,
      teamInfo,
      setTeamInfo,
    });
  };

  // Build your team: Player deselection
  const handlePlayerDeselection = (position, i) => {
    return playerDeselectionHandler({
      position,
      i,
      teamInfo,
      setTeamInfo,
    });
  };

  // Transfer window: Player deselection
  const handleTransferPlayerDeselect = (position, index) => {
    return playerTransferDeselectHandler({
      teamInfo,
      setTeamInfo,
      player: {
        position,
        index,
      },
    });
  };

  // Transfer window: Player selection
  const handleTransferPlayerSelection = (player) => {
    playerTransferSelectionHandler({
      player,
      teamInfo,
      setTeamInfo,
    });
  };

  // Player transfer confirm
  const onTransferConfirmClick = () => {
    setShowTransferWindowModal(true);
  };

  // Player transfer settings
  const runInitialSettingsForTransferWindows = async () => {
    const { success, data } = await dispatch(
      getFantasyTeamById({
        gameWeek: user.currentGameweek,
        fantasyTeamId: user.fantasyTeamId,
      })
    );

    if (success) {
      initialSettingsForTransferWindows({
        players,
        squad: putSquadUnderPositions(data.squad),
        teamInfo,
        setTeamInfo,
        transferInfoInitialState,
        remainingBudget,
      });
    }
  };
  const runTransferWindowOnPlayersDataUpdate = () => {
    handleTransferWindowOnPlayerDataUpdate({
      players,
      squad: { ...teamInfo.squadInfo.squad },
      teamInfo,
      setTeamInfo,
    });
  };

  // Build team settings
  const runInitialSettingsForBuildYourTeam = () => {
    initialSettingsForBuildYourTeam({
      players,
      teamInfo,
      setTeamInfo,
    });
  };

  useEffect(() => {
    if (teamAlreadyExists) {
      if (teamInfo.transferInfo.initialRendered) {
        // Will run every time players data change
        return runTransferWindowOnPlayersDataUpdate();
      }
      // Will only run initially
      return runInitialSettingsForTransferWindows();
    }
    // Will run every time players data change
    runInitialSettingsForBuildYourTeam();
  }, [players]);

  const { isOneFreeTransferWindow } = teamInfo.transferInfo;

  return (
    <Layout title="Build Team All Player" showToast={true}>
      <div className="mx-auto flex bg-white">
        {/*Left-Section*/}
        <div className="w-[57%]">
          <BuildTeamLeftSection
            isOneFreeTransferWindow={isOneFreeTransferWindow}
            teamInfo={teamInfo}
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
            teamInfo={teamInfo}
            setTeamInfo={setTeamInfo}
            clubs={clubs}
            handlePlayerSelection={
              isOneFreeTransferWindow
                ? handleTransferPlayerSelection
                : handlePlayerSelection
            }
          />
        </div>

        <FooterBar
          players={players}
          teamInfo={teamInfo}
          setTeamInfo={setTeamInfo}
          squadInfoInitialState={squadInfoInitialState}
          onTransferResetClick={runInitialSettingsForTransferWindows}
          onTransferConfirmClick={onTransferConfirmClick}
        />

        <TransferWindowModal
          showTransferWindowModal={showTransferWindowModal}
          setShowTransferWindowModal={setShowTransferWindowModal}
          teamInfo={teamInfo}
        />
      </div>
    </Layout>
  );
}
