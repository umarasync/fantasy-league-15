// Packages
import { arrayMoveImmutable } from "array-move";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Layout from "components/layout";
import CardSection from "components/selectClub/CardSection";
import ClubControls from "components/selectClub/ClubControls";
import Div from "components/html/Div";
import Image from "components/html/Image";
import Text from "components/html/Text";

import { getAllTeams, addFavouriteTeam } from "redux/Teams/api";

// Utils
import R from "utils/getResponsiveValue";

// Constants
// import cardsDataI from "constants/data/cardsData";
import colors from "constants/colors";

// Styles
const getStyles = (R) => {
  return {
    gradient: {
      width: R(299),
      height: "100%",
    },
    image: {
      top: R(34),
      left: R(80),
      zIndex: 1,
    },
  };
};

export default function SelectClub() {
  const STYLES = { ...getStyles(R) };

  // Router
  const router = useRouter();
  const {query} = router
  let {fromSettings} = query

  const dispatch = useDispatch();
  const [cardsDataI, setCardsDataI] = useState();
  const [cardsData, setCardsData] = useState();
  const [cardsNextData, setCardsNextData] = useState();
  const [changeCard, setChangeCard] = useState(true);
  const [teamsData, setTeamsData] = useState();

  /***** Teams Added To Profile ****/
  const updateTeamToProfileSuccess = useSelector(
    ({ teams }) => teams.updateTeamToProfileSuccess
  );
  const updateTeamToProfileError = useSelector(
    ({ teams }) => teams.updateTeamToProfileError
  );

  /***** Fetching and Building Teams Array ****/
  const getAllTeamsSuccess = useSelector(
    ({ teams }) => teams.getAllTeamsSuccess
  );
  const getAllTeamsError = useSelector(({ teams }) => teams.getAllTeamsError);

  /**** Fetching All Teams Data From Server ****/
  useEffect(() => {
    //Query API
    dispatch(getAllTeams());
  }, []);

  useEffect(() => {
    if (teamsData) {
      setCardsDataI(
        teamsData.map((Teams, i) => {
          return {
            id: Teams.id,
            image: {
              name: Teams.logo,
            },
            heading: {
              title: Teams.officalName,
            },
            subHeading: {
              title: Teams.venue,
            },
          };
        })
      );
    }
  }, [teamsData]);

  useEffect(() => {
    if (teamsData) {
      setCardsData(cardsDataI);
      setCardsNextData(cardsDataI);
    }
  }, [cardsDataI]);

  useEffect(() => {
    //Mutation API response
    if (getAllTeamsSuccess) {
      setTeamsData(getAllTeamsSuccess);
    } else if (getAllTeamsError) {
      console.log("getAllTeamsError", getAllTeamsError);
    }
  }, [getAllTeamsSuccess, getAllTeamsError]);

  const onControlsClick = (isLeftPressed = false) => {
    let dataI = [];
    if (isLeftPressed) {
      dataI = arrayMoveImmutable(cardsData, -1, 0);
    } else {
      dataI = arrayMoveImmutable(cardsData, 0, -1);
    }

    setCardsNextData(dataI);
    setChangeCard(!changeCard);
    setCardsData(dataI);
  };

  const onNextClick = () => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user) || [];
    if (user && user != "") {
      let data = {
        profileId: user.profile.id,
        accountId: user.id,
        favouriteTeamId: cardsData[2].id,
      };
      dispatch(addFavouriteTeam(data));
    }

    // router.push("/build_team_all_players");
  };

  /**** Response from Teams Update to Profile ****/
  useEffect(() => {
    if (updateTeamToProfileSuccess) {
      toast.success(updateTeamToProfileSuccess, {
        onClose: () => {
          if(fromSettings) {
            return router.back()
          }
          return router.push("/build_team_all_players")
        },
      });
    }else if(updateTeamToProfileError){
      toast.success("Error updating club.");
    }
  }, [updateTeamToProfileSuccess, updateTeamToProfileError]);

  const firstCard = cardsData ? cardsData[0] : "";
  const secondCard = cardsData ? cardsData[1] : "";
  const thirdCard = cardsData ? cardsData[2] : "";
  const fourthCard = cardsData ? cardsData[3] : "";
  const fifthCard = cardsData ? cardsData[4] : "";

  const nextFirstCard = cardsNextData ? cardsNextData[0] : "";
  const nextSecondCard = cardsNextData ? cardsNextData[1] : "";
  const nextThirdCard = cardsNextData ? cardsNextData[2] : "";
  const nextFourthCard = cardsNextData ? cardsNextData[3] : "";
  const nextFifthCard = cardsNextData ? cardsNextData[4] : "";

  return (
    <Layout title="Select Club">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Div
        className="bg-[url('/images/green_grunge_border_with_halftone_background_2.png')]
                bg-[length:100%_100%] bg-no-repeat w-full relative"
        style={{ minHeight: R() }}
        pt={34}
      >
        <div className="absolute" style={STYLES.image}>
          <Image
              src={`/images/logo_white.png`}
              alt={""}
              w={164}
              h={40}
          />
        </div>
        <div className="flex flex-col items-center">
          <Text
            text={
              <span>
                select your <br />
                favorite club
              </span>
            }
            fs={50}
            fst={"italic"}
            tt={"uppercase"}
            textAlign={"center"}
            fw={800}
            lh={54}
            mt={50}
            color={colors.white}
          />
          <Text
            text={
              <span>
                {" "}
                Based on this choice, players will be prioritized when creating{" "}
                <br />a team, and you will join a fan league of the selected
                club
              </span>
            }
            fs={18}
            textAlign={"center"}
            lh={26}
            color={colors.white}
            mt={24}
            opacity={0.7}
          />
        </div>

        {cardsData && (
          <div>
            <div className="flex justify-between items-center mt-[6rem] w-full">
              <CardSection
                firstCard={firstCard}
                secondCard={secondCard}
                thirdCard={thirdCard}
                fourthCard={fourthCard}
                fifthCard={fifthCard}
                nextFirstCard={nextFirstCard}
                nextSecondCard={nextSecondCard}
                nextThirdCard={nextThirdCard}
                nextFourthCard={nextFourthCard}
                nextFifthCard={nextFifthCard}
                changeCard={changeCard}
              />
            </div>
            {/*Controls*/}
            <ClubControls
              onControlsClick={onControlsClick}
              onNextClick={onNextClick}
            />
          </div>
        )}

        {/*left gradient*/}
        <div
          className="bg-[url('/images/gradient_blue_left.png')] absolute bg-[length:100%_100%] bg-no-repeat  top-[0] left-[0] "
          style={STYLES.gradient}
        />
        {/*right gradient*/}
        <div
          className="bg-[url('/images/gradient_blue_right.png')] absolute bg-[length:100%_100%] bg-no-repeat  top-[0] right-[0] "
          style={STYLES.gradient}
        />
      </Div>
    </Layout>
  );
}
