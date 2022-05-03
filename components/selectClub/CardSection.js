// Components
import SelectClubCard from "components/selectClub/SelectClubCard";

// Constants
import cardsStyle from "styles/cardsStyle";

export default function CardSection({
  firstCard,
  secondCard,
  thirdCard,
  fourthCard,
  fifthCard,
  changeCard,
}) {
  return (
    <>
      <SelectClubCard
        image={{
          classes: `md:w-[5.9rem] md:h-[5.9rem] md:-mt-[3rem]`,
          name: firstCard.image.name,
        }}
        heading={{
          ...cardsStyle[0].heading,
          title: firstCard.heading.title,
        }}
        subHeading={{
          ...cardsStyle[0].subHeading,
          title: firstCard.subHeading.title,
        }}
        containerClasses={"md:w-[16.1rem] md:h-[14.7rem]"}
        bgImage={cardsStyle[0].bgImage}
        itemsCenter={cardsStyle[0].itemsCenter}
        boxPaddingTop={cardsStyle[0].boxPaddingTop}
        changeCard={changeCard}
      />
      <SelectClubCard
        image={{
          classes: `md:w-[8.1rem] md:h-[8.1rem] md:-mt-[7rem]`,
          name: secondCard.image.name,
        }}
        imageClasses={"md:w[8.1rem] md:h[8.1rem] md:-mt-[7rem]"}
        heading={{
          ...cardsStyle[1].heading,
          title: secondCard.heading.title,
        }}
        subHeading={{
          ...cardsStyle[1].subHeading,
          title: secondCard.subHeading.title,
        }}
        containerClasses={"md:w-[29.9rem] md:h-[23.1rem]"}
        bgImage={cardsStyle[1].bgImage}
        itemsCenter={cardsStyle[1].itemsCenter}
        boxPaddingTop={cardsStyle[1].boxPaddingTop}
        changeCard={changeCard}
      />
      <SelectClubCard
        image={{
          classes: `md:w-[15rem] md:h-[15rem] md:mt-[1rem]`,
          name: thirdCard.image.name,
        }}
        imageClasses={"md:w[15rem] md:h[15rem] md:mt-[1rem]"}
        heading={{
          ...cardsStyle[2].heading,
          title: thirdCard.heading.title,
        }}
        subHeading={{
          ...cardsStyle[2].subHeading,
          title: thirdCard.subHeading.title,
        }}
        // containerClasses={cardsStyle[2].containerClasses}
        containerClasses={"items-start md:w-[40.8rem] md:h-[35.9rem]"}
        bgImage={cardsStyle[2].bgImage}
        itemsCenter={cardsStyle[2].itemsCenter}
        boxPaddingTop={cardsStyle[2].boxPaddingTop}
        changeCard={changeCard}
      />
      <SelectClubCard
        image={{
          classes: `md:w-[8.1rem] md:h-[8.1rem] md:-mt-[7rem]`,
          name: fourthCard.image.name,
        }}
        imageClasses={"md:w[8.1rem] md:h[8.1rem] md:-mt-[7rem]"}
        heading={{
          ...cardsStyle[3].heading,
          title: fourthCard.heading.title,
        }}
        subHeading={{
          ...cardsStyle[3].subHeading,
          title: fourthCard.subHeading.title,
        }}
        containerClasses={"md:w-[29.9rem] md:h-[23.1rem]"}
        bgImage={cardsStyle[3].bgImage}
        itemsCenter={cardsStyle[3].itemsCenter}
        boxPaddingTop={cardsStyle[3].boxPaddingTop}
        changeCard={changeCard}
      />
      <SelectClubCard
        image={{
          classes: `md:w-[5.9rem] md:h-[5.9rem] md:-mt-[3rem]`,
          name: fifthCard.image.name,
        }}
        heading={{
          ...cardsStyle[4].heading,
          title: fifthCard.heading.title,
        }}
        subHeading={{
          ...cardsStyle[4].subHeading,
          title: fifthCard.subHeading.title,
        }}
        containerClasses={"md:w-[16.1rem] md:h-[14.7rem]"}
        bgImage={cardsStyle[4].bgImage}
        itemsCenter={cardsStyle[4].itemsCenter}
        boxPaddingTop={cardsStyle[4].boxPaddingTop}
        changeCard={changeCard}
      />
    </>
  );
}
