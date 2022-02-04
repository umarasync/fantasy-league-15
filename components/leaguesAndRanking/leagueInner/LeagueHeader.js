// Packages
import {useState} from "react";

// Components
import Div from "components/html/Div";
import Image from "components/html/Image";
import Text from "components/html/Text";
import Button from "components/html/Button";
import InviteYourFriendsModal from "components/leaguesAndRanking/InviteYourFriendsModal";

// Constants
import colors from "constants/colors";

export default function LeagueHeader({
    mb,
    onSettingsClick,
    onBackClick,
    league
 }) {
    const [showInviteYourFriendsModal, setShowInviteYourFriendsModal] = useState(false);

    const handleShowInviteYourFriendsModal = () => {
        setShowInviteYourFriendsModal(true)
    }
    return (
        <Div>
            <Div className={'flex items-center justify-between'} mb={mb}>
                <Div className={'flex'}>
                    <Image src={'/images/arrow_backward.png'} w={32} h={32} cursor={'pointer'} onClick={onBackClick}/>
                    <Div className={'flex flex-col'} ml={17} mt={-5}>
                        <Text
                            text={'TheRoom FC'}
                            fs={42}
                            lh={46}
                            fw={900}
                            fst={'italic'}
                            tt={'uppercase'}
                            color={colors.white}
                            mb={8}
                        />
                        <Text
                            text={'5 members'}
                            fs={18}
                            lh={26}
                            color={colors.regent_grey}
                        />
                    </Div>
                </Div>
                <Div center>
                    {
                        league.isLeagueOwner && (
                            <>
                                <Button
                                    title={'Invite friends'}
                                    disabled={false}
                                    mr={8}
                                    w={236}
                                    bs={'unset'}
                                    onClick={handleShowInviteYourFriendsModal}
                                />
                                <Image src={`/images/settings.png`} w={70} h={70} cursor={'pointer'}
                                       onClick={onSettingsClick}/>
                            </>
                        )
                    }

                </Div>
            </Div>
            {
                league.isLeagueOwner && (
                    <InviteYourFriendsModal
                        show={showInviteYourFriendsModal}
                        onClose={() => setShowInviteYourFriendsModal(false)}
                    />
                )
            }
        </Div>

    )
}