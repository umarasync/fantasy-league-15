// Components
import Image from "components/html/Image1";
import Animated from "components/animation/Animated";

export default function CardImage({ changeCard, image, containerStyle }) {
  return (
    <Animated toggleAnimation={changeCard}>
      <Image src={image.name} classes={image.classes} />
    </Animated>
  );
}
