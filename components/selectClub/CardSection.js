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
        imageCls: "w-[5.9rem] h-[5.9rem]",
        headingCls: "text-white text-[1.4rem] pt-[1rem] leading-[1.8rem]",
        subHeadingCls:
          "text-lavender_grey text-[1.2rem] mt-[0.4rem] leading-[1.6rem]",
        containerCls: `flex relative items-center w-[16.1rem] h-[14.7rem] ${bgImage1}`,
      },
    };
  };

  const buildCardType2 = (card) => {
    return {
      ...card,
      toggleAnimation,
      classNames: {
        imageCls: "w-[8.1rem] h-[8.1rem]",
        headingCls: "text-white text-[2rem] pt-[2rem] leading-[2.4rem]",
        subHeadingCls:
          "text-lavender_grey text-[1.4rem] mt-[0.4rem] leading-[2.2rem]",
        containerCls: `flex relative items-center w-[29.9rem] h-[23.1rem] ${bgImage2}`,
      },
    };
  };

  const buildCardType3 = (card) => {
    return {
      ...card,
      toggleAnimation,
      classNames: {
        imageCls: "w-[15rem] h-[15rem] mt-[2rem]",
        headingCls: "text-black_rock text-[3.2rem] pt-[2rem] leading-[4.4rem]",
        subHeadingCls:
          "text-regent_grey text-[1.8rem] mt-[0.4rem] leading-[2.6rem]",
        containerCls: `flex relative items-start w-[40.8rem] h-[35.9rem] ${bgImage3}`,
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
