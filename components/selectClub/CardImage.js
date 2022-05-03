// Components
import Image from "components/html/Image";
import Animated from "components/animation/Animated";

export default function CardImage({ changeCard, image, containerStyle }) {
  return (
    <div className="relative w-full flex justify-center" style={containerStyle}>
      <Animated toggleAnimation={changeCard}>
        <Image src={image.name} w={image.width} h={image.height} alt={"-"} />
      </Animated>
    </div>
  );
}
