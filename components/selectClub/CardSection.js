
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

    nextFirstCard,
    nextSecondCard,
    nextThirdCard,
    nextFourthCard,
    nextFifthCard,

    changeCard,
}){
    return (
        <>
            <SelectClubCard
                image = {
                    {
                        ...cardsStyle[0].image,
                        name: firstCard.image.name,
                        nextName: nextFirstCard.image.name}
                }
                heading = {{...cardsStyle[0].heading, title: firstCard.heading.title, nextTitle: nextFirstCard.heading.title}}
                subHeading = {{...cardsStyle[0].subHeading, title: firstCard.subHeading.title, nextTitle: nextFirstCard.subHeading.title}}
                containerClasses={cardsStyle[0].containerClasses}
                containerStyle={cardsStyle[0].containerStyle}
                bgImage={cardsStyle[0].bgImage}
                itemsCenter={cardsStyle[0].itemsCenter}
                boxPaddingTop={cardsStyle[0].boxPaddingTop}

                changeCard={changeCard}
            />
            <SelectClubCard
                image = {{...cardsStyle[1].image, name: secondCard.image.name, nextName: nextSecondCard.image.name}}
                heading = {{...cardsStyle[1].heading, title: secondCard.heading.title, nextTitle: nextSecondCard.heading.title}}
                subHeading = {{...cardsStyle[1].subHeading, title: secondCard.subHeading.title, nextTitle: nextSecondCard.subHeading.title}}
                containerClasses={cardsStyle[1].containerClasses}
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
                containerClasses={cardsStyle[2].containerClasses}
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
                containerClasses={cardsStyle[3].containerClasses}
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
                containerClasses={cardsStyle[4].containerClasses}
                containerStyle={cardsStyle[4].containerStyle}
                bgImage={cardsStyle[4].bgImage}
                itemsCenter={cardsStyle[4].itemsCenter}
                boxPaddingTop={cardsStyle[4].boxPaddingTop}

                changeCard={changeCard}
            />
        </>
    )

}