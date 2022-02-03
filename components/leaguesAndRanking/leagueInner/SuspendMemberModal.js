// Components
import Modal from "components/modals";
import Button from "components/html/Button";
import Div from "components/html/Div";
import Text from "components/html/Text";

// Constants
import colors from "constants/colors"
import {SHADOW_DARK_INDIGO} from "constants/boxShadow";

export default function SuspendMemberModal({
    show,
    member,
    onCancel,
    onConfirm
}) {

    return (
        <Modal>
            <div
                className={`${
                    !show && "hidden"
                } fixed z-10 overflow-auto top-0 left-0 w-full h-full bg-backdrop flex items-center justify-center`}
            >
                <Div w={536} br={12} bg={colors.white} p={24}>

                    <Div className={'flex items-center'} mb={24}>
                        <Text
                            text={'Suspend'}
                            fs={28}
                            lh={32}
                            fw={800}
                            fst={'italic'}
                            tt={'uppercase'}
                            color={colors.black_rock}
                            mr={5}
                        />
                        <Text
                            text={member.teamName}
                            fs={28}
                            lh={32}
                            fw={800}
                            fst={'italic'}
                            tt={'uppercase'}
                            className={'text-froly-cerise_red'}
                        />
                    </Div>

                    <Text
                        text={'Are you sure you want suspend this user?'}
                        fs={18}
                        lh={26}
                        color={colors.regent_grey}
                        mb={32}
                    />

                    {/*Buttons*/}
                    <Div justifyBetween>
                        <Button
                            title={'Cancel'}
                            color={colors.white}
                            mr={8}
                            h={70}
                            bs={SHADOW_DARK_INDIGO}
                            bg={colors.dark_indigo}
                            onClick={onCancel}
                        />
                        <Button
                            title={'Confirm'}
                            color={colors.white}
                            ml={8}
                            h={70}
                            onClick={() => onConfirm(member)}
                        />
                    </Div>
                </Div>
            </div>
        </Modal>
    );
}
