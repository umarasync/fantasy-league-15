// Components
import CardTitle from "components/selectClub/CardTitle";
import CardSubTitle from "components/selectClub/CardSubTitle";
import CardImage from "components/selectClub/CardImage";

// Utils
import R from "utils/getResponsiveValue";
import {useEffect, useState} from "react";

export default  function SelectClubCard({
    image,
    heading,
    subHeading,
    containerClasses,
    containerStyle,
    bgImage,
    itemsCenter,
    boxPaddingTop,
    changeCard
}) {

    const [initialOpacity, setInitialOpacity] = useState(1)

    const duration = 0.5

    const fadeInOutAnimation = {
        initial: {
            opacity: initialOpacity,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: duration,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: duration,
            },
        },
    };


    useEffect(() => {
        if(initialOpacity) {
            setInitialOpacity(0)
        }
    }, [changeCard])

    return (
        <div
            className={`flex ${ itemsCenter && 'items-center'} relative ${containerClasses}`}
            style={{
                width: R(containerStyle.width),
                height: R(containerStyle.height)
            }}
        >
        <div
            className={`flex absolute w-full flex-col items-center`}
            style={{
                paddingTop: boxPaddingTop ? R(boxPaddingTop) : 0
            }}
        >
            <CardImage
                changeCard={changeCard}
                fadeInOutAnimation={fadeInOutAnimation}
                image={image}
                containerStyle={{
                    width: R(image.width),
                    height: R(image.height),
                    marginTop: R(image.mt)
             }}
            />
            <CardTitle changeCard={changeCard} fadeInOutAnimation={fadeInOutAnimation} heading={heading} />
            <CardSubTitle changeCard={changeCard} fadeInOutAnimation={fadeInOutAnimation} subHeading={subHeading} />

        </div>
        <img
            src={`/images/${bgImage}`}
            alt=""
            className="w-[100%] h-[100%]"
        />
    </div>
    )}