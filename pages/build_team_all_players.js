// Packages
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

// Components
import BuildTeamPlayers from "components/layout/BuildTeamPlayers";

// Constants
import {CLUBS} from "constants/data/filters";

// Actions
import {getPlayers} from "redux/Players/api";
import {getAllTeams} from "redux/Teams/api";

// Loaders
import Loader from "components/loaders/Loader";
import {buildClubs} from "../utils/playersHelper";

export default function (){

    // States
    const dispatch = useDispatch();
    const [clubs, setClubs] = useState([])
    const playersData = useSelector(({ players }) => players.playersData);
    const allTeams = useSelector(({ teams }) => teams.allTeams);

    // Api-Calling
    useEffect(() => {

        // Fetch-Players
        dispatch(getPlayers(50, 0, { teamId: { eq: "" } }, { value: "DESC" }));

        // Fetch-Teams-If-Not-Already-In-State
        if(!allTeams){
            dispatch(getAllTeams());
        }else {
            setClubs(buildClubs(allTeams))
        }

    }, []);


    useEffect(() => {
        if(!allTeams) return
        setClubs(buildClubs(allTeams))
    }, [allTeams])

    if(!playersData || !clubs.length) return (<Loader/>)

    console.log({
        playersData,
        clubs
    })

    return (
        <BuildTeamPlayers
            players={playersData}
            clubs={clubs}
        />
    )
}