// Components
import Div from "components/html/Div";
import Image from "components/html/Image";

export default function LeagueBoardControls({
    onPrevious,
    onNext
}) {
    return (
        <div>
            <Div position='absolute' top={1} left={40}>
                <Image w={60} h={60} src={'/images/arrow-prev.png'} cursor={'pointer'} onClick={onPrevious}/>
            </Div>
            <Div position='absolute' top={1} right={40}>
                <Image w={60} h={60} src={'/images/arrow-next.png'} cursor={'pointer'} onClick={onNext}/>
            </Div>
        </div>
    )
}