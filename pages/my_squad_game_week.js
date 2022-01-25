// Packages
import {useEffect, useState} from "react";

// Components
import Layout from "components/layout/index";
import MySquadLeftSection from "components/mySquad/MySquadLeftSection";
import Div from "components/html/Div";
import InfoBoard from "components/mySquad/InfoBoard";
import MySquadFooterBar from "components/mySquad/MySquadFooterBar";
import PlayerInfoModal from "components/playerInfo/PlayerInfoModal";
import TripleCaptainModal from "components/playerInfo/TripleCaptainModal";
import BenchBoostModal from "components/playerInfo/BenchBoostModal";

// Utils
import {clone, isEmpty} from "utils/helpers";
import {
    resetPlayers,
    setPlayersAdditionalData,
    TOTAL_POINTS,
    CAPTAIN,
    VICE_CAPTAIN,
    makeCaptain
} from "utils/mySquadHelper";
import {handlePlayerTransfer as HPT, DIAMOND_UP_GREEN} from "utils/mySquadHelper";

// Constants
import SELECTED_PLAYERS from "constants/data/selectedPlayers";
import {INITIAL} from "constants/animations";

export default function MySquadGameWeek () {

    const SELECTED_PLAYERS_INITIAL = clone(SELECTED_PLAYERS)

    const [pickedPlayers, setPickedPlayers] = useState([])
    const [savedPlayers, setSavedPlayers] = useState([])
    const [transferInProgress, setTransferInProgress] = useState(false)
    const [activeFilter, setActiveFilter] = useState(TOTAL_POINTS)
    const [changeFormation, setChangeFormation] = useState(INITIAL)

    // Player-Info
    const [showPlayerInfoModal, setShowPlayerInfoModal] = useState(false);
    const [playerInfoPlayer, setPlayerInfoPlayer] = useState({})

    // Triple-Captain
    const [showTripleCaptainModal, setShowTripleCaptainModal] = useState(false);
    const [tripleCaptainDisabled, setTripleCaptainDisabled] = useState(true);
    const [tripleCaptainApplied, setTripleCaptainApplied] = useState(false);
    const [tripleCaptainPlayer, setTripleCaptainPlayer] = useState([])

    // Bench-Boost
    const [showBenchBoostModal, setShowBenchBoostModal] = useState(false);
    const [benchBoostDisabled, setBenchBoostDisabled] = useState(true);
    const [benchBoostApplied, setBenchBoostApplied] = useState(false);
    const [benchBoostPlayers, setBenchBoostPlayers] = useState([]);


    //Player-Transfer
    const handlePlayerTransfer = (player, arrayIndex) => {
        if(player.clickedIcon === DIAMOND_UP_GREEN) return
        const players = HPT({
            player,
            arrayIndex,
            pickedPlayers,
            setChangeFormation,
            setTransferInProgress,
            tripleCaptainApplied
        })
        setPickedPlayers(players)
    }
    // Player-Info-Modal
    const handleShowPlayerInfoModal = (player, arrayIndex) => {
        setPlayerInfoPlayer({...player})
    }

    useEffect(() => {
        if(isEmpty(playerInfoPlayer)) return
        setShowPlayerInfoModal(true)
    }, [playerInfoPlayer])

    // Filter-Buttons-(ex: Total pts, Price, Match)
    useEffect(() => {
            if(!pickedPlayers.length) return
            const $pickedPlayers = pickedPlayers.map((player) => {
                player.activeFilter = activeFilter
                return player
            })
            setPickedPlayers($pickedPlayers)
    }, [activeFilter])

    // Did-Mount
    useEffect(() => {
        const players = setPlayersAdditionalData(SELECTED_PLAYERS_INITIAL)
        setPickedPlayers(players)
        setSavedPlayers(players)
        setShowPlayerInfoModal(false)
        setShowTripleCaptainModal(false)
    }, [])

    // Transfer_Edit-Cancel
    const handleCancel = () => {
        setPickedPlayers(savedPlayers)
        setTransferInProgress(false)
    }

    // Transfer_Edit-Save
    const handleSave = () => {
        const players = resetPlayers({players: pickedPlayers, activeFilter})
        setPickedPlayers(players)
        setSavedPlayers(players)
        setTransferInProgress(false)
    }
    // Player info
    const handleMakeCaptain = (player) => handleCaptainChange(player, CAPTAIN)
    const handleMakeViceCaptain = (player) => handleCaptainChange(player, VICE_CAPTAIN)
    const handleCaptainChange = (player, captainType) => {
        const $pickedPlayers = makeCaptain(
            {
                $pickedPlayers: pickedPlayers,
                player,
                captainType,
            })
        setPickedPlayers($pickedPlayers)
        setSavedPlayers($pickedPlayers)
        setShowPlayerInfoModal(false)
    }

    // Triple Captain
    const handleShowTripleCaptainModal = () => {
        const captain = pickedPlayers.find(p => p.captain === true)
        if(captain === undefined) return
        setTripleCaptainPlayer([{...captain}])
        setShowTripleCaptainModal(true)
    }

    const handleTripleCaptainConfirmed = () => {
        setTripleCaptainApplied(true)
        setShowTripleCaptainModal(false)
    }

    useEffect(() => {
            if(!tripleCaptainApplied) return
            handleMakeCaptain(pickedPlayers.find(p => p.captain === true))
    }, [tripleCaptainApplied])

    const handleTripleCaptainDisable = () => {
        if(tripleCaptainApplied){
            setTripleCaptainDisabled(true)
        }else {
            setTripleCaptainDisabled(false)
        }
    }

    // Bench-Boost
    const handleBenchBoostModal = () => {
        // const notBoostedPlayers = pickedPlayers.filter(p => p.isSubstitutePlayer && !p.benchBoostApplied)
        const substitutePlayer = pickedPlayers.filter(p => p.isSubstitutePlayer)
        setBenchBoostPlayers([...substitutePlayer])
        setShowBenchBoostModal(true)
    }

    const handleBenchBoostConfirmed = () => {
        setBenchBoostDisabled(true)
        setBenchBoostApplied(true)
        setShowBenchBoostModal(false)


        // const $pickedPlayers = pickedPlayers.map(p => {
        //     if (p.isSubstitutePlayer) {
        //         p.benchBoostApplied = true
        //     }
        //     return p
        // })
        //
        // setPickedPlayers($pickedPlayers)
        // setShowBenchBoostModal(false)
    }

    const handleBenchBoostDisable = () => {

        if (benchBoostApplied) {
            setBenchBoostDisabled(true)
        } else {
            setBenchBoostDisabled(false)
        }

        // const notBoostedPlayers = pickedPlayers.filter(p => p.isSubstitutePlayer && !p.benchBoostApplied)
        // if (notBoostedPlayers.length > 0) {
        //     setBenchBoostDisabled(false)
        // } else {
        //     setBenchBoostDisabled(true)
        // }
    }

    // Picked-Players-Change
    useEffect(() => {
        handleTripleCaptainDisable()
        handleBenchBoostDisable()
    }, [pickedPlayers])

    return (
        <Layout title="Build Team All Player">
            <Div className="mx-auto relative bg-white">
                <div className={'flex'}>
                    <Div className="w-[62%]">
                        <MySquadLeftSection
                            transferInProgress={transferInProgress}
                            handleFilterButtonClick={(v) => setActiveFilter(v)}
                            tripleCaptainApplied={tripleCaptainApplied}
                            benchBoostApplied={benchBoostApplied}
                            pickedPlayers={pickedPlayers}
                            onPlayerChange={handlePlayerTransfer}
                            changeFormation={changeFormation}
                            onPlayerClick={handleShowPlayerInfoModal}
                        />
                    </Div>
                    {/*Right-Section*/}
                    <div className="w-[38%] flex justify-center" style={{height: 'max-content'}}>
                        <InfoBoard/>
                    </div>
                </div>

                {/*Footer-Bar*/}
                <MySquadFooterBar
                    transferInProgress={transferInProgress}
                    onBenchBoost={handleBenchBoostModal}
                    onTripleCaptain={handleShowTripleCaptainModal}
                    onMakeTransfers={()=>false}
                    tripleCaptainDisabled={tripleCaptainDisabled}
                    benchBoostDisabled={benchBoostDisabled}
                    onCancel={handleCancel}
                    onSave={handleSave}
                />
                {/*Modals*/}
                {/*<PlayerInfoModal*/}
                {/*    show={showPlayerInfoModal}*/}
                {/*    onClose={() => setShowPlayerInfoModal(false)}*/}
                {/*    player={playerInfoPlayer}*/}
                {/*    onMakeCaptain={handleMakeCaptain}*/}
                {/*    onMakeViceCaptain={handleMakeViceCaptain}*/}
                {/*/>*/}
                {/*<TripleCaptainModal*/}
                {/*    show={showTripleCaptainModal}*/}
                {/*    onCancel={() => setShowTripleCaptainModal(false)}*/}
                {/*    player={tripleCaptainPlayer}*/}
                {/*    onConfirmed={handleTripleCaptainConfirmed}*/}
                {/*/>*/}
                {/*<BenchBoostModal*/}
                {/*    show={showBenchBoostModal}*/}
                {/*    onCancel={() => setShowBenchBoostModal(false)}*/}
                {/*    players={benchBoostPlayers}*/}
                {/*    onConfirmed={handleBenchBoostConfirmed}*/}
                {/*/>*/}
            </Div>
        </Layout>
    )
}


