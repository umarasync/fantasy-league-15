// Packages
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

// Components
import Layout from "components/layout/index";
import MySquadLeftSection from "components/mySquad/MySquadLeftSection";
import Div from "components/html/Div";
import InfoBoard from "components/mySquad/InfoBoard";
import MySquadFooterBar from "components/mySquad/MySquadFooterBar";
import PlayerInfoModal from "components/playerInfo/PlayerInfoModal";
import TripleCaptainModal from "components/playerInfo/TripleCaptainModal";
import BenchBoostModal from "components/playerInfo/BenchBoostModal";
import ProfileSettingsSideDrawer from "components/profileSettings/ProfileSettingsSideDrawer";
import Loader from "components/loaders/Loader";

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
import {playerSwapHandler, DIAMOND_UP_GREEN} from "utils/mySquadHelper";
import R from "utils/getResponsiveValue";

// Constants
import {INITIAL} from "constants/animations";
import {getCurrentWeekInfo} from "constants/data/leaguesAndRanking";

// Actions
import {getFantasyTeamById, setFantasyTeamBooster, swapFantasyTeamPlayers} from "redux/FantasyTeams/api";
import {getPlayer, setFantasyTeamRole} from "redux/Players/api";
import {fantasyTeamBoosterStart, fantasyTeamSwapStart} from "redux/FantasyTeams/actionCreators";

// Styles
const getStyles = (R) => {
    return {
        sideDrawerContainer: {
            paddingBottom: R(100)
        }
    }
}

