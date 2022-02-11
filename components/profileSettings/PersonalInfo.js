// Packages
import React, {useEffect, useState} from "react";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import BorderHorizontal from "components/borders/BorderHorizontal";
import Input from "components/inputs/input";
import SelectInput from "components/inputs/SelectInput";
import MyDatepicker from "components/datePicker/MyDatePicker";
import Button from "components/html/Button";

// Constants
import {SHADOW_DARK_INDIGO, SHADOW_WHITE_SMOKE} from "constants/boxShadow";
import colors from "constants/colors";
import {GENDERS} from "constants/data/user";

// Utils
import {clone} from "utils/helpers";

export default function PersonalInfo() {

    const GENDERS_INITIAL = clone(GENDERS);

    const [fullName, setFullName] = useState("Martine Bakker");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [genders, setGenders] = useState([...GENDERS_INITIAL]);
    const [selectedGender, setSelectedGender] = useState(GENDERS_INITIAL[0]);

    // Buttons
    const [disableConfirm, setDisableConfirm] = useState(true);
    const [disableCancel, setDisableCancel] = useState(true);

    const onSave = () => {}
    const onCancel = () => {}

    const validate = () => {
        if (
            fullName &&
            selectedGender.value &&
            selectedGender.value !== GENDERS_INITIAL[0].value &&
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

    return (
        <>
            <Text text={'Personal info'} fs={22} lh={26} fw={900} fst={'italic'} tt={'uppercase'} color={colors.black_rock}
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
                        <SelectInput
                            name="gender"
                            id="gender"
                            placeholder="Gender"
                            options={genders}
                            selectedOption={selectedGender}
                            default
                            skipFirstOption={true}
                            onOptionChange={(option) => setSelectedGender(option)}
                        />
                    </Div>
                    <Div w={'50%'} ml={12} h={'70%'}>
                        <MyDatepicker
                            dateOfBirth={dateOfBirth}
                            setDateOfBirth={(dob) => setDateOfBirth(dob)}
                        />
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
    )
}