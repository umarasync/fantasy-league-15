// Packages
import {useEffect, useState} from "react";

// Components
import Modal from "components/modals";
import Input from "components/inputs/input";
import Button from "components/html/Button";
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";

// Constants
import colors from "constants/colors"

export default function JoinLeagueModal({
    show,
    onClose,
    onConfirm
}) {

    const [disabled, setDisabled] = useState(true);
    const [inviteCode, setInviteCode] = useState('');


    const validate = () => {
        if (inviteCode) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };


    useEffect(() => {
        validate();
    }, [inviteCode]);

    return (
        <Modal>
            <div
                className={`${
                    !show && "hidden"
                } fixed z-10 overflow-auto top-0 left-0 w-full h-full bg-backdrop flex items-center justify-center`}
            >
                <Div w={482} br={12} bg={colors.white} p={24}>
                    <Div pt={4} mb={24} className="flex justify-between items-center">
                        <Text
                            text={'Join a league'}
                            fs={28}
                            lh={32}
                            fw={800}
                            fst={'italic'}
                            tt={'uppercase'}
                            color={colors.black_rock}
                        />
                        <Image src={'/images/close.png'} w={40} h={40} onClick={onClose} cursor={'pointer'} alt={'close.png'}/>
                    </Div>
                    <Text
                        text={`Enter the invitation code to join the league.`}
                        fs={18}
                        lh={26}
                        mb={24}
                        color={colors.regent_grey}
                    />
                    <Input
                        value={inviteCode}
                        name="inviteCode"
                        id="inviteCode"
                        placeholder="Invite code"
                        onChange={(v) => setInviteCode(v)}
                        mb={0}
                    />
                    <Button
                        title={"Join a league"}
                        disabled={disabled}
                        onClick={() => !disabled && onConfirm(inviteCode)}
                        mt={32}
                    />
                </Div>
            </div>
        </Modal>
    );
}
