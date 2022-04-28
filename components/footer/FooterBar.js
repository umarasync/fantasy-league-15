// Packages
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

// Components
import Button from "components/html/Button";
import Border from "components/borders/Border";
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";

// Utils
import R from "utils/getResponsiveValue";
import { nFormatter } from "utils/helpers";
import {
  disablePlayersIfClubsLimitReached,
  getClubCount,
  handleAutoPick,
} from "utils/buildYourTeamHelper";
import { clone } from "utils/helpers";

// Constants
import colors from "constants/colors";
import { POINTS_PER_ADDITIONAL_TRANSFER } from "constants/universalConstants";
import { FIFTEEN } from "constants/arrayIndexes";

// Actions
import { saveFantasyTeamToRedux } from "redux/FantasyTeams/actionCreators";

// Styles
const getStyles = (R) => {
  return {
    container: {
      height: R(104),
      paddingLeft: R(81.26),
      paddingRight: R(81.26),
    },
    playersText: {
      fontSize: R(18),
      marginRight: R(14),
      lineHeight: R(26, "px"),
    },
    RBText: {
      fontSize: R(18),
      marginLeft: R(32),
    },
    infoText: {
      width: R(210),
      background: "rgb(252,252,252)",
      color: colors.regent_grey,
      fontSize: R(14),
      paddingLeft: R(14),
      paddingRight: R(14),
      paddingTop: R(8),
      paddingBottom: R(8),
      borderRadius: R(12),
      top: R(-68),
      right: R(10),
    },
    infoImage: {
      width: R(21),
      height: R(21),
      marginLeft: R(9),
      marginRight: R(17),
    },
    remainingBudget: {
      fontSize: R(28),
      lineHeight: R(32, "px"),
      fontWeight: "800",
    },

    continueBtn: {
      height: R(50),
      width: R(163),
    },
  };
};

