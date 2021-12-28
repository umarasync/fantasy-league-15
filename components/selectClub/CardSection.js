
// Components
import SelectClubCard from "components/selectClub/SelectClubCard";

// Constants
import cardsData from "constants/data/cardsData";

export default function CardSection({
    firstCard,
    secondCard,
    thirdCard,
    fourthCard,
    fifthCard
}){
    return (
        <>
            <SelectClubCard
                image = {{...cardsData[0].image, name: firstCard.image.name}}
                heading = {{...cardsData[0].heading, title: firstCard.heading.title}}
                subHeading = {{...cardsData[0].subHeading, title: firstCard.subHeading.title}}
                containerStyle={cardsData[0].containerStyle}
                bgImage={cardsData[0].bgImage}
                itemsCenter={cardsData[0].itemsCenter}
                boxPaddingTop={cardsData[0].boxPaddingTop}
            />
            <SelectClubCard
                image = {{...cardsData[1].image, name: secondCard.image.name}}
                heading = {{...cardsData[1].heading, title: secondCard.heading.title}}
                subHeading = {{...cardsData[1].subHeading, title: secondCard.subHeading.title}}
                containerStyle={cardsData[1].containerStyle}
                bgImage={cardsData[1].bgImage}
                itemsCenter={cardsData[1].itemsCenter}
                boxPaddingTop={cardsData[1].boxPaddingTop}
            />
            <SelectClubCard
                image = {{...cardsData[2].image, name: thirdCard.image.name}}
                heading = {{...cardsData[2].heading, title: thirdCard.heading.title}}
                subHeading = {{...cardsData[2].subHeading, title: thirdCard.subHeading.title}}
                containerStyle={cardsData[2].containerStyle}
                bgImage={cardsData[2].bgImage}
                itemsCenter={cardsData[2].itemsCenter}
                boxPaddingTop={cardsData[2].boxPaddingTop}
            />
            <SelectClubCard
                image = {{...cardsData[3].image, name: fourthCard.image.name}}
                heading = {{...cardsData[3].heading, title: fourthCard.heading.title}}
                subHeading = {{...cardsData[3].subHeading, title: fourthCard.subHeading.title}}
                containerStyle={cardsData[3].containerStyle}
                bgImage={cardsData[3].bgImage}
                itemsCenter={cardsData[3].itemsCenter}
                boxPaddingTop={cardsData[3].boxPaddingTop}
            />
            <SelectClubCard
                image = {{...cardsData[4].image, name: fifthCard.image.name}}
                heading = {{...cardsData[4].heading, title: fifthCard.heading.title}}
                subHeading = {{...cardsData[4].subHeading, title: fifthCard.subHeading.title}}
                containerStyle={cardsData[4].containerStyle}
                bgImage={cardsData[4].bgImage}
                itemsCenter={cardsData[4].itemsCenter}
                boxPaddingTop={cardsData[4].boxPaddingTop}
            />
        </>
    )

}