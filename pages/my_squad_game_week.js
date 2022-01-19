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
import {setInitialClickedIcons} from "utils/mySquad";

// Constants
import SELECTED_PLAYERS from "constants/data/selectedPlayers";
import {SELECTED_PLAYERS as SP} from "constants/data/players";
import {POSITION_GK} from "../constants/data/filters";
import {ELEVEN, ZERO} from "constants/arrayIndexes";

// Utils
import {handlePlayerTransfer as HPT, DIAMOND_UP_GREEN} from "utils/mySquad";


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
    const [savedPlayers, setSavedPlayers] = useState([])

    // Footer Bar States
    const [autoPickDisabled, setAutoPickDisabled] = useState(false)
    // const [transferInProgress, setTransferInProgress] = useState({
    //     state: false,
    //     forPosition: ''
    // })

    const [transferInProgress, setTransferInProgress] = useState(false)

    const handlePlayerTransfer = (player, arrayIndex) => {

        if(player.clickedIcon === DIAMOND_UP_GREEN) return

        const players = HPT({
            player,
            arrayIndex,
            pickedPlayers
        })

        setPickedPlayers(players)
    }

    useEffect(() => {
        const players = setInitialClickedIcons(SELECTED_PLAYERS_INITIAL)
        setPickedPlayers(players)
        setSavedPlayers(players)
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
                            onPlayerChange={(p, i) => handlePlayerTransfer(p, i)}
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


