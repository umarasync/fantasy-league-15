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
import {buildClubs} from "utils/playersHelper";

export default function (){

    // States
    const router = useRouter();
    const dispatch = useDispatch();
    const [clubs, setClubs] = useState([])
    const playersData = useSelector(({ players }) => players.playersData);
    const allTeams = useSelector(({ teams }) => teams.allTeams);
    const teamAlreadyExists = useSelector(({ auth }) => auth.user.fantasyTeamId);

    // Api-Calling
    useEffect(() => {

        if (teamAlreadyExists) {return router.push('/my_squad_game_week')}
        // Fetch-Players
        dispatch(getPlayers(50, 0, { teamId: { eq: "" } }, { value: "DESC" }));

        /** Fetch teams if not already in state **/
        if(!allTeams){
            dispatch(getAllTeams());
        }else {
            setClubs(buildClubs(allTeams))
        }
    }, []);

    useEffect(() => {
        if(!allTeams || teamAlreadyExists) return
        setClubs(buildClubs(allTeams))
    }, [allTeams])

    if(!playersData || !clubs.length || teamAlreadyExists) return (<Loader/>)

    return (
        <BuildTeamPlayers
            players={playersData}
            clubs={clubs}
        />
    )
}