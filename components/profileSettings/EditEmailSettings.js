// Packages
import React, {useEffect, useState} from "react";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import BorderHorizontal from "components/borders/BorderHorizontal";
import Input from "components/inputs/input";
import Button from "components/html/Button";
import ResetPasswordModal from "components/modals/ResetPasswordModal";
import Animated from "components/animation/Animated";
import EditSuccessBox from "components/profileSettings/EditSuccessBox";

// Constants
import {SHADOW_DARK_INDIGO} from "constants/boxShadow";
import colors from "constants/colors";

export default function EditEmailSettings() {

    // Email
    const [email, setEmail] = useState("");
    // Password
    const [password, setPassword] = useState("");
    const [isInputTypePassword, setIsInputTypePassword] = useState(true);
    // Success-Box
    const [successBoxHidden, setSuccessBoxHidden] = useState(true);
    // Reset Password Modal
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    // Buttons
    const [disableSave, setDisableSave] = useState(true);
    const [disableCancel, setDisableCancel] = useState(true);

    const onSave = () => {
        setSuccessBoxHidden(false)
    }

    const initialStates = () => {
        setEmail("")
        setPassword("")
        setIsInputTypePassword(true)

        setSuccessBoxHidden(true)
        setDisableCancel(true)
        setDisableCancel(true)
        setShowResetPasswordModal(false)
    }
    const onCancel = () => {
        initialStates()
    }

    const validate = () => {
        if (
            email &&
            password
        ) {
            setDisableSave(false);
            setDisableCancel(false);
        } else {
            setDisableSave(true);
            setDisableCancel(true);
        }
    };

    useEffect(() => {
        validate()
    }, [email, password])

    useEffect(() => {
        initialStates()
    }, [])


    return (
        <Div h={'100%'}>
            <Animated
                toggleAnimation={successBoxHidden}
                h={'100%'}
                children2={<EditSuccessBox title={<span>your email <br/>successfully changed</span>}/>}
            >
                <div>
                    <Text text={'Change Email'} fs={22} lh={26} fw={900} fst={'italic'} tt={'uppercase'}
                          color={colors.black_rock}
                          mb={24}/>
                    <BorderHorizontal/>
                    <Div mt={24}>

                        <Div mb={24}>
                            <Input
                                name="email"
                                id="email"
                                placeholder=" New email address"
                                onChange={(v) => {
                                    setEmail(v);
                                }}
                                value={email}
                                mb={0}
                            />
                        </Div>
                        <Div>
                            <Input
                                name="password"
                                id="password"
                                type={isInputTypePassword ? "password" : "text"}
                                placeholder="Current password"
                                icon={isInputTypePassword ? "eye.png" : "hide.png"}
                                onChange={(v) => setPassword(v)}
                                onIconClick={() =>
                                    setIsInputTypePassword(!isInputTypePassword)
                                }
                                value={password}
                                pr={70}
                                mb={12}
                            />
                            <Div mb={24}>
                                <Text
                                    text={'Forget password?'}
                                    color={colors.mandy}
                                    fs={14}
                                    fw={600}
                                    cursor={'pointer'}
                                    onClick={() => setShowResetPasswordModal(true)}
                                />
                                <ResetPasswordModal
                                    show={showResetPasswordModal}
                                    onClose={() => setShowResetPasswordModal(!showResetPasswordModal)}
                                />
                            </Div>
                        </Div>
                        <Div justifyBetween>
                            <Button
                                title={'save'}
                                color={colors.white}
                                mr={8}
                                h={50}
                                disabled={disableSave}
                                onClick={onSave}
                            />
                            <Button
                                title={'Cancel'}
                                color={colors.white}
                                ml={8}
                                h={50}
                                disabled={disableCancel}
                                bs={SHADOW_DARK_INDIGO}
                                bg={colors.dark_indigo}
                                onClick={onCancel}
                            />
                        </Div>
                    </Div>
                </div>
            </Animated>
        </Div>
    )
}