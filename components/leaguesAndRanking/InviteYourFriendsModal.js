// Packages
import {useState} from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';

// Components
import Modal from "components/modals";
import Input from "components/inputs/input";
import Button from "components/html/Button";
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";

// Constants
import colors from "constants/colors"

export default function InviteYourFriendsModal({
    show,
    onClose
}) {

    const leagueCode = '19ED2NS99'
    const leagueLink = 'https:/gaming.eradhttps.com'

    return (
        <Modal>
            <div
                className={`${
                    !show && "hidden"
                } fixed z-10 overflow-auto top-0 left-0 w-full h-full bg-backdrop flex items-center justify-center`}
            >
                <Div w={482} br={12} bg={colors.white} p={24}>
                    <Div pt={4} mb={36} className="flex justify-between items-center">
                        <Text
                            text={'Invite your friends'}
                            fs={28}
                            lh={32}
                            fw={800}
                            fst={'italic'}
                            tt={'uppercase'}
                            color={colors.black_rock}
                        />
                        <Image src={'/images/close.png'} w={40} h={40} onClick={onClose} cursor={'pointer'} alt={'close.png'}/>
                    </Div>
                    <Div mb={50}>
                        <Text text={'league code'} fs={22} lh={26} fw={800} fst={'italic'} tt={'uppercase'} mb={12}/>
                        <Text
                            text={`Your friend can join by entering this code`}
                            fs={18}
                            lh={26}
                            mb={24}
                            color={colors.regent_grey}
                        />
                        <Div className={'flex'}>
                            <Div mr={16}>
                                <Input value={leagueCode} name="leagueCode" id="leagueCode" mb={0}/>
                            </Div>
                            <Div w={172}>
                                <CopyToClipboard text={leagueCode}>
                                    <Button title={"Copy code"} onClick={false}/>
                                </CopyToClipboard>
                            </Div>
                        </Div>
                    </Div>

                    <Div>
                        <Text text={'league link'} fs={22} lh={26} fw={800} fst={'italic'} tt={'uppercase'} mb={12}/>
                        <Text
                            text={`Invite friends to your league whenever you want by sharing this link`}
                            fs={18}
                            lh={26}
                            mb={24}
                            color={colors.regent_grey}
                        />
                        <Div className={'flex'}>
                            <Div mr={16}>
                                <Input value={leagueLink} name="leagueLink" id="leagueLink" mb={0}/>
                            </Div>
                            <Div w={172}>
                                <CopyToClipboard text={leagueLink}>
                                    <Button title={"Copy link"} onClick={false}/>
                                </CopyToClipboard>
                            </Div>
                        </Div>
                    </Div>

                </Div>
            </div>
        </Modal>
    );
}
