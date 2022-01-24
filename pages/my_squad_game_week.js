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
import {resetPlayers, setPlayersAdditionalData, TOTAL_POINTS} from "utils/mySquad";
import {handlePlayerTransfer as HPT, DIAMOND_UP_GREEN} from "utils/mySquad";

// Constants
import SELECTED_PLAYERS from "constants/data/selectedPlayers";
import {INITIAL} from "constants/animations";
import PlayerInfoModal from "components/modals/PlayerInfoModal";

export default function MySquadGameWeek () {

    const SELECTED_PLAYERS_INITIAL = clone(SELECTED_PLAYERS)

    const [pickedPlayers, setPickedPlayers] = useState([])
    const [player, setPlayer] = useState({})
    const [savedPlayers, setSavedPlayers] = useState([])
    const [transferInProgress, setTransferInProgress] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState(TOTAL_POINTS)
    const [changeFormation, setChangeFormation] = useState(INITIAL)
    const CAPTAIN = 'captain'
    const VICE_CAPTAIN = 'viceCaptain'

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

    // For Player Info Modal: Start
    const handlePlayerClick = (player, arrayIndex) => {
        setPlayer({...player})
    }
    useEffect(() => {
        setShowModal(true)
    }, [player])
    // For Player Info Modal: Ends

    useEffect(() => {
            if(!pickedPlayers.length) return
            const $pickedPlayers = pickedPlayers.map((player) => {
                player.activeFilter = activeFilter
                return player
            })
            setPickedPlayers($pickedPlayers)
    }, [activeFilter])

    useEffect(() => {
        const players = setPlayersAdditionalData(SELECTED_PLAYERS_INITIAL)
        setPickedPlayers(players)
        setSavedPlayers(players)
        setShowModal(false)
    }, [])

    const handleCancel = () => {
        setPickedPlayers(savedPlayers)
        setTransferInProgress(false)
    }


    const handleMakeCaptain = (player) => {
        handleCaptainChange(player, CAPTAIN)
    }

    const handleMakeViceCaptain = (player) => {
        handleCaptainChange(player, VICE_CAPTAIN)
    }

    const handleCaptainChange = (player, v) => {
        const $pickedPlayers = [ ...pickedPlayers ]
        const previousCaptainIndex = $pickedPlayers.findIndex(p => p[v] === true)
        const captainToBeIndex = $pickedPlayers.findIndex(p => p.id === player.id)

        if(previousCaptainIndex !== -1) {
            $pickedPlayers[previousCaptainIndex][v] = false
        }

        $pickedPlayers[captainToBeIndex][v] = true
        if(v === CAPTAIN) {
            $pickedPlayers[captainToBeIndex][VICE_CAPTAIN] = false
        }else {
            $pickedPlayers[captainToBeIndex][CAPTAIN] = false
        }

        setPickedPlayers($pickedPlayers)
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
                <PlayerInfoModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    player={player}
                    onMakeCaptain={handleMakeCaptain}
                    onMakeViceCaptain={handleMakeViceCaptain}
                />
            </Div>
        </Layout>
    )
}


