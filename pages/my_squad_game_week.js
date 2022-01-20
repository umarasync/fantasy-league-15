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
import PlayerInfoModal from "../components/modals/PlayerInfoModal";

export default function MySquadGameWeek () {

    const SELECTED_PLAYERS_INITIAL = clone(SELECTED_PLAYERS)

    const [pickedPlayers, setPickedPlayers] = useState([])
    const [savedPlayers, setSavedPlayers] = useState([])
    const [transferInProgress, setTransferInProgress] = useState(false)
    const [showModal, setShowModal] = useState(false);
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

    const handlePlayerClick = (player, arrayIndex) => {
        setShowModal(true)
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
        const players = resetPlayers({players: pickedPlayers, activeFilter})
        setPickedPlayers(players)
        setSavedPlayers(players)
        setTransferInProgress(false)
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
                            onPlayerChange={handlePlayerTransfer}
                            changeFormation={changeFormation}
                            onPlayerClick={handlePlayerClick}
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
                {/*<PlayerInfoModal show={showModal} onClose={() => setShowModal(false)}/>*/}
            </Div>
        </Layout>
    )
}


