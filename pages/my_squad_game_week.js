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
import {setInitialClickedIcons, TOTAL_POINTS} from "utils/mySquad";

// Constants
import SELECTED_PLAYERS from "constants/data/selectedPlayers";

// Utils
import {handlePlayerTransfer as HPT, DIAMOND_UP_GREEN} from "utils/mySquad";

export default function MySquadGameWeek () {


    const SELECTED_PLAYERS_INITIAL = clone(SELECTED_PLAYERS)

    const [pickedPlayers, setPickedPlayers] = useState([])
    const [savedPlayers, setSavedPlayers] = useState([])
    const [transferInProgress, setTransferInProgress] = useState(false)
    const [activeFilter, setActiveFilter] = useState(TOTAL_POINTS)
    const [changeFormation, setChangeFormation] = useState(false)

    const handlePlayerTransfer = (player, arrayIndex) => {
        if(player.clickedIcon === DIAMOND_UP_GREEN) return
        const players = HPT({
            player,
            arrayIndex,
            pickedPlayers,
            setChangeFormation
        })
        setPickedPlayers(players)
    }

    useEffect(() => {
            if(!pickedPlayers.length) return
            const $pickedPlayers = pickedPlayers.map((player) => {
                player.activeFilter = activeFilter
                return player
            })
            setPickedPlayers($pickedPlayers)
    }, [activeFilter])

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
                            handleFilterButtonClick={(v) => setActiveFilter(v)}
                            pickedPlayers={pickedPlayers}
                            onPlayerChange={(p, i) => handlePlayerTransfer(p, i)}
                            changeFormation={changeFormation}
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


