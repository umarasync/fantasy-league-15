// Packages
import {useSelector} from "react-redux";

// Components
import Button from "components/html/Button";
import Div from "components/html/Div";
import Text from "components/html/Text";

// Utils
import R from "utils/getResponsiveValue";

// Colors
import colors from "constants/colors";
import {SHADOW_OBSERVATORY, SHADOW_PIGMENT_INDIGO} from "constants/boxShadow";
import {useState} from "react";
import {useRouter} from "next/router";

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
    // Transfer
    transferInProgress,
    onCancel,
    onSave,
    // Triple Captain
    setTripleCaptainPlayer,
    setShowTripleCaptainModal,
    // Bench Boost
    setBenchBoostPlayers,
    setShowBenchBoostModal,
}) {

    const STYLES = {...getStyles(R)}

    const router = useRouter()

    // Global States
    const benchBoostApplied = useSelector(({ auth }) => auth.user.benchBoostApplied);
    const tripleCaptainApplied = useSelector(({ auth }) => auth.user.tripleCaptainApplied);
    const loadingFantasyTeamSwapping = useSelector(({ fantasyTeam }) => fantasyTeam.loadingFantasyTeamSwapping);


    // Triple Captain
    const handleShowTripleCaptainModal = () => {
        const captain = squadInfo.squad.find(p => p.captain === true)
        if(captain === undefined) return
        setTripleCaptainPlayer([{...captain}])
        setShowTripleCaptainModal(true)
    }

    // Bench-Boost
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
                                    onClick={onCancel}
                                />
                                <Button
                                    title={'save changes'}
                                    disabled={loadingFantasyTeamSwapping}
                                    h={50}
                                    w={190}
                                    color={colors.white}
                                    onClick={onSave}
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