export default function FooterBar({
  players,
  teamInfo,
  setTeamInfo,
  squadInfoInitialState,
  onTransferResetClick,
  onTransferConfirmClick,
}) {
  const STYLES = { ...getStyles(R) };

  const dispatch = useDispatch();
  const router = useRouter();

  const { squadInfo, transferInfo } = teamInfo;

  const {
    isOneFreeTransferWindow,
    noOfFreeTransfersLeft,
    transferResetDisabled,
    transferConfirmDisabled,
    additionalTransferredPlayers,
  } = transferInfo;

  // Global states
  const totalBudget = useSelector(({ fantasyTeam }) => fantasyTeam.totalBudget);

  const { remainingBudget, totalChosenPlayers } = squadInfo;
  const [resetDisabled, setResetDisabled] = useState(true);
  const [autoPickDisabled, setAutoPickDisabled] = useState(false);
  const [continueDisabled, setContinueDisabled] = useState(true);
  const continueDisabled1 = totalChosenPlayers < FIFTEEN;

  const onAutoPick = () => {
    const res = handleAutoPick({
      players,
      totalBudget,
    });

    const updatedSquadInfo = {
      ...teamInfo.squadInfo,
      squad: res.squad,
      clubsCount: getClubCount(res.squad),
      remainingBudget: res.remainingBudget,
      totalChosenPlayers: res.totalChosenPlayers,
    };

    const updatedPlayersInitial = disablePlayersIfClubsLimitReached({
      players: res.players,
      clubsCount: updatedSquadInfo.clubsCount,
    });

    setTeamInfo({
      ...teamInfo,
      squadInfo: updatedSquadInfo,
      playersInitial: updatedPlayersInitial,
    });

    setAutoPickDisabled(true);
    setResetDisabled(false);
  };

  useEffect(() => {
    if (totalChosenPlayers === 0) {
      setAutoPickDisabled(false);
      setResetDisabled(true);
      setContinueDisabled(true);
    } else if (totalChosenPlayers === FIFTEEN && remainingBudget > 0) {
      setAutoPickDisabled(true);
      setResetDisabled(false);
      setContinueDisabled(false);
    }
  }, [totalChosenPlayers]);

  const handleResetClick = () => {
    setTeamInfo({
      ...teamInfo,
      squadInfo: clone(squadInfoInitialState),
      playersInitial: clone(players),
    });

    setAutoPickDisabled(false);
    setResetDisabled(true);
    setContinueDisabled(true);
  };

  const persistDataToReduxStore = () => {
    const teamData = JSON.stringify({ squadInfo });

    dispatch(saveFantasyTeamToRedux(teamData));
    router.push("/create_team_name");
  };

  const getText = () => {
    if (isOneFreeTransferWindow && additionalTransferredPlayers) {
      return `-${
        additionalTransferredPlayers * POINTS_PER_ADDITIONAL_TRANSFER
      } pts`;
    } else if (isOneFreeTransferWindow) {
      return `${noOfFreeTransfersLeft} FREE`;
    } else {
      return `${totalChosenPlayers} / ${FIFTEEN}`;
    }
  };

  return (
    <div
      className="footer-blue-gradient fixed bg-red-200 w-full bottom-[0] flex items-center"
      style={STYLES.container}
    >
      <div className={"flex items-center justify-between w-full"}>
        {/*Left Section*/}
        <div className={"flex items-center"}>
          <p className={"text-lavender_grey normal"} style={STYLES.playersText}>
            {isOneFreeTransferWindow ? "Transfers" : "Players"}
          </p>
          <Text
            text={getText()}
            fs={28}
            lh={32}
            fw={800}
            fst={"italic"}
            tt={"uppercase"}
            color={
              additionalTransferredPlayers ? colors.bean_red : colors.white
            }
            mr={32}
          />

          <Border />
          <p className={"text-lavender_grey normal"} style={STYLES.RBText}>
            Remaining budget
          </p>
          <div className={"relative"}>
            {remainingBudget < 0 && (
              <p className={"absolute"} style={STYLES.infoText}>
                You need to exchange some players for cheaper ones
              </p>
            )}

            <div style={STYLES.infoImage}>
              <Image src={"/images/info_light.png"} alt={"-"} />
            </div>
          </div>
          <p
            className={`italic uppercase`}
            style={{
              ...STYLES.remainingBudget,
              color: remainingBudget > 0 ? colors.white : colors.bean_red,
            }}
          >
            {remainingBudget < 0 && "-"} {nFormatter(Math.abs(remainingBudget))}
          </p>
        </div>

        {/*Right Section*/}
        <Div center>
          {isOneFreeTransferWindow ? (
            <Button
              title={"back"}
              color={colors.black_rock}
              mr={16}
              h={50}
              w={190}
              bs={"unset"}
              bg={colors.white}
              onClick={() => router.push("/my_squad_game_week")}
            />
          ) : (
            <Button
              title={"auto pick"}
              color={colors.black_rock}
              disabled={autoPickDisabled}
              mr={16}
              h={50}
              w={190}
              bs={"unset"}
              bg={colors.white}
              onClick={onAutoPick}
            />
          )}

          {isOneFreeTransferWindow ? (
            <Button
              title={"reset"}
              disabled={transferResetDisabled}
              mr={40}
              bs={"unset"}
              h={50}
              w={190}
              bg={colors.rhino}
              onClick={onTransferResetClick}
            />
          ) : (
            <Button
              title={"reset"}
              disabled={resetDisabled}
              mr={40}
              bs={"unset"}
              h={50}
              w={190}
              bg={colors.rhino}
              onClick={handleResetClick}
            />
          )}
          {isOneFreeTransferWindow ? (
            <Button
              onClick={onTransferConfirmClick}
              title={"confirm"}
              h={50}
              w={163}
              color={colors.white}
              disabled={transferConfirmDisabled}
              style={STYLES.continueBtn}
            />
          ) : (
            <Button
              onClick={persistDataToReduxStore}
              title={"continue"}
              h={50}
              w={163}
              color={colors.white}
              disabled={continueDisabled || continueDisabled1}
              style={STYLES.continueBtn}
            />
          )}
        </Div>
      </div>
    </div>
  );
}
