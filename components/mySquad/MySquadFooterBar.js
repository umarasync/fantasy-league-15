// Components
import Button from "components/html/Button";
import Div from "components/html/Div";
import Text from "components/html/Text";

// Utils
import R from "utils/getResponsiveValue";

// Colors
import colors from "constants/colors";
import {SHADOW_OBSERVATORY, SHADOW_PIGMENT_INDIGO} from "constants/boxShadow";

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
    onBenchBoost,
    onTripleCaptain,
    onMakeTransfers,
    onCancel,
    onSave,
    transferInProgress,
    tripleCaptainDisabled,
    benchBoostDisabled
}) {

    const STYLES = {...getStyles(R)}

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
                                    disabled={benchBoostDisabled}
                                    mr={32}
                                    h={50}
                                    w={190}
                                    bs={SHADOW_OBSERVATORY}
                                    className={'bg-turquoise-niagara'}
                                    onClick={onBenchBoost}
                                />

                                <Button
                                    title={'Triple captain'}
                                    color={colors.white}
                                    disabled={tripleCaptainDisabled}
                                    h={50}
                                    w={190}
                                    bs={SHADOW_PIGMENT_INDIGO}
                                    className={'bg-hibiscus-purple'}
                                    onClick={onTripleCaptain}
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
                                    bs={'unset'}
                                    bg={colors.white}
                                    onClick={onCancel}
                                />
                                <Button
                                    title={'save changes'}
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
                                    onClick={onMakeTransfers}
                                />
                            </>
                        )
                    }
                </Div>
            </div>

        </div>
    )
}