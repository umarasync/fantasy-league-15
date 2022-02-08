// Packages
import {useState} from "react";
import {v4 as uuidv4} from 'uuid';
import {useRouter} from "next/router";

// Components
import BorderHorizontal from "components/borders/BorderHorizontal";
import Div from "components/html/Div";
import Text from "components/html/Text";
import LeagueCard from "components/leaguesAndRanking/LeagueCard";
import Image from "components/html/Image";
import Button from "components/html/Button";
import InfoBoardHead from "components/leaguesAndRanking/InfoBoardHead";
import InfoBoardPoints from "components/leaguesAndRanking/InfoBoardPoints";
import CreateLeagueModal from "components/leaguesAndRanking/CreateLeagueModal";
import InviteYourFriendsModal from "components/leaguesAndRanking/InviteYourFriendsModal";
import JoinLeagueModal from "components/leaguesAndRanking/JoinLeagueModal";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

// Utils
import {clone} from "utils/helpers";

// Constants
import {getPublicLeagues} from "constants/data/leaguesAndRanking";
import {SHADOW_DARK_INDIGO, SHADOW_WHITE_SMOKE} from "constants/boxShadow";
import Username from "../user/Username";

// Styles
const getStyles = (R) => {
    return {
        leaguesBody: {
            overflowY: 'scroll',
            overflowX: 'hidden',
            flexGrow: 1,
        }
    }
}

export default function InfoBoard({
    publicLeagues,
    hideInfoBoardHead,
    hideInfoBoardFooter
}) {

    const STYLES = {...getStyles(R)}
    const router = useRouter()
    const [showLeagueCreationModal, setShowLeagueCreationModal] = useState(false);
    const [showJoinLeagueModal, setShowJoinLeagueModal] = useState(false);
    const [showInviteYourFriendsModal, setShowInviteYourFriendsModal] = useState(false);
    const [privateLeagues, setPrivateLeagues] = useState([])

    const handleShowCreateLeagueModal = () => {
        setShowLeagueCreationModal(true)
    }

    const handleShowJoinLeagueModal = () => {
        setShowJoinLeagueModal(true)
    }

    const createOrJoinPrivateLeague = ({
        leagueName,
        totalMembers,
        points
    }) => {
        setPrivateLeagues([
            ...privateLeagues,
            {
                id: uuidv4(),
                image: 'private_league.png',
                name: leagueName,
                totalMembers: totalMembers,
                points: points
            }
        ])
    }

    const handleCreateLeague = (leagueName) => {
        setShowLeagueCreationModal(false)
        setShowInviteYourFriendsModal(true)
        createOrJoinPrivateLeague({
            leagueName,
            totalMembers: 5,
            points: 2,
        })
    };


    const handleJoinLeague = (inviteCode) => {
        setShowJoinLeagueModal(false)
        // Search League from DB for "inviteCode" and join it
        createOrJoinPrivateLeague({
            leagueName: 'International',
            totalMembers: 113,
            points: 108,
        })
    }

    const handleLeagueClick = (league) => {
        return router.push({
            pathname: '/league_inner',
            query: {
                leagueId: league.id,
            }
        })
    }


    return (
        <Div w={390} pt={35}>
            {/*username*/}
            <div className={'flex flex-row-reverse'}>
                <Username username={'martine.bakker'}/>
            </div>
            {!hideInfoBoardHead && <InfoBoardHead/>}
            <InfoBoardPoints/>
            {/*Leagues-And-Rankings*/}
            <Div maxH={502} className={'flex flex-col justify-between'} bs={SHADOW_WHITE_SMOKE} mt={24} p={24} br={12}>
                {/* Header & Body */}
                <Div maxH={363} className={'flex flex-col'}>
                    {/*Header*/}
                    <Div className={'flex items-center justify-between'} pb={24}>
                        <Text text={'leagues and ranking'} fs={22} fw={900} fst={'italic'} tt={'uppercase'} lh={26}/>
                        <Image w={24} h={24} src={'/images/info_grey.png'}/>
                    </Div>
                    {/*Body*/}
                    <div style={STYLES.leaguesBody}>
                        <Div>
                            {
                                publicLeagues.map((league, index) => (
                                    <Div key={league.id}>
                                        <LeagueCard
                                            league={league}
                                            pt={24}
                                            pb={24}
                                            onClick={handleLeagueClick}
                                        />
                                        {index !== publicLeagues.length - 1 && <BorderHorizontal/>}
                                    </Div>
                                ))
                            }
                        </Div>
                        <Div className={'flex items-center justify-between'} pt={16} mb={16}>
                            <Text
                                text={'Private leagues'} fs={22} fw={900} fst={'italic'} tt={'uppercase'} lh={26}/>
                            <Image w={24} h={24} src={'/images/info_grey.png'}/>
                        </Div>
                        {
                            privateLeagues.length > 0 ? (
                                <Div>
                                    {
                                        privateLeagues.map((league, index) => (
                                            <Div key={league.id}>
                                                <LeagueCard
                                                    league={league}
                                                    pt={24}
                                                    pb={24}
                                                    onClick={handleLeagueClick}
                                                />
                                                {index !== privateLeagues.length - 1 && <BorderHorizontal/>}
                                            </Div>
                                        ))
                                    }
                                </Div>
                            ): (
                                <Text
                                    text={"You aren't in any private leagues yet. Create or join one to battle it out Eredivisie stage"}
                                    fs={16}
                                    lh={20}
                                    pr={12}
                                    pb={20}
                                    color={colors.regent_grey}
                                />
                            )
                        }
                    </div>
                </Div>
                {/*Footer*/}
                {!hideInfoBoardFooter && (
                    <Div justifyBetween mt={20}>
                        <Button
                            w={162}
                            h={50}
                            fs={14}
                            lh={20}
                            mr={8}
                            onClick={handleShowCreateLeagueModal}
                            title={'Create a league'}
                        />
                        <Button
                            w={162}
                            h={50}
                            fs={14}
                            lh={20}
                            ml={9}
                            onClick={handleShowJoinLeagueModal}
                            bg={colors.dark_indigo}
                            title={'Join a league'}
                            bs={SHADOW_DARK_INDIGO}
                        />
                    </Div>
                )}

            </Div>
            {/*Create-League-Modal*/}
            {
                !hideInfoBoardFooter && (
                    <Div>
                        <CreateLeagueModal
                            show={showLeagueCreationModal}
                            onClose={() => setShowLeagueCreationModal(false)}
                            onConfirm={handleCreateLeague}
                        />
                        <JoinLeagueModal
                            show={showJoinLeagueModal}
                            onClose={() => setShowJoinLeagueModal(false)}
                            onConfirm={handleJoinLeague}
                        />
                        <InviteYourFriendsModal
                            show={showInviteYourFriendsModal}
                            onClose={() => setShowInviteYourFriendsModal(false)}
                        />
                    </Div>
                )
            }
        </Div>
    )
}