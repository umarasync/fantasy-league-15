// Components
import Button from "components/html/Button";
import Border from "components/borders/Border";
import Div from "components/html/Div";
import Text from "components/html/Text";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";
import {POINTS_PER_ADDITIONAL_TRANSFER} from "constants/universal";

// Utils
import {nFormatter} from "utils/helpers";

// Styles
const getStyles = (R) => {
    return {
        container: {
            height: R(104),
            paddingLeft: R(81.26),
            paddingRight: R(81.26)
        },
        playersText: {
            fontSize: R(18),
            marginRight: R(14),
            lineHeight: R(26, 'px')
        },
        RBText: {
            fontSize: R(18),
            marginLeft: R(32)
        },
        infoText: {
            width: R(210),
            background: 'rgb(252,252,252)',
            color: colors.regent_grey,
            fontSize: R(14),
            paddingLeft: R(14),
            paddingRight: R(14),
            paddingTop: R(8),
            paddingBottom: R(8),
            borderRadius: R(12),
            top: R(-68),
            right: R(10)
        },
        infoImage: {
            width: R(21),
            height: R(21),
            marginLeft: R(9),
            marginRight: R(17),
        },
        remainingBudget: {
            fontSize: R(28),
            lineHeight: R(32, 'px'),
            fontWeight: '800'
        },

        continueBtn: {
            height: R(50),
            width: R(163)
        }
    }
}

const getText = ({
 isOneFreeTransferWindow,
 additionalTransferredPlayers,
 totalChosenPlayers
}) => {
    if(isOneFreeTransferWindow) {

    }else {
        return `${totalChosenPlayers} / 15`
    }
}

export default function FooterBar({
    totalChosenPlayers,
    remainingBudget,
    resetDisabled,
    onAutoPick,
    autoPickDisabled,
    continueDisabled,
    onResetClick,
    onContinueClick,

    // Transfer-Window
    isOneFreeTransferWindow,
    noOfFreeTransfersLeft,
    transferResetDisabled,
    transferConfirmDisabled,
    onTransferResetClick,
    onTransferConfirmClick,
    additionalTransferredPlayers
  }){

    const STYLES =  { ... getStyles(R) }

    const getText = () => {
        if (isOneFreeTransferWindow && additionalTransferredPlayers) {
            return `-${additionalTransferredPlayers * POINTS_PER_ADDITIONAL_TRANSFER} pts`
        }else if(isOneFreeTransferWindow){
            return `${noOfFreeTransfersLeft} FREE`
        }
        else {
            return `${totalChosenPlayers} / 15`
        }
    }

    return(
        <div
            className="footer-blue-gradient fixed bg-red-200 w-full bottom-[0] flex items-center"
            style={STYLES.container}
        >
            <div className={'flex items-center justify-between w-full'}>
                {/*Left Section*/}
                <div className={'flex items-center'}>
                    <p className={'text-lavender_grey normal'} style={STYLES.playersText}>
                        {
                            isOneFreeTransferWindow ? 'Transfers' : 'Players'
                        }
                    </p>
                    <Text
                        text={getText()}
                        fs={28}
                        lh={32}
                        fw={800}
                        fst={'italic'}
                        tt={'uppercase'}
                        color={additionalTransferredPlayers ? colors.bean_red : colors.white}
                        mr={32}
                    />

                    <Border/>
                    <p className={'text-lavender_grey normal'} style={STYLES.RBText}>Remaining budget</p>
                    <div className={'relative'}>
                        {
                            remainingBudget < 0 && (
                                <p className={'absolute'} style={STYLES.infoText}>You need to exchange some
                                    players for cheaper ones
                                </p>
                            )
                        }

                        <div style={STYLES.infoImage}>
                            <img src="/images/info_light.png" alt="" width={'100%'} height={'100%'}/>
                        </div>
                    </div>
                    <p className={`italic uppercase`}
                       style={{
                           ...STYLES.remainingBudget,
                           color: remainingBudget > 0 ? colors.white : colors.bean_red
                       }}>
                        {remainingBudget < 0 && '-'} {nFormatter(Math.abs(remainingBudget))}
                    </p>
                </div>

                {/*Right Section*/}
                <Div center>
                    {
                        !isOneFreeTransferWindow && (
                            <Button
                                title={'auto pick'}
                                color={colors.black_rock}
                                disabled={autoPickDisabled}
                                mr={16}
                                h={50}
                                w={190}
                                bs={'unset'}
                                bg={colors.white}
                                onClick={onAutoPick}
                            />
                        )
                    }

                    {
                        isOneFreeTransferWindow ? (
                            <Button
                                title={'reset'}
                                disabled={transferResetDisabled}
                                mr={40}
                                bs={'unset'}
                                h={50}
                                w={190}
                                bg={colors.rhino}
                                onClick={onTransferResetClick}
                            />
                        ): (
                            <Button
                                title={'reset'}
                                disabled={resetDisabled}
                                mr={40}
                                bs={'unset'}
                                h={50}
                                w={190}
                                bg={colors.rhino}
                                onClick={onResetClick}
                            />
                        )
                    }
                    {
                        isOneFreeTransferWindow ? (
                            <Button
                                onClick={onTransferConfirmClick}
                                title={'confirm'}
                                h={50}
                                w={163}
                                color={colors.white}
                                disabled={transferConfirmDisabled}
                                style={STYLES.continueBtn}
                            />
                        ): (
                            <Button
                                onClick={onContinueClick}
                                title={'continue'}
                                h={50}
                                w={163}
                                color={colors.white}
                                disabled={continueDisabled}
                                style={STYLES.continueBtn}
                            />
                        )
                    }
                </Div>
            </div>

        </div>
    )
}