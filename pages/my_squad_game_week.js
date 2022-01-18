// Packages
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

// Components
import Layout from "components/layout/index";
import MySquadLeftSection from "components/mySquad/MySquadLeftSection";
import Div from "components/html/Div";
import InfoBoard from "components/mySquad/InfoBoard";

// Utils
import R from "utils/getResponsiveValue";
import {clone} from "utils/helpers";

// Constants
import SELECTED_PLAYERS from "constants/data/selectedPlayers";
import {SELECTED_PLAYERS as SP} from "constants/data/players";
import {POSITION_GK} from "../constants/data/filters";
import {setInitialClickedIcons} from "../utils/mySquad";

// Styles
const getStyles = (R) => {
    return {}
}

export default function MySquadGameWeek () {


    const STYLES =  { ... getStyles(R) }

    const router= useRouter()

    // Initial States
    const TOTAL_BUDGET = 100000000;
    // const TOTAL_BUDGET = 1000000;

    // Fields States
    const SELECTED_PLAYERS_INITIAL = clone(SELECTED_PLAYERS)

    const [pickedPlayers, setPickedPlayers] = useState([])

    // Footer Bar States
    const [autoPickDisabled, setAutoPickDisabled] = useState(false)
    const [transferInProgress, setTransferInProgress] = useState({
        state: false,
        forPosition: null
    })

    const handlePlayerChange = (player) => {
        console.log("player -======", player)
        setTransferInProgress({
            state: true,
            forPosition: player.position
        })
    }

    useEffect(() => {
        setPickedPlayers(setInitialClickedIcons(SELECTED_PLAYERS_INITIAL))
    }, [])

    return (
        <Layout title="Build Team All Player">
            <Div className="mx-auto relative bg-white">
                <div className={'flex'}>
                    <Div className="w-[62%]">
                        <MySquadLeftSection
                            transferInProgress={transferInProgress}
                            pickedPlayers={pickedPlayers}
                            autoPickDisabled={autoPickDisabled}
                            onPlayerChange={(p) => handlePlayerChange(p)}
                        />
                    </Div>

                    {/*Right Section*/}
                    <div className="w-[38%] flex justify-center" style={{height: 'max-content'}}>
                        <InfoBoard/>
                    </div>
                </div>
            </Div>
        </Layout>
    )
}


