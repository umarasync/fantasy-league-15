// Packages
import {useEffect, useState} from "react";

// Components
import Layout from "components/layout/index";
import MySquadLeftSection from "components/mySquad/MySquadLeftSection";
import Div from "components/html/Div";
import InfoBoard from "components/mySquad/InfoBoard";
import MySquadFooterBar from "components/mySquad/MySquadFooterBar";

// Utils
import {clone} from "utils/helpers";
import {resetPlayers, setInitialClickedIcons, TOTAL_POINTS} from "utils/mySquad";
import {handlePlayerTransfer as HPT, DIAMOND_UP_GREEN} from "utils/mySquad";

// Constants
import SELECTED_PLAYERS from "constants/data/selectedPlayers";
import {INITIAL} from "constants/animationStates";

export default function MySquadGameWeek () {

    const SELECTED_PLAYERS_INITIAL = clone(SELECTED_PLAYERS)

    const [pickedPlayers, setPickedPlayers] = useState([])
    const [savedPlayers, setSavedPlayers] = useState([])
    const [transferInProgress, setTransferInProgress] = useState(false)
    const [activeFilter, setActiveFilter] = useState(TOTAL_POINTS)
    const [changeFormation, setChangeFormation] = useState(INITIAL)

    const handlePlayerTransfer = (player, arrayIndex) => {
        if(player.clickedIcon === DIAMOND_UP_GREEN) return
        const players = HPT({
            player,
            arrayIndex,
            pickedPlayers,
            setChangeFormation,
            setTransferInProgress
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

    const handleCancel = () => {
        setPickedPlayers(savedPlayers)
        setTransferInProgress(false)
    }

    const handleSave = () => {
        const players = resetPlayers(pickedPlayers)
        setPickedPlayers(players)
        setSavedPlayers(players)
        setTransferInProgress(false)
        // setChangeFormation(INITIAL)
    }

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
                <MySquadFooterBar
                    transferInProgress={transferInProgress}
                    onBenchBoost={()=>false}
                    onTripleCaptain={()=>false}
                    onMakeTransfers={()=>false}
                    onCancel={handleCancel}
                    onSave={handleSave}
                />
            </Div>
        </Layout>
    )
}


