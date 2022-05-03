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
          <Image src={logo} cls={imageCls} />
        </Animated>
        {/*Name*/}
        <Animated
          toggleAnimation={toggleAnimation}
          containerCls={"sm:text-center"}
        >
          <Text title={name} cls={headingCls} />
        </Animated>
        {/*Venue*/}
        <Animated
          toggleAnimation={toggleAnimation}
          containerCls={"sm:text-center"}
        >
          <Text title={venue} cls={subHeadingCls} />
        </Animated>
      </div>
    </div>
  );
}
