// Packages
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

// Components
import BuildTeamPlayers from "components/layout/BuildTeamPlayers";

// Constants
import  { PLAYERS } from "constants/data/players"
import {CLUBS} from "constants/data/filters";

// Redux
import {getPlayers} from "redux/Players/api";

export default function (){

    const dispatch = useDispatch();

    const playersData = useSelector(
      ({ players }) => players.playersData
    );

    useEffect(() => {
      dispatch(getPlayers(50, 0, { teamId: { eq: "" } }, { value: "DESC" }));
    }, []);


    if(!playersData) return null

    return (
        <BuildTeamPlayers
            players={playersData}
            clubs={CLUBS}
        />
    )
}