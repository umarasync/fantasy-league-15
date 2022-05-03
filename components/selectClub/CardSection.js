// Components
import SelectClubCard from "components/selectClub/SelectClubCard";

export default function CardSection({ cardsInfo }) {
  const { cards, toggleAnimation } = cardsInfo;

  // Background card images
  const bgImage1 = `bg-[url('/images/card_blue_small_left.png')]
          bg-[length:100%_100%] bg-no-repeat w-full`;

  const bgImage2 = `bg-[url('/images/card_blue.png')]
          bg-[length:100%_100%] bg-no-repeat w-full`;

  const bgImage3 = `bg-[url('/images/card_white.png')]
          bg-[length:100%_100%] bg-no-repeat w-full`;

  const buildCardType1 = (card) => {
    return {
      ...card,
      toggleAnimation,
      classNames: {
        imageCls: "sm:w-[5.9rem] sm:h-[5.9rem]",
        headingCls:
          "text-white sm:text-[1.4rem] sm:pt-[1rem] sm:leading-[1.8rem]",
        subHeadingCls:
          "text-lavender_grey sm:text-[1.2rem] sm:mt-[0.4rem] sm:leading-[1.6rem]",
        containerCls: `sm:flex sm:relative sm:items-center sm:w-[16.1rem] sm:h-[14.7rem] ${bgImage1}`,
      },
    };
  };

  const buildCardType2 = (card) => {
    return {
      ...card,
      toggleAnimation,
      classNames: {
        imageCls: "sm:w-[8.1rem] sm:h-[8.1rem]",
        headingCls:
          "text-white sm:text-[2rem] sm:pt-[2rem] sm:leading-[2.4rem]",
        subHeadingCls:
          "text-lavender_grey sm:text-[1.4rem] sm:mt-[0.4rem] sm:leading-[2.2rem]",
        containerCls: `sm:flex sm:relative sm:items-center sm:w-[29.9rem] sm:h-[23.1rem] ${bgImage2}`,
      },
    };
  };

  const buildCardType3 = (card) => {
    return {
      ...card,
      toggleAnimation,
      classNames: {
        imageCls: "sm:w-[15rem] sm:h-[15rem] sm:mt-[2rem]",
        headingCls:
          "text-black_rock sm:text-[3.2rem] sm:pt-[2rem] sm:leading-[4.4rem]",
        subHeadingCls:
          "text-regent_grey sm:text-[1.8rem] sm:mt-[0.4rem] sm:leading-[2.6rem]",
        containerCls: `sm:flex sm:relative items-start sm:w-[40.8rem] sm:h-[35.9rem] ${bgImage3}`,
      },
    };
  };

  return (
    <>
      <SelectClubCard cardsInfo={buildCardType1(cards[0])} />
      <SelectClubCard cardsInfo={buildCardType2(cards[1])} />
      <SelectClubCard cardsInfo={buildCardType3(cards[2])} />
      <SelectClubCard cardsInfo={buildCardType2(cards[3])} />
      <SelectClubCard cardsInfo={buildCardType1(cards[4])} />
    </>
  );
}
