// Packages
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

// Components
import BuildTeamPlayers from "components/layout/BuildTeamPlayers";

// Constants
import {CLUBS} from "constants/data/filters";

// Redux
import {getPlayers} from "redux/Players/api";

// Loaders
import Loader from "components/loaders/Loader";

export default function (){

    const dispatch = useDispatch();

    const playersData = useSelector(
      ({ players }) => players.playersData
    );

    useEffect(() => {
      dispatch(getPlayers(50, 0, { teamId: { eq: "" } }, { value: "DESC" }));
    }, []);

    if(!playersData) return (<Loader/>)

    return (
        <BuildTeamPlayers
            players={playersData}
            clubs={CLUBS}
        />
    )
}