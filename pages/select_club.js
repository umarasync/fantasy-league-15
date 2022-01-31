// Packages
import { arrayMoveImmutable } from "array-move";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Layout from "components/layout";
import CardSection from "components/selectClub/CardSection";
import ClubControls from "components/selectClub/ClubControls";
import Div from "components/html/Div";
import Image from "components/html/Image";
import Text from "components/html/Text";
import { getAllTeams } from "../redux/Teams/api";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import cardsDataI from "constants/data/cardsData";
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

  const router = useRouter();
  const dispatch = useDispatch();
  const [teamsData, setTeamsData] = useState();
  const [changeCard, setChangeCard] = useState(true);

  const getAllTeamsSuccess = useSelector(
    ({ teams }) => teams.getAllTeamsSuccess
  );
  const getAllTeamsError = useSelector(({ teams }) => teams.getAllTeamsError);

  const onControlsClick = (isLeftPressed = false) => {
    let dataI = [];
    if (isLeftPressed) {
      dataI = arrayMoveImmutable(teamsData, -1, 0);
    } else {
      dataI = arrayMoveImmutable(teamsData, 0, -1);
    }

    // setCardsNextData(dataI);
    setChangeCard(!changeCard);
    setTeamsData(dataI);
  };

  const onNextClick = () => {
      console.log("SelectedTeam", teamsData[2]);
    //router.push("/build_team_all_players");
  };

  /**** Fetching All Teams Data From Server ****/
  useEffect(() => {
    //Mutation API
    dispatch(getAllTeams());
  }, []);

  useEffect(() => {
    //Mutation API response
    if (getAllTeamsSuccess) {
      setTeamsData(getAllTeamsSuccess);
    } else if (getAllTeamsError) {
      console.log("getAllTeamsError", getAllTeamsError);
    }
  }, [getAllTeamsSuccess, getAllTeamsError]);

  return (
    <Layout title="Select Club">
      <Div
        className="bg-[url('/images/green_grunge_border_with_halftone_background_2.png')]
                bg-[length:100%_100%] bg-no-repeat w-full relative"
        style={{ minHeight: R() }}
        pt={34}
      >
        <div className="absolute" style={STYLES.image}>
          <Image name={"logo_white.png"} alt={""} w={164} h={40} />
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

        <div>
          <div className="flex justify-between items-center mt-[6rem] w-full">
            {teamsData && (
              <CardSection cardData={teamsData} changeCard={changeCard} />
            )}
          </div>
          {/*Controls*/}
          <ClubControls
            onControlsClick={onControlsClick}
            onNextClick={onNextClick}
          />
        </div>

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
