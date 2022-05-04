// Components
import Animated from "components/animation/Animated";
import Image from "components/html/Image1";
import Text from "components/html/Text1";

export default function SelectClubCard({ cardsInfo }) {
  const { logo, name, venue, classNames, toggleAnimation } = cardsInfo;
  const { imageCls, headingCls, subHeadingCls, containerCls } = classNames;
  return (
    <div className={containerCls}>
      <div className={`flex absolute w-full flex-col items-center`}>
        {/*Logo*/}
        <Animated toggleAnimation={toggleAnimation}>
          <Image src={logo} className={imageCls} alt={""} />
        </Animated>
        {/*Name*/}
        <Animated
          toggleAnimation={toggleAnimation}
          containerCls={"sm:text-center"}
        >
          <Text title={name} className={headingCls} />
        </Animated>
        {/*Venue*/}
        <Animated
          toggleAnimation={toggleAnimation}
          containerCls={"sm:text-center"}
        >
          <Text title={venue} className={subHeadingCls} />
        </Animated>
      </div>
    </div>
  );
}
