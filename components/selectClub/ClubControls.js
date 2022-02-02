// Components
import Button from "components/html/Button";
import Div from "components/html/Div";
import Image from "components/html/Image";

export default function clubControls({
     onControlsClick,
     onNextClick
 }){
    return (
        <Div center>
            <Div mt={-35} zIndex={1} mb={80}>
                <Button
                    w={318}
                    h={70}
                    title={'select'}
                    onClick={onNextClick}
                />
                <Div className="flex justify-center" mt={40}>
                    <Image
                        src={'/images/left_arrow_select_club.png'}
                        w={60}
                        h={60}
                        alt={''}
                        cursor={'pointer'}
                        mr={10}
                        onClick={() => onControlsClick(true)}
                    />
                    <Image
                        src={'images/right_arrow_select_club.png'}
                        w={60}
                        h={60}
                        alt={''}
                        cursor={'pointer'}
                        ml={10}
                        onClick={() => onControlsClick()}
                    />
                </Div>
            </Div>
        </Div>
    )
}