// Components
import Modal from "components/modals";
import Div from "components/html/Div"
import Text from "components/html/Text"
import Text_18_22_600 from "components/texts/Text_18_22_600";
import Button from "components/html/Button";
import BorderHorizontal from "components/Borders/BorderHorizontal";

// Constants
import colors from "constants/colors";
import {SHADOW_DARK_INDIGO, SHADOW_WHITE_SMOKE} from "constants/boxShadow";
import {POINTS_PER_ADDITIONAL_TRANSFER} from "constants/universal";
import {CLUB_FC, POSITION_MID, STATUS_FIT} from "constants/data/filters";

// Utils
import R from "utils/getResponsiveValue";
import {nFormatter} from "utils/helpers";
import TransferInAndOutPlayer from "./TransferInAndOutPlayer";

const player = {
    id: 1,
    image: 'player1.png',
    clubImage: 'club_fc.png',
    clubName: CLUB_FC,
    status: STATUS_FIT,
    name: 'R. Nelson',
    nextMatch: {
        club: 'GRO',
        vs: 'BEN',
        matchType: 'H'
    },
    position: POSITION_MID,
    points: 14,
    most_transferred: 2,

    picked: 12,
    pickedAsCaptain: 6,
    recommended: true,
    penaltyTaker: false,
}

// Styles
const getStyles = (R) => {
    return {
        transferredSummaryBox: {
            overflowY: 'scroll',
            overflowX: 'hidden',
            flexGrow: 1,
            // border: '3px solid green'
        },
        playersBox: {

        }
    }
}

export default function TransferWindowModal({
    title = 'Summary',
    heading = 'You are about to transfer',
    subHeading = '2 player',
    players,
    show,
    onCancel,
    onConfirmed,
    remainingBudget,
    additionalTransferredPlayers
}) {
    const STYLES = {...getStyles(R)}
    const noOfFreeTransfers = 1

    return (
        <Modal>
            <div
                className={`${!show && 'hidden'} fixed z-50 overflow-auto top-0 left-0 w-full h-full bg-backdrop flex items-center justify-center`}>
                {
                    show && (
                        <Div w={536} h={'85%'} pt={28} pb={28}  br={12} bg={colors.white}
                             className={'flex flex-col justify-between'}
                        >
                            {/*Content*/}
                            <Div className={'flex flex-col'} h={'90%'}>
                                {/*Top Heading*/}
                                <Div pl={24} pr={24}>
                                   <Text text={title} fs={28} lh={32} mb={24} tt={'uppercase'} fw={800}
                                         fst={'italic'} color={colors.black_rock}
                                   />
                                   <Text
                                       text={
                                           <>
                                               <Text text={`${heading} `} inline color={colors.regent_grey}/>
                                               <Text text={subHeading} inline color={colors.mandy}/>
                                           </>
                                       }
                                       fs={18}
                                       pr={56}
                                       lh={26}
                                       color={colors.regent_grey}
                                       mb={24}
                                   />
                                </Div>
                                {/*Transferred-Players-Summary-Box*/}
                                <Div style={STYLES.transferredSummaryBox} pb={40}>
                                    <Div ml={24} mr={24}>
                                        <Div justifyBetween mb={24}>
                                            <Text_18_22_600 title={'Free transfers'}/>
                                            <Text_18_22_600 title={noOfFreeTransfers}/>
                                        </Div>
                                        <BorderHorizontal/>
                                        <Div justifyBetween mb={24} mt={24}>
                                            <Text_18_22_600 title={'Additional transfers'}/>
                                            <Text_18_22_600
                                                title={
                                                    `${additionalTransferredPlayers} ${additionalTransferredPlayers ? `(-${additionalTransferredPlayers * POINTS_PER_ADDITIONAL_TRANSFER} pts)` : ''}`
                                                }
                                                color={additionalTransferredPlayers ? colors.mandy : colors.black_rock}
                                            />
                                        </Div>
                                        <BorderHorizontal/>
                                        <Div justifyBetween mt={24} mb={24}>
                                            <Text_18_22_600 title={'Remaining budget'}/>
                                            <Text_18_22_600 title={nFormatter(remainingBudget)}/>
                                        </Div>
                                    </Div>
                                    {/*Player*/}
                                    <Div br={12} bs={SHADOW_WHITE_SMOKE} p={24} mr={24} ml={24}>
                                        <Div justifyBetween mb={24}>
                                            <Text text={'transfer in'} fs={22} lh={26} fw={800} fst={'italic'} tt={'uppercase'}/>
                                            <Text text={'transfer out'} fs={22} lh={26} fw={800} fst={'italic'} tt={'uppercase'}/>
                                        </Div>
                                        {/*Row*/}
                                        <TransferInAndOutPlayer
                                            transferInPlayer={player}
                                            transferOutPlayer={player}
                                        />
                                        <TransferInAndOutPlayer
                                            transferInPlayer={player}
                                            transferOutPlayer={player}
                                            mt={50}
                                        />
                                    </Div>
                                </Div>
                            </Div>

                            {/*Buttons*/}
                            <Div justifyBetween mr={24} ml={24}>
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
                                    onClick={onConfirmed}
                                />
                            </Div>

                        </Div>
                    )
                }
            </div>
        </Modal>
    )
}