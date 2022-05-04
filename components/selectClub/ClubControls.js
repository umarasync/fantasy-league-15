// Components
import Button from "components/html/Button";
import Button1 from "components/html/Button1";
import Image from "components/html/Image1";

export default function clubControls({ onControlsClick, onNextClick }) {
  return (
    <div className={"flex items-center justify-center"}>
      <div className={"-mt-[3.5rem] z-[1] mb-[8rem]"}>
        {/*<Button1*/}
        {/*  title={"select"}*/}
        {/*  className={"w-[31.8rem]"}*/}
        {/*  onClick={onNextClick}*/}
        {/*/>*/}
        <Button w={318} h={70} title={"select"} onClick={onNextClick} />
        <div className="flex justify-center mt-[4rem]">
          <Image
            src={"/images/left_arrow_select_club.png"}
            className={`w-[6rem] h-[6rem] pointer mr-[1rem]`}
            alt={""}
            onClick={() => onControlsClick(true)}
          />
          <Image
            src={"/images/right_arrow_select_club.png"}
            className={`w-[6rem] h-[6rem] pointer ml-[1rem]`}
            alt={""}
            onClick={() => onControlsClick(true)}
          />
        </div>
      </div>
    </div>
  );
}
