// Packages
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

// Components
import Modal from "components/modals";
import Div from "components/html/Div";
import Text from "components/html/Text";
import Text_18_22_600 from "components/texts/Text_18_22_600";
import Button from "components/html/Button";
import BorderHorizontal from "components/borders/BorderHorizontal";
import TransferInAndOutPlayer from "components/transferWindow/TransferInAndOutPlayer";

// Constants
import colors from "constants/colors";
import { SHADOW_DARK_INDIGO, SHADOW_WHITE_SMOKE } from "constants/boxShadow";
import { POINTS_PER_ADDITIONAL_TRANSFER } from "constants/universalConstants";

// Utils
import R from "utils/getResponsiveValue";
import { nFormatter } from "utils/helpers";

// Actions
import { doFantasyTeamTransfers } from "redux/FantasyTeams/api";
import {
  fantasyTeamTransferFailed,
  fantasyTeamTransferSuccess,
} from "redux/FantasyTeams/actionCreators";

// Styles
const getStyles = () => {
  return {
    transferredSummaryBox: {
      overflowY: "scroll",
      overflowX: "hidden",
      flexGrow: 1,
    },
  };
};

export default function TransferWindowModal({
  title = "Summary",
  transferredPlayers,
  showTransferWindowModal,
  setShowTransferWindowModal,
  // Additional Data
  squadInfo,
  additionalTransferredPlayers,
}) {
  const STYLES = { ...getStyles(R) };

  const dispatch = useDispatch();
  const router = useRouter();

  // Global States
  const user = useSelector(({ auth }) => auth.user);
  const { remainingBudget } = squadInfo;
  const noOfFreeTransfers =
    transferredPlayers.length >= 2 ? user.freeTransfers : 1;
  const heading = "You are about to transfer ";
  const subHeading = `${transferredPlayers.length} player`;
  const loadingFantasyTeamTransfer = useSelector(
    ({ fantasyTeam }) => fantasyTeam.loadingFantasyTeamTransfer
  );

  const onTransferModalConfirmed = async () => {
    let transfers = [];
    transferredPlayers.forEach((p) => {
      transfers.push({
        in: { id: p.transferIn.id },
        out: { id: p.transferOut.id },
      });
    });

    const { success, msg } = await dispatch(
      doFantasyTeamTransfers({ fantasyTeamId: user.fantasyTeamId, transfers })
    );

    /****** Toast ******/
    if (success) {
      toast.success(msg, {
        onClose: () => {
          dispatch(fantasyTeamTransferSuccess());
          return router.push("/my_squad_game_week");
        },
      });
    } else {
      toast.error(msg, {
        onClose: () => dispatch(fantasyTeamTransferFailed()),
      });
    }
  };

  return (
    <Modal>
      <div
        className={`${
          !showTransferWindowModal && "hidden"
        } fixed z-50 overflow-auto top-0 left-0 w-full h-full bg-backdrop flex items-center justify-center`}
      >
        {showTransferWindowModal && (
          <Div
            w={536}
            h={"85%"}
            pt={28}
            pb={28}
            br={12}
            bg={colors.white}
            className={"flex flex-col justify-between"}
          >
            {/*Content*/}
            <Div className={"flex flex-col"} h={"90%"}>
              {/*Top Heading*/}
              <Div pl={24} pr={24}>
                <Text
                  text={title}
                  fs={28}
                  lh={32}
                  mb={24}
                  tt={"uppercase"}
                  fw={800}
                  fst={"italic"}
                  color={colors.black_rock}
                />
                <Text
                  text={
                    <>
                      <Text
                        text={`${heading}`}
                        inline
                        color={colors.regent_grey}
                      />
                      <Text text={subHeading} inline color={colors.mandy} />
                    </>
                  }
                  fs={18}
                  pr={56}
                  lh={26}
                  color={colors.regent_grey}
                  mb={24}
                />
              </Div>
              {/*Transferred-Players-Summary-Box*/}
              <Div style={STYLES.transferredSummaryBox} pb={40}>
                <Div ml={24} mr={24}>
                  <Div justifyBetween mb={24}>
                    <Text_18_22_600 title={"Free transfers"} />
                    <Text_18_22_600 title={noOfFreeTransfers} />
                  </Div>
                  <BorderHorizontal />
                  <Div justifyBetween mb={24} mt={24}>
                    <Text_18_22_600 title={"Additional transfers"} />
                    <Text_18_22_600
                      title={`${additionalTransferredPlayers} ${
                        additionalTransferredPlayers
                          ? `(-${
                              additionalTransferredPlayers *
                              POINTS_PER_ADDITIONAL_TRANSFER
                            } pts)`
                          : ""
                      }`}
                      color={
                        additionalTransferredPlayers
                          ? colors.mandy
                          : colors.black_rock
                      }
                    />
                  </Div>
                  <BorderHorizontal />
                  <Div justifyBetween mt={24} mb={24}>
                    <Text_18_22_600 title={"Remaining budget"} />
                    <Text_18_22_600 title={nFormatter(remainingBudget)} />
                  </Div>
                </Div>
                {/*Player*/}
                <Div br={12} bs={SHADOW_WHITE_SMOKE} p={24} mr={24} ml={24}>
                  <Div justifyBetween mb={24}>
                    <Text
                      text={"transfer in"}
                      fs={22}
                      lh={26}
                      fw={800}
                      fst={"italic"}
                      tt={"uppercase"}
                    />
                    <Text
                      text={"transfer out"}
                      fs={22}
                      lh={26}
                      fw={800}
                      fst={"italic"}
                      tt={"uppercase"}
                    />
                  </Div>
                  {/*Row*/}
                  {transferredPlayers.map((p, index) => {
                    return (
                      <TransferInAndOutPlayer
                        key={index}
                        transferInPlayer={p.transferIn}
                        transferOutPlayer={p.transferOut}
                        mt={index ? 50 : 0}
                      />
                    );
                  })}
                </Div>
              </Div>
            </Div>

            {/*Buttons*/}
            <Div justifyBetween mr={24} ml={24}>
              <Button
                title={"Cancel"}
                color={colors.white}
                mr={8}
                h={70}
                disabled={loadingFantasyTeamTransfer}
                bs={SHADOW_DARK_INDIGO}
                bg={colors.dark_indigo}
                onClick={() => setShowTransferWindowModal(false)}
              />
              <Button
                title={"Confirm"}
                disabled={loadingFantasyTeamTransfer}
                color={colors.white}
                ml={8}
                h={70}
                onClick={onTransferModalConfirmed}
              />
            </Div>
          </Div>
        )}
      </div>
    </Modal>
  );
}
