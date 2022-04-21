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

  const squadInfoInitialState = {
    squad: clone(SELECTED_PLAYERS),
    clubsCount: {},
    remainingBudget: totalBudget,
    totalChosenPlayers: 0,
  };

  const transferInfoInitialState = {
    noOfFreeTransfersLeft: null,
    isOneFreeTransferWindow: false,
    additionalTransferredPlayers: 0,
    latestToBeTransferOut: {},
    transferResetDisabled: true,
    transferConfirmDisabled: true,
    transferredPlayers: [],
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

  // Player-Selection
  const handlePlayerSelection = (player) => {
    return playerSelectionHandler({
      player,
      teamInfo,
      setTeamInfo,
    });
  };

  // Player deselection
  const handlePlayerDeselection = (position, i) => {
    return playerDeselectionHandler({
      position,
      i,
      teamInfo,
      setTeamInfo,
    });
  };

  useEffect(() => {
    const { latestToBeTransferOut } = teamInfo.transferInfo;

    if (isEmpty(latestToBeTransferOut)) return;

    return playerTransferDeselectHandler({
      teamInfo,
      setTeamInfo,
    });
  }, [teamInfo.transferInfo.latestToBeTransferOut]);

  const handleTransferPlayerDeselect = (position, index) => {
    const { latestToBeTransferOut } = teamInfo.transferInfo;

    if (!isEmpty(latestToBeTransferOut)) return;

    const updatedTransferInfo = {
      ...teamInfo.transferInfo,
      latestToBeTransferOut: {
        position,
        index,
      },
    };
    setTeamInfo({
      ...teamInfo,
      transferInfo: updatedTransferInfo,
    });
  };

  // Player-Transfer-Player-Selection
  const handleTransferPlayerSelection = (player) => {
    playerTransferSelectionHandler({
      player,
      teamInfo,
      setTeamInfo,
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
        players,
        squad: data,
        teamInfo,
        setTeamInfo,
        remainingBudget: totalBudget - user.fantasyTeamValue,
        freeTransfers: user.freeTransfers,
      });
    }
  };

  const runInitialSettingsForBuildYourTeam = () => {
    initialSettingsForBuildYourTeam({
      players,
      teamInfo,
      setTeamInfo,
    });
  };

  useEffect(() => {
    if (teamAlreadyExists) {
      return runInitialSettingsForTransferWindows();
    }
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
          onTransferResetClick={onTransferResetClick}
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
