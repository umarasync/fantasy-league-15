// Components
import CardTitle from "components/selectClub/CardTitle";
import CardSubTitle from "components/selectClub/CardSubTitle";
import CardImage from "components/selectClub/CardImage";

// Utils
import R from "utils/getResponsiveValue";
import { useEffect, useState } from "react";
import Animated from "../animation/Animated";
import Image from "../html/Image1";
import { clone } from "../../utils/helpers";

export default function SelectClubCard({
  image,
  heading,
  subHeading,
  containerClasses,
  bgImage,
  itemsCenter,
  boxPaddingTop,
  changeCard,
}) {
  const [initialOpacity, setInitialOpacity] = useState(1);

  const duration = 0.5;

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
    if (initialOpacity) {
      setInitialOpacity(0);
    }
  }, [changeCard]);

  return (
    <div
      className={`flex ${
        itemsCenter && "items-center"
      } relative ${containerClasses}`}
    >
      <div
        className={`flex absolute w-full flex-col items-center`}
        style={{
          paddingTop: boxPaddingTop ? R(boxPaddingTop) : 0,
        }}
      >
        <Animated toggleAnimation={changeCard}>
          <Image src={image.name} classes={image.classes} />
        </Animated>

        <CardTitle
          changeCard={changeCard}
          fadeInOutAnimation={fadeInOutAnimation}
          heading={heading}
        />
        <CardSubTitle
          changeCard={changeCard}
          fadeInOutAnimation={fadeInOutAnimation}
          subHeading={subHeading}
        />
      </div>
      <img src={`/images/${bgImage}`} alt="" className="w-[100%] h-[100%]" />
    </div>
  );
}
