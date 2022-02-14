// Packages
import React, {useEffect, useState} from "react";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import BorderHorizontal from "components/borders/BorderHorizontal";
import Input from "components/inputs/input";
import MyDatepicker from "components/datePicker/MyDatePicker";
import Button from "components/html/Button";
import Animated from "components/animation/Animated";
import EditSuccessBox from "components/profileSettings/EditSuccessBox";
import GenderDropDown from "components/signUp/GenderDropDown";

// Constants
import {SHADOW_DARK_INDIGO} from "constants/boxShadow";
import colors from "constants/colors";
import {GENDERS} from "constants/data/user";

// Utils
import {clone, isEmpty} from "utils/helpers";

export default function EditPersonalInfoSettings() {

    const GENDERS_INITIAL = clone(GENDERS);

    const [fullName, setFullName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [selectedGender, setSelectedGender] = useState({});

    // Success-Box
    const [successBoxHidden, setSuccessBoxHidden] = useState(true);

    // Buttons
    const [disableConfirm, setDisableConfirm] = useState(true);
    const [disableCancel, setDisableCancel] = useState(true);

    const onSave = () => {
        setSuccessBoxHidden(false)
    }

    const initialStates = () => {
        setFullName("Martine Bakker")
        setDateOfBirth("")
        setSelectedGender({...GENDERS_INITIAL[1]})
    }

    const onCancel = () => {
        initialStates()
    }

    const validate = () => {
        if (
            fullName &&
            selectedGender.value &&
            dateOfBirth
        ) {
            setDisableConfirm(false);
            setDisableCancel(false);
        } else {
            setDisableConfirm(true);
            setDisableCancel(true);
        }
    };

    useEffect(() => {
        validate()
    }, [fullName, selectedGender.value, dateOfBirth])

    useEffect(() => {
        initialStates()
    }, [])

    return (
        <Div h={'100%'}>
            <Animated
                toggleAnimation={successBoxHidden}
                h={'100%'}
                children2={<EditSuccessBox title={<span>your info <br/>successfully changed</span>}/>}
            >
                <>
                    <Text text={'Personal info'} fs={22} lh={26} fw={900} fst={'italic'} tt={'uppercase'}
                          color={colors.black_rock}
                          mb={24}/>
                    <BorderHorizontal/>
                    <Div mt={32}>
                        <Input
                            name="fullName"
                            id="fullName"
                            placeholder="Full name"
                            onChange={(v) => {
                                setFullName(v);
                            }}
                            value={fullName}
                            mb={32}
                        />
                        <Div className={'flex items-center justify-between'} mb={32}>
                            <Div w={'50%'} mr={12}>
                                {
                                    !(isEmpty(selectedGender)) && (
                                        <GenderDropDown
                                              selectedGender={selectedGender}
                                              setSelectedGender={setSelectedGender}
                                          />
                                    )
                                }
                            </Div>
                            <Div w={'50%'} ml={12} h={'70%'}>
                                {
                                    !isEmpty(selectedGender) && (
                                        <MyDatepicker
                                            dateOfBirth={dateOfBirth}
                                            setDateOfBirth={(dob) => setDateOfBirth(dob)}
                                        />
                                    )
                                }

                            </Div>
                        </Div>
                        <Div justifyBetween>
                            <Button
                                title={'save'}
                                color={colors.white}
                                mr={8}
                                h={50}
                                disabled={disableConfirm}
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
                </>
            </Animated>

        </Div>
    )
}