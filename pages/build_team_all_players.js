// Packages
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";

// Components
import BuildTeamPlayers from "components/layout/BuildTeamPlayers";

// Actions
import {getPlayers} from "redux/Players/api";
import {getAllTeams} from "redux/Teams/api";

// Loaders
import Loader from "components/loaders/Loader";

// Utils
import {isEmpty} from "utils/helpers";
import {buildClubs} from "utils/playersHelper";

export default function (){

    // States
    const router = useRouter();
    const dispatch = useDispatch();
    const [clubs, setClubs] = useState([])
    const [fromMakeTransfer, setFromMakeTransfer] = useState(true)
    const playersData = useSelector(({ players }) => players.playersData);
    const teamAlreadyExists = useSelector(({ auth }) => auth.user.fantasyTeamId);
    const playersPerPage = useSelector(({ players }) => players.playersPerPage);
    const currentPage = useSelector(({ players }) => players.currentPage);
    const redirectToMySquadPage = teamAlreadyExists && !router.query.makeTransfer

    const initialOffsetShouldBeZero = playersPerPage * currentPage

    const runDidMount = async () => {
        if (redirectToMySquadPage) { return router.push('/my_squad_game_week')}
        setFromMakeTransfer(false)
        dispatch(getPlayers(playersPerPage, initialOffsetShouldBeZero, { teamId: { eq: "" } }, { value: "DESC" }));
        const {success, data} = await dispatch(getAllTeams());
        if(!success) return
        setClubs(buildClubs(data))
    }
    useEffect(() => {
        runDidMount()
    }, []);

    if(isEmpty(playersData) || isEmpty(clubs) || fromMakeTransfer) return (<Loader/>)

    return (
        <BuildTeamPlayers
            players={playersData}
            clubs={clubs}
        />
    )
}