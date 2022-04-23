// Packages
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { groupBy } from "lodash/collection";
import { toast } from "react-toastify";

// Components
import BorderHorizontal from "components/borders/BorderHorizontal";
import Div from "components/html/Div";
import Text from "components/html/Text";
import LeagueCard from "components/leaguesAndRanking/LeagueCard";
import Image from "components/html/Image";
import Button from "components/html/Button";
import InfoBoardHead from "components/leaguesAndRanking/InfoBoardHead";
import InfoBoardPoints from "components/leaguesAndRanking/InfoBoardPoints";
import CreateLeagueModal from "components/leaguesAndRanking/CreateLeagueModal";
import InviteYourFriendsModal from "components/leaguesAndRanking/InviteYourFriendsModal";
import JoinLeagueModal from "components/leaguesAndRanking/JoinLeagueModal";
import Username from "components/user/Username";

// Utils
import R from "utils/getResponsiveValue";
import { isEmpty } from "utils/helpers";

// Constants
import colors from "constants/colors";
import { SHADOW_DARK_INDIGO, SHADOW_WHITE_SMOKE } from "constants/boxShadow";

// Actions
import { createFantasyLeague } from "redux/FantasyLeagues/api";
import { fantasyLeagueCreationStart } from "../../redux/FantasyLeagues/actionCreators";

// Styles
const getStyles = (R) => {
  return {
    leaguesBody: {
      overflowY: "scroll",
      overflowX: "hidden",
      flexGrow: 1,
    },
  };
};

export default function InfoBoard({
  gameWeekInfo,
  hideInfoBoardHead,
  hideInfoBoardFooter,
  disableClick,
}) {
  const STYLES = { ...getStyles(R) };

  const dispatch = useDispatch();
  const router = useRouter();

  // Global States
  const user = useSelector(({ auth }) => auth.user);
  const LEAGUE_TYPE_USER_CREATED = "USER_CREATED";
  const LEAGUE_TYPE_SYSTEM_CREATED = "SYSTEM_CREATED";

  const [leaguesInfo, setLeaguesInfo] = useState({
    publicLeagues: [],
    privateLeagues: [],
  });

  const [showLeagueCreationModal, setShowLeagueCreationModal] = useState(false);
  const [showJoinLeagueModal, setShowJoinLeagueModal] = useState(false);
  const [toggleAnimation, setToggleAnimation] = useState(false);
  const [showInviteYourFriendsModal, setShowInviteYourFriendsModal] =
    useState(false);

  const handleShowCreateLeagueModal = () => {
    setShowLeagueCreationModal(true);
  };

  const handleShowJoinLeagueModal = () => {
    setShowJoinLeagueModal(true);
  };

  const handleCreateLeague = async (leagueName) => {
    dispatch(fantasyLeagueCreationStart());
    const { success, msg, data } = await dispatch(
      createFantasyLeague({ name: leagueName })
    );

    if (!success) {
      return toast.error(msg);
    }

    toast.success(msg);
    setFantasyLeagues(data);
    setShowLeagueCreationModal(false);
    setShowInviteYourFriendsModal(true);
  };

  const handleJoinLeague = (inviteCode) => {
    setShowJoinLeagueModal(false);
    // Search League from DB for "inviteCode" and join it
  };

  const handleLeagueClick = (league) => {
    return router.push({
      pathname: "/league_inner",
      query: {
        leagueId: league.id,
      },
    });
  };

  const setFantasyLeagues = (fantasyLeagues) => {
    const leagues = groupBy(fantasyLeagues, "type");
    setLeaguesInfo({
      ...leaguesInfo,
      publicLeagues: leagues[LEAGUE_TYPE_SYSTEM_CREATED],
      privateLeagues: leagues[LEAGUE_TYPE_USER_CREATED],
    });
  };

  useEffect(() => {
    if (isEmpty(user.fantasyLeagues)) return;
    setFantasyLeagues(user.fantasyLeagues);
  }, []);

  const { publicLeagues, privateLeagues } = leaguesInfo;

  return (
    <Div w={390} pt={35}>
      {/*username*/}
      <div className={"flex flex-row-reverse"}>
        <Username username={"martine.bakker"} />
      </div>
      {!hideInfoBoardHead && <InfoBoardHead />}
      <InfoBoardPoints
        weeklyPoints={80}
        totalPoints={1013}
        toggleAnimation={toggleAnimation}
      />
      {/*Leagues-And-Rankings*/}
      <Div
        maxH={502}
        className={"flex flex-col justify-between"}
        bs={SHADOW_WHITE_SMOKE}
        mt={24}
        p={24}
        br={12}
      >
        {/* Header & Body */}
        <Div maxH={363} className={"flex flex-col"}>
          {/*Header*/}
          <Div className={"flex items-center justify-between"} pb={24}>
            <Text
              text={"leagues and ranking"}
              fs={22}
              fw={900}
              fst={"italic"}
              tt={"uppercase"}
              lh={26}
            />
            <Image
              w={24}
              h={24}
              src={"/images/info_grey.png"}
              alt={"info_grey"}
            />
          </Div>
          {/*Body*/}
          <div style={STYLES.leaguesBody}>
            <Div>
              {!isEmpty(publicLeagues) &&
                publicLeagues.map((league, index) => (
                  <Div key={league.id}>
                    <LeagueCard
                      league={league}
                      pt={24}
                      pb={24}
                      toggleAnimation={toggleAnimation}
                      onClick={disableClick ? false : handleLeagueClick}
                    />
                    {index !== publicLeagues.length - 1 && <BorderHorizontal />}
                  </Div>
                ))}
            </Div>
            <Div
              className={"flex items-center justify-between"}
              pt={16}
              mb={16}
            >
              <Text
                text={"Private leagues"}
                fs={22}
                fw={900}
                fst={"italic"}
                tt={"uppercase"}
                lh={26}
              />
              <Image
                w={24}
                h={24}
                src={"/images/info_grey.png"}
                alt={"info_grey"}
              />
            </Div>
            {!isEmpty(privateLeagues) ? (
              <Div>
                {privateLeagues.map((league, index) => (
                  <Div key={league.id}>
                    <LeagueCard
                      league={league}
                      pt={24}
                      pb={24}
                      toggleAnimation={toggleAnimation}
                      onClick={disableClick ? false : handleLeagueClick}
                    />
                    {index !== privateLeagues.length - 1 && (
                      <BorderHorizontal />
                    )}
                  </Div>
                ))}
              </Div>
            ) : (
              <Text
                text={
                  "You aren't in any private leagues yet. Create or join one to battle it out Eredivisie stage"
                }
                fs={16}
                lh={20}
                pr={12}
                pb={20}
                color={colors.regent_grey}
              />
            )}
          </div>
        </Div>
        {/*Footer*/}
        {!hideInfoBoardFooter && (
          <Div justifyBetween mt={20}>
            <Button
              w={162}
              h={50}
              fs={14}
              lh={20}
              mr={8}
              onClick={handleShowCreateLeagueModal}
              title={"Create a league"}
            />
            <Button
              w={162}
              h={50}
              fs={14}
              lh={20}
              ml={9}
              onClick={handleShowJoinLeagueModal}
              bg={colors.dark_indigo}
              title={"Join a league"}
              bs={SHADOW_DARK_INDIGO}
            />
          </Div>
        )}
      </Div>
      {/*Create-League-Modal*/}
      {!hideInfoBoardFooter && (
        <Div>
          <CreateLeagueModal
            show={showLeagueCreationModal}
            onClose={() => setShowLeagueCreationModal(false)}
            onConfirm={handleCreateLeague}
          />
          <JoinLeagueModal
            show={showJoinLeagueModal}
            onClose={() => setShowJoinLeagueModal(false)}
            onConfirm={handleJoinLeague}
          />
          <InviteYourFriendsModal
            show={showInviteYourFriendsModal}
            onClose={() => setShowInviteYourFriendsModal(false)}
          />
        </Div>
      )}
    </Div>
  );
}