export default function MySquadGameWeek () {

    const STYLES = {...getStyles(R)}

    const router = useRouter()

    const dispatch = useDispatch()

    // Global States
    const user = useSelector(({ auth }) => auth.user);

    const [squadInfo, setSquadInfo] = useState({})
    const [savedSquad, setSavedSquadInfo] = useState({})
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
    const handlePlayerSwap = (player, arrayIndex) => {
        if(player.clickedIcon === DIAMOND_UP_GREEN) return
        const $squadInfo = playerSwapHandler({
            player,
            arrayIndex,
            squadInfo,
            setChangeFormation,
            setTransferInProgress,
            tripleCaptainApplied
        })
        setSquadInfo($squadInfo)
    }
    // Player-Info-Modal
    const handleShowPlayerInfoModal = async (player, arrayIndex) => {
        const {success, data} = await dispatch(getPlayer({playerId: player.id}))
        if(!success) return
        setPlayerInfoPlayer({...data})
    }

    useEffect(() => {
        if(isEmpty(playerInfoPlayer)) return
        setShowPlayerInfoModal(true)
    }, [playerInfoPlayer])

    /*** Filter Buttons (Total pts, Price, Match) ***/
    useEffect(() => {
            if(isEmpty(squadInfo)) return
            const squad = squadInfo.squad.map((player) => {
                player.activeFilter = activeFilter
                return player
            })
            setSquadInfo({...squadInfo, squad})
    }, [activeFilter])

    // Transfer_Edit-Cancel
    const handleCancel = () => {
        setSquadInfo(savedSquad)
        setTransferInProgress(false)
    }

    // Transfer_Edit-Save
    const handleSave = async () => {
        // Api Calling
        dispatch(fantasyTeamSwapStart())

        const substitutes = squadInfo.squad
                                .map(p => {if(p.isSubstitutePlayer){ return { id: p.id}}return false})
                                .filter(p => p !== false)
        const inputData = {
                fantasyTeamId: user.fantasyTeamId,
                captain: { id: squadInfo.squad.find(p => p.captain).id }  ,
                viceCaptain: { id: squadInfo.squad.find(p => p.viceCaptain).id },
                substitutes: substitutes
        }

        const {success, msg} = await dispatch(swapFantasyTeamPlayers(inputData))

        if (!success) { return toast.error(msg); }

        toast.success(msg);

        const squad = resetPlayers({squad: squadInfo.squad, activeFilter})

        setSquadInfo({...squadInfo, squad: [...squad]})
        setSavedSquadInfo({...squadInfo, squad: [...squad]})
        setTransferInProgress(false)
    }

    // Player info
    const handleMakeCaptain = (player) => handleCaptainChange(player, CAPTAIN)
    const handleMakeViceCaptain = (player) => handleCaptainChange(player, VICE_CAPTAIN)
    const handleCaptainChange = async (player, captainType) => {

        const squad = makeCaptain(
            {
                $squadInfo: squadInfo,
                player,
                captainType,
        })

        // Api Calling
        const inputData = {
            fantasyTeamId: user.fantasyTeamId,
            captain: { id: squad.find(p => p.captain).id }  ,
            viceCaptain: { id: squad.find(p => p.viceCaptain).id }
        }
        const {success, msg, data} = await dispatch(setFantasyTeamRole(inputData))

        if (!success) { return toast.error(msg); }

        toast.success(msg);
        setSquadInfo({...squadInfo, squad})
        setSavedSquadInfo({...squadInfo, squad})
        setShowPlayerInfoModal(false)
    }

    // Triple Captain
    const handleShowTripleCaptainModal = () => {
        const captain = squadInfo.squad.find(p => p.captain === true)
        if(captain === undefined) return
        setTripleCaptainPlayer([{...captain}])
        setShowTripleCaptainModal(true)
    }

    const handleTripleCaptainConfirmed = async () => {
        if(!await handleBenchBoost('TRIPLE_CAPTAIN')) return
        setTripleCaptainApplied(true)
        setShowTripleCaptainModal(false)
    }

    const handleTripleCaptainDisable = () => {
        if(tripleCaptainApplied){ return setTripleCaptainDisabled(true)}
        setTripleCaptainDisabled(false)
    }

    // Bench-Boost
    const handleBenchBoostModal = () => {
        const substitutePlayer = squadInfo.squad.filter(p => p.isSubstitutePlayer)
        setBenchBoostPlayers([...substitutePlayer])
        setShowBenchBoostModal(true)
    }

    // Handles Bench Boost Api Call
    const handleBenchBoost = async (type) => {
        dispatch(fantasyTeamBoosterStart())
        const dataInput = {
            fantasyTeamId: user.fantasyTeamId,
            gameweek: user.currentGameweek,
            type
        }
        const { success, msg } = await dispatch(setFantasyTeamBooster(dataInput))

        if (!success) {
            toast.error(msg);
            return success
        }
        toast.success(msg);
        return success
    }
    const handleBenchBoostConfirmed = async () => {
        if(!await handleBenchBoost('BENCH')) return
        setBenchBoostDisabled(true)
        setBenchBoostApplied(true)
        setShowBenchBoostModal(false)
    }

    const handleBenchBoostDisable = () => {
        if (benchBoostApplied) {
            return setBenchBoostDisabled(true)
        }
        setBenchBoostDisabled(false)
    }

    const handleMakeTransfer = () => {
        router.push({
            pathname: '/make_players_transfers',
            query: {
                makeTransfer: true
            }
        })
    }

    // On Booster Chip Applying
    useEffect(() => {
        handleBenchBoostDisable()
    }, [benchBoostApplied])
    useEffect(() => {
        handleTripleCaptainDisable()
    }, [tripleCaptainApplied])

    const runDidMount = async () => {

        if (!user.fantasyTeamId) {return router.push('/build_team_all_players')}

        const {
            success,
            data
        } = await dispatch(getFantasyTeamById({
                gameWeek: user.currentGameweek ,
                fantasyTeamId: user.fantasyTeamId,
        }))

        if(!success) return

        const $squadInfo = setPlayersAdditionalData(data)

        setSquadInfo($squadInfo)
        setSavedSquadInfo($squadInfo)
        setShowPlayerInfoModal(false)
        setShowTripleCaptainModal(false)

        setTripleCaptainApplied(user.tripleCaptainApplied)
        setBenchBoostApplied(user.benchBoostApplied)

        // Setting-Info-Board-State
        setCurrentGameWeekInfo({
            toggleAnimation: false,
            data: clone(getCurrentWeekInfo())
        })
    }

    // Did-Mount
    useEffect(() => {
        runDidMount()
    }, [])


    if (squadInfo.length === 0) {return <Loader/>}

    return (
        <Layout title="My Squad" showToast autoClose={2000}>
            <Div className="mx-auto relative bg-white">
                <div className={'flex'}>
                    <Div className="w-[62%]">
                        <MySquadLeftSection
                            transferInProgress={transferInProgress}
                            handleFilterButtonClick={(v) => setActiveFilter(v)}
                            tripleCaptainApplied={tripleCaptainApplied}
                            benchBoostApplied={benchBoostApplied}
                            squadInfo={squadInfo}
                            onPlayerChange={handlePlayerSwap}
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


