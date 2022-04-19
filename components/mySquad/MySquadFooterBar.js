// Packages
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

// Components
import Button from "components/html/Button";
import Div from "components/html/Div";
import Text from "components/html/Text";

// Utils
import R from "utils/getResponsiveValue";
import {resetPlayers} from "utils/mySquadHelper";

// Constants
import colors from "constants/colors";
import {SHADOW_OBSERVATORY, SHADOW_PIGMENT_INDIGO} from "constants/boxShadow";

// Actions
import {fantasyTeamSwapStart} from "redux/FantasyTeams/actionCreators";
import {swapFantasyTeamPlayers} from "redux/FantasyTeams/api";

// Styles
const getStyles = (R) => {
    return {
        container: {
            height: R(104),
            paddingLeft: R(80),
            paddingRight: R(80)
        }
    }
}

export default function MySquadFooterBar({
    // Squad Info
    squadInfo,
    setSquadInfo,
    savedSquad,
    setSavedSquadInfo,
    // Transfer
    transferInProgress,
    setTransferInProgress,
    // Chip Boosters
    setTripleCaptainPlayer,
    setShowTripleCaptainModal,
    setBenchBoostPlayers,
    setShowBenchBoostModal,
    // Top Buttons
    activeFilter
}) {

    const STYLES = {...getStyles(R)}

    const router = useRouter()
    const dispatch = useDispatch()

    // Global States
    const benchBoostApplied = useSelector(({ auth }) => auth.user.benchBoostApplied);
    const tripleCaptainApplied = useSelector(({ auth }) => auth.user.tripleCaptainApplied);
    const loadingFantasyTeamSwapping = useSelector(({ fantasyTeam }) => fantasyTeam.loadingFantasyTeamSwapping);
    const user = useSelector(({ auth }) => auth.user);

    // Triple Captain Booster
    const handleShowTripleCaptainModal = () => {
        const captain = squadInfo.squad.find(p => p.captain === true)
        if(captain === undefined) return
        setTripleCaptainPlayer([{...captain}])
        setShowTripleCaptainModal(true)
    }

    // Bench Boost Booster
    const handleBenchBoostModal = () => {
        const substitutePlayer = squadInfo.squad.filter(p => p.isSubstitutePlayer)
        setBenchBoostPlayers([...substitutePlayer])
        setShowBenchBoostModal(true)
    }

    // Make Transfers
    const handleMakeTransfer = () => {
        router.push({
            pathname: '/make_players_transfers',
            query: {
                makeTransfer: true
            }
        })
    }

    // Swap Cancel
      const handleCancelFantasyTeamSwap = () => {
          setSquadInfo(savedSquad)
          setTransferInProgress(false)
      }

      // Swap Save
      const handleSaveFantasyTeamSwap = async () => {
          dispatch(fantasyTeamSwapStart())
          const substitutes = squadInfo.squad
                                  .map(p => {if(p.isSubstitutePlayer){
                                      return { id: p.id}}return false})
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

    return (
        <div
            className="footer-blue-gradient fixed bg-red-200 w-full bottom-[0] flex items-center"
            style={STYLES.container}
        >
            <div className={'flex items-center justify-between w-full'}>
                {/*Left Section*/}
                <div className={'flex items-center'}>
                    {
                        transferInProgress ? null : (
                            <>
                                <Button
                                    title={'Bench boost'}
                                    color={colors.white}
                                    disabled={benchBoostApplied}
                                    mr={32}
                                    h={50}
                                    w={190}
                                    bs={SHADOW_OBSERVATORY}
                                    className={'bg-turquoise-niagara'}
                                    onClick={handleBenchBoostModal}
                                />

                                <Button
                                    title={'Triple captain'}
                                    color={colors.white}
                                    disabled={tripleCaptainApplied}
                                    h={50}
                                    w={190}
                                    bs={SHADOW_PIGMENT_INDIGO}
                                    className={'bg-hibiscus-purple'}
                                    onClick={handleShowTripleCaptainModal}
                                />
                            </>
                        )
                    }
                </div>

                {/*Right Section*/}
                <Div center>
                    {
                        transferInProgress ? (
                            <>
                                <Button
                                    title={'cancel'}
                                    color={colors.black_rock}
                                    mr={16}
                                    h={50}
                                    w={190}
                                    disabled={loadingFantasyTeamSwapping}
                                    bs={'unset'}
                                    bg={colors.white}
                                    onClick={handleCancelFantasyTeamSwap}
                                />
                                <Button
                                    title={'save changes'}
                                    disabled={loadingFantasyTeamSwapping}
                                    h={50}
                                    w={190}
                                    color={colors.white}
                                    onClick={handleSaveFantasyTeamSwap}
                                />
                            </>
                        ) : (
                            <>
                                <Div mt={8} className={'flex'}>
                                    <Text text={`Transfer deadline:`} fs={18} lh={26} color={colors.lavender_grey}
                                          className={'inline'} nowrap/>
                                    <Text text={`10 Nov, 18:45`} ml={3} fs={18} lh={26} color={colors.hibiscus}
                                          className={'inline'} nowrap mr={32}/>
                                </Div>
                                <Button
                                    title={'make transfers'}
                                    color={colors.black_rock}
                                    disabled={false}
                                    mr={16}
                                    h={50}
                                    w={190}
                                    bs={'unset'}
                                    bg={colors.white}
                                    onClick={handleMakeTransfer}
                                />
                            </>
                        )
                    }
                </Div>
            </div>

        </div>
    )
}