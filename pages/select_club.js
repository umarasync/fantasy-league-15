// Packages
import { arrayMoveImmutable } from "array-move";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Layout from "components/layout";
import CardSection from "components/selectClub/CardSection";
import ClubControls from "components/selectClub/ClubControls";
import Image from "components/html/Image1";
import Text from "components/html/Text1";
import Loader from "components/loaders/Loader";

// Actions
import { getAllTeams, addFavouriteTeam } from "redux/Teams/api";

// Utils
import R from "utils/getResponsiveValue";
import { isEmpty } from "utils/helpers";

// Styles
const getStyles = (R) => {
  return {
    container: {
      // minHeight: R(),
    },
    gradient: {
      width: R(299),
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

  const dispatch = useDispatch();
  const router = useRouter();

  const { query } = router;
  let { fromSettings } = query;

  // Global States
  const user = useSelector(({ auth }) => auth.user);

  const [cardsInfo, setCardsInfo] = useState({
    cards: [],
    toggleAnimation: false,
  });

  const onControlsClick = (isLeftPressed = false) => {
    let cards = [];
    if (isLeftPressed) {
      cards = arrayMoveImmutable([...cardsInfo.cards], -1, 0);
    } else {
      cards = arrayMoveImmutable([...cardsInfo.cards], 0, -1);
    }

    setCardsInfo({
      ...cardsInfo,
      cards,
      toggleAnimation: !cardsInfo.toggleAnimation,
    });
  };

  const onNextClick = async () => {
    if (user.id) {
      let inputData = {
        profileId: user.id,
        accountId: user.id,
        favouriteTeamId: cardsInfo.cards[2].id,
      };
      const { success } = await dispatch(addFavouriteTeam(inputData));
      // if(!success) return
      router.push("/build_team_all_players");
    }
  };

  const fetchCards = async () => {
    const { success, data } = await dispatch(getAllTeams());

    if (!success) return;

    setCardsInfo({
      ...cardsInfo,
      cards: data,
    });
  };

  useEffect(() => {
    fetchCards();
  }, []);

  if (isEmpty(cardsInfo)) return <Loader />;

  return (
    <Layout
      title="Select Club"
      showToast
      bg={{
        url: `bg-[url('/images/green_grunge_border_with_halftone_background_2.png')]`,
        cls: "relative pt-[3.4rem]",
      }}
    >
      <div>
        <Image
          src={`/images/logo_white.png`}
          className={`w-[16.4rem] h-[4rem] absolute left-[8rem] top-[3.4rem] z-[1]`}
          alt={""}
        />
        <div className="flex flex-col items-center">
          <Text
            title={
              <span>
                select your <br />
                favorite club
              </span>
            }
            className={`text-white italic uppercase center text-[5rem] leading-[5.4rem] mt-[5rem] text-center font-[800]`}
          />

          <Text
            title={
              <span>
                {" "}
                Based on this choice, players will be prioritized when creating{" "}
                <br />a team, and you will join a fan league of the selected
                club
              </span>
            }
            className={`text-white center text-[1.8rem] leading-[2.6rem] mt-[2.4rem] text-center opacity-[0.7]`}
          />
        </div>

        {cardsInfo && (
          <div>
            <div className="flex justify-between items-center mt-[6rem] w-full">
              <CardSection cardsInfo={cardsInfo} />
            </div>
            {/*Controls*/}
            <ClubControls
              onControlsClick={onControlsClick}
              onNextClick={onNextClick}
            />
          </div>
        )}

        {/*left gradient*/}
        <div className="bg-[url('/images/gradient_blue_left.png')] absolute bg-[length:100%_100%] bg-no-repeat  top-[0] left-[0] h-full w-[29.9rem]" />
        {/*right gradient*/}
        <div className="bg-[url('/images/gradient_blue_right.png')] absolute bg-[length:100%_100%] bg-no-repeat  top-[0] right-[0] h-full w-[29.9rem]" />
      </div>
    </Layout>
  );
}
