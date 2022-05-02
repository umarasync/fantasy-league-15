// Packages
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

// Components
import Layout from "components/layout/index";
import MySquadLeftSection from "components/mySquad/MySquadLeftSection";
import Div from "components/html/Div";
import InfoBoard from "components/mySquad/InfoBoard";
import MySquadFooterBar from "components/mySquad/MySquadFooterBar";
import PlayerInfoModal from "components/playerInfo/PlayerInfoModal";
import TripleCaptainModal from "components/playerInfo/TripleCaptainModal";
import BenchBoostModal from "components/playerInfo/BenchBoostModal";
import ProfileSettingsSideDrawer from "components/profileSettings/ProfileSettingsSideDrawer";
import Loader from "components/loaders/Loader";

// Utils
import { isEmpty } from "utils/helpers";
import { TOTAL_POINTS } from "utils/mySquadHelper";
import {
  playerSwapHandler,
  DIAMOND_UP_GREEN,
  didMount,
} from "utils/mySquadHelper";
import R from "utils/getResponsiveValue";

// Constants
import { INITIAL } from "constants/animations";

// Actions
import { getPlayer } from "redux/Players/api";

// Styles
const getStyles = (R) => {
  return {
    sideDrawerContainer: {
      paddingBottom: R(100),
    },
  };
};

export default function MySquadGameWeek() {
  const STYLES = { ...getStyles(R) };

  const router = useRouter();
  const dispatch = useDispatch();

  // Global States
  const user = useSelector(({ auth }) => auth.user);

  const [squadInfo, setSquadInfo] = useState({});
  const [savedSquad, setSavedSquadInfo] = useState({});
  const [transferInProgress, setTransferInProgress] = useState(false);
  const [activeFilter, setActiveFilter] = useState(TOTAL_POINTS);
  const [changeFormation, setChangeFormation] = useState(INITIAL);

  // Player-Info
  const [showPlayerInfoModal, setShowPlayerInfoModal] = useState(false);
  const [playerInfoPlayer, setPlayerInfoPlayer] = useState({});

  // Triple-Captain
  const [showTripleCaptainModal, setShowTripleCaptainModal] = useState(false);
  const [tripleCaptainPlayer, setTripleCaptainPlayer] = useState([]);

  // Bench-Boost
  const [showBenchBoostModal, setShowBenchBoostModal] = useState(false);
  const [benchBoostPlayers, setBenchBoostPlayers] = useState([]);

  //Player-Transfer`
  const handlePlayerSwap = (player, arrayIndex) => {
    if (player.clickedIcon === DIAMOND_UP_GREEN) return;
    const $squadInfo = playerSwapHandler({
      player,
      arrayIndex,
      squadInfo,
      setChangeFormation,
      setTransferInProgress,
    });
    setSquadInfo($squadInfo);
  };

  /**** Player info modal ***/
  const handleShowPlayerInfoModal = async (player, arrayIndex) => {
    const { success, data } = await dispatch(
      getPlayer({ playerId: player.id })
    );
    if (!success) return;
    setPlayerInfoPlayer({ ...data });
  };

  useEffect(() => {
    if (isEmpty(playerInfoPlayer)) return;
    setShowPlayerInfoModal(true);
  }, [playerInfoPlayer]);

  /*** Filter Buttons - Total pts, Price, Match ***/
  useEffect(() => {
    if (isEmpty(squadInfo)) return;
    const squad = squadInfo.squad.map((player) => {
      player.activeFilter = activeFilter;
      return player;
    });
    setSquadInfo({ ...squadInfo, squad });
  }, [activeFilter]);

  // Did-Mount
  useEffect(() => {
    if (!user.fantasyTeamId) {
      return router.push("/build_team_all_players");
    }

    didMount({
      // User
      user,
      // Squad Info
      setSquadInfo,
      setSavedSquadInfo,
      // Modals
      setShowPlayerInfoModal,
      setShowTripleCaptainModal,
      // dispatch
      dispatch,
    });
  }, []);

  if (squadInfo.length === 0) {
    return <Loader />;
  }

  return (
    <Layout title="My Squad" showToast autoClose={2000}>
      <Div className="mx-auto relative bg-white">
        <div className={"flex"}>
          <Div className="w-[62%]">
            <MySquadLeftSection
              squadInfo={squadInfo}
              transferInProgress={transferInProgress}
              handleFilterButtonClick={(v) => setActiveFilter(v)}
              onPlayerChange={handlePlayerSwap}
              changeFormation={changeFormation}
              onPlayerClick={handleShowPlayerInfoModal}
            />
          </Div>
          {/*Right-Section*/}
          <Div className="w-[38%] flex justify-center">
            {!isEmpty(squadInfo) && <InfoBoard squadInfo={squadInfo} />}
            <ProfileSettingsSideDrawer
              containerStyle={STYLES.sideDrawerContainer}
            />
          </Div>
        </div>

        {/*Footer-Bar*/}
        <MySquadFooterBar
          // Squad Info
          squadInfo={squadInfo}
          setSquadInfo={setSquadInfo}
          savedSquad={savedSquad}
          setSavedSquadInfo={setSavedSquadInfo}
          // Transfer
          transferInProgress={transferInProgress}
          setTransferInProgress={setTransferInProgress}
          // Chip Boosters
          setTripleCaptainPlayer={setTripleCaptainPlayer}
          setShowTripleCaptainModal={setShowTripleCaptainModal}
          setBenchBoostPlayers={setBenchBoostPlayers}
          setShowBenchBoostModal={setShowBenchBoostModal}
          // Top Buttons
          activeFilter
        />
        {/*Modals*/}
        <PlayerInfoModal
          // Squad Info
          squadInfo={squadInfo}
          setSquadInfo={setSquadInfo}
          setSavedSquadInfo={setSavedSquadInfo}
          // Modal
          showPlayerInfoModal={showPlayerInfoModal}
          setShowPlayerInfoModal={setShowPlayerInfoModal}
          // Player
          player={playerInfoPlayer}
        />
        <TripleCaptainModal
          showTripleCaptainModal={showTripleCaptainModal}
          setShowTripleCaptainModal={setShowTripleCaptainModal}
          player={tripleCaptainPlayer}
        />
        <BenchBoostModal
          showBenchBoostModal={showBenchBoostModal}
          setShowBenchBoostModal={setShowBenchBoostModal}
          players={benchBoostPlayers}
        />
      </Div>
    </Layout>
  );
}
