// Components
import Image from "components/html/Image";
import Div from "components/html/Div";

const PlayerPlaceholder = ({
   placeholderText
}) => {
    return (
        <div className={'flex flex-col items-center'}>
            <Image src={`/images/player_empty.png`} w={40} h={40} alt={''}/>
            <Div
                pr={10}
                mt={4}
                pl={10}
                pt={8}
                pb={8}
                br={40}
                className={'items-center justify-center cursor-pointer primary-button-color text-white whitespace-nowrap'}

            >
                <span>{placeholderText}</span><br/>
            </Div>
        </div>
    )
}

export default PlayerPlaceholder