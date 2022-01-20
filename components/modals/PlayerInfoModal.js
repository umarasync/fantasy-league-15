// Packages
import {useRouter} from "next/router";

// Components
import Modal from "components/modals";
import Div from "components/html/Div"
import Header from "components/playerInfo/Header"

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

const player = {
    "id": 1,
    "image": "player1.png",
    "clubImage": "club_fc.png",
    "clubName": "FC GRONINGEN",
    "status": "fit",
    "name": "R. Nelson",
    "nextMatch": {"club": "GRO", "vs": "BEN", "matchType": "H"},
    "price": 6400000,
    "formattedPrice": "€6.4m",
    "position": "MID",
    "points": 14,
    "most_transferred": 2,
    "picked": 12,
    "pickedAsCaptain": 6,
    "recommended": true,
    "penaltyTaker": false,
    "chosen": true
}

// Styles
const getStyles = (R) => {
    return {}
}

export default function PlayerInfoModal({
   show,
   onClose
}) {
    const STYLES = {...getStyles(R)}

    const router = useRouter()

    return (
        <Modal>
            <div
                className={`${!show && 'hidden'} fixed z-10 overflow-auto top-0 left-0 w-full h-full bg-backdrop flex items-center justify-center`}>
                <Div w={482} br={12} bg={colors.white} className={'h-[74%]'}>
                     <Header player={player} onClose={onClose}/>
                </Div>
            </div>
        </Modal>
    )
}