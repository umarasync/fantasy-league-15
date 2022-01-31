// Components
import SelectClubCard from "components/selectClub/SelectClubCard";

// Constants
import cardsStyle from "styles/cardsStyle";

export default function CardSection({ cardData, changeCard }) {
  return (
    <>
      {cardData && cardData.length > 0
        ? cardData?.map((Card, i) => {
            return (
              <>
                <SelectClubCard
                  image={
                    i == 2 //2 means the center selected team
                      ? { ...cardsStyle[2].image, name: Card.logo }
                      : { ...cardsStyle[0].image, name: Card.logo }
                  }
                  heading={
                    i == 2 //2 means the center selected team
                      ? { ...cardsStyle[2].heading, title: Card.name }
                      : { ...cardsStyle[0].heading, title: Card.name }
                  }
                  subHeading={
                    i == 2 //2 means the center selected team
                      ? { ...cardsStyle[2].subHeading, title: Card.venue }
                      : { ...cardsStyle[0].subHeading, title: Card.venue }
                  }
                  key={i}
                  containerStyle={ i == 2 ? cardsStyle[2].containerStyle : cardsStyle[1].containerStyle}
                  bgImage={ i == 2 ? cardsStyle[2].bgImage : cardsStyle[1].bgImage}
                  itemsCenter={ i == 2 ? cardsStyle[2].itemsCenter : cardsStyle[1].itemsCenter}
                  boxPaddingTop={ i == 2 ? cardsStyle[2].boxPaddingTop : cardsStyle[1].boxPaddingTop}
                />
                ;
              </>
            );
          })
        : ""}
      {/* <SelectClubCard
                image = {{...cardsStyle[1].image, name: secondCard.image.name, nextName: nextSecondCard.image.name}}
                heading = {{...cardsStyle[1].heading, title: secondCard.heading.title, nextTitle: nextSecondCard.heading.title}}
                subHeading = {{...cardsStyle[1].subHeading, title: secondCard.subHeading.title, nextTitle: nextSecondCard.subHeading.title}}
                containerStyle={cardsStyle[1].containerStyle}
                bgImage={cardsStyle[1].bgImage}
                itemsCenter={cardsStyle[1].itemsCenter}
                boxPaddingTop={cardsStyle[1].boxPaddingTop}

                changeCard={changeCard}
            />
            <SelectClubCard
                image = {{...cardsStyle[2].image, name: thirdCard.image.name, nextName: nextThirdCard.image.name}}
                heading = {{...cardsStyle[2].heading, title: thirdCard.heading.title, nextTitle: nextThirdCard.heading.title}}
                subHeading = {{...cardsStyle[2].subHeading, title: thirdCard.subHeading.title, nextTitle: nextThirdCard.subHeading.title}}
                containerStyle={cardsStyle[2].containerStyle}
                bgImage={cardsStyle[2].bgImage}
                itemsCenter={cardsStyle[2].itemsCenter}
                boxPaddingTop={cardsStyle[2].boxPaddingTop}

                changeCard={changeCard}
            />
            <SelectClubCard
                image = {{...cardsStyle[3].image, name: fourthCard.image.name, nextName: nextFourthCard.image.name}}
                heading = {{...cardsStyle[3].heading, title: fourthCard.heading.title, nextTitle: nextFourthCard.heading.title}}
                subHeading = {{...cardsStyle[3].subHeading, title: fourthCard.subHeading.title, nextTitle: nextFourthCard.subHeading.title}}
                containerStyle={cardsStyle[3].containerStyle}
                bgImage={cardsStyle[3].bgImage}
                itemsCenter={cardsStyle[3].itemsCenter}
                boxPaddingTop={cardsStyle[3].boxPaddingTop}

                changeCard={changeCard}
            />
            <SelectClubCard
                image = {{...cardsStyle[4].image, name: fifthCard.image.name, nextName: nextFifthCard.image.name}}
                heading = {{...cardsStyle[4].heading, title: fifthCard.heading.title, nextTitle: nextFifthCard.heading.title}}
                subHeading = {{...cardsStyle[4].subHeading, title: fifthCard.subHeading.title, nextTitle: nextFifthCard.subHeading.title}}
                containerStyle={cardsStyle[4].containerStyle}
                bgImage={cardsStyle[4].bgImage}
                itemsCenter={cardsStyle[4].itemsCenter}
                boxPaddingTop={cardsStyle[4].boxPaddingTop}

                changeCard={changeCard}
            /> */}
    </>
  );
}
