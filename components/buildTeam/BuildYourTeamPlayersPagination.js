// Packages
import {useState} from "react";
import {useDispatch} from "react-redux";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";

// Actions
import {getPlayers} from "redux/Players/api";

export default function BuildYourTeamPlayersPagination(){

    const dispatch = useDispatch()
    const [playerPerPage, setPlayersPerPage] = useState(30)
    const [currentPage, setCurrentPage] = useState(1)

    const nextPage = async () => {
        const res = await dispatch(getPlayers(playerPerPage, playerPerPage * currentPage, { teamId: { eq: "" } }, { value: "DESC" }));

        setCurrentPage(currentPage + 1)
    }

    return (
        <Div center mb={20}>
            <Text text={'Previous'} fs={20} inline cursor={'pointer'}/>
            <Text text={currentPage} fs={20}/>
            <Text ml={20} text={'Next'} fs={20} inline cursor={'pointer'} onClick={nextPage}/>
        </Div>
    )
}