// Packages
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

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
import R from "utils/getResponsiveValue";

// Constants
import {INITIAL} from "constants/animations";
import {getCurrentWeekInfo, getPublicLeagues} from "constants/data/leaguesAndRanking";
import ProfileSettingsSideDrawer from "../components/profileSettings/ProfileSettingsSideDrawer";

// Styles
const getStyles = (R) => {
    return {
        sideDrawerContainer: {
            paddingBottom: R(100)
        }
    }
}

export default function MySquadGameWeek () {

    const router = useRouter()

    const STYLES = {...getStyles(R)}


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

    // Info-Board
    const [currentGameWeekInfo, setCurrentGameWeekInfo] = useState({})

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
        const substitutePlayer = pickedPlayers.filter(p => p.isSubstitutePlayer)
        setBenchBoostPlayers([...substitutePlayer])
        setShowBenchBoostModal(true)
    }

    const handleBenchBoostConfirmed = () => {
        setBenchBoostDisabled(true)
        setBenchBoostApplied(true)
        setShowBenchBoostModal(false)
    }

    const handleBenchBoostDisable = () => {
        if (benchBoostApplied) {
            setBenchBoostDisabled(true)
        } else {
            setBenchBoostDisabled(false)
        }
    }

    const handleMakeTransfer = () => {
        router.push('/build_team_all_players')
    }

    // Picked-Players-Change
    useEffect(() => {
        handleTripleCaptainDisable()
        handleBenchBoostDisable()
    }, [pickedPlayers])

    // Did-Mount
    useEffect(() => {
        // TODO:LOCAL_STORAGE_FOR_TESTING:START
        const teamData = JSON.parse(localStorage.getItem('teamData'))
        // TODO:LOCAL_STORAGE_FOR_TESTING:ENDS

        if (!teamData) {
            return router.push('/build_team_all_players')
        }

        const players = setPlayersAdditionalData(teamData.pickedPlayers)
        setPickedPlayers(players)
        setSavedPlayers(players)
        setShowPlayerInfoModal(false)
        setShowTripleCaptainModal(false)

        // Setting-Info-Board-State
        setCurrentGameWeekInfo({
            toggleAnimation: false,
            data: clone(getCurrentWeekInfo())
        })
    }, [])

    if (pickedPlayers.length === 0) {
        return null
    }

    return (
        <Layout title="My Squad">
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
                    <Div className="w-[38%] flex justify-center">
                        {
                            !isEmpty(currentGameWeekInfo) && (
                                <InfoBoard gameWeekInfo={currentGameWeekInfo}/>
                            )
                        }
                        <ProfileSettingsSideDrawer
                            containerStyle={STYLES.sideDrawerContainer}
                        />
                    </Div>
                </div>

                {/*Footer-Bar*/}
                <MySquadFooterBar
                    transferInProgress={transferInProgress}
                    onBenchBoost={handleBenchBoostModal}
                    onTripleCaptain={handleShowTripleCaptainModal}
                    onMakeTransfers={handleMakeTransfer}
                    tripleCaptainDisabled={tripleCaptainDisabled}
                    benchBoostDisabled={benchBoostDisabled}
                    onCancel={handleCancel}
                    onSave={handleSave}
                />
                {/*Modals*/}
                <PlayerInfoModal
                    show={showPlayerInfoModal}
                    onClose={() => setShowPlayerInfoModal(false)}
                    player={playerInfoPlayer}
                    onMakeCaptain={handleMakeCaptain}
                    onMakeViceCaptain={handleMakeViceCaptain}
                />
                <TripleCaptainModal
                    show={showTripleCaptainModal}
                    onCancel={() => setShowTripleCaptainModal(false)}
                    player={tripleCaptainPlayer}
                    onConfirmed={handleTripleCaptainConfirmed}
                />
                <BenchBoostModal
                    show={showBenchBoostModal}
                    onCancel={() => setShowBenchBoostModal(false)}
                    players={benchBoostPlayers}
                    onConfirmed={handleBenchBoostConfirmed}
                />
            </Div>
        </Layout>
    )
}


