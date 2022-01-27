// Components
import Modal from "components/modals";
import Div from "components/html/Div"
import Text from "components/html/Text"
import PlayerInfoPlayerCard from "components/playerInfo/PlayerInfoPlayerCard";
import Button from "components/html/Button";

// Constants
import colors from "constants/colors";
import {SHADOW_DARK_INDIGO} from "constants/boxShadow";

export default function PointsBoostModalContent({
    title,
    heading,
    subHeading,
    players,
    show,
    onCancel,
    onConfirmed,
}) {

    return (
        <Modal>
            <div
                className={`${!show && 'hidden'} fixed z-50 overflow-auto top-0 left-0 w-full h-full bg-backdrop flex items-center justify-center`}>
                {
                    show && (
                        <Div w={536} pt={28} pb={28} pl={24} pr={24} br={12} bg={colors.white}
                             className={'flex flex-col'}>
                            <Text text={title} fs={28} lh={32} mb={24} tt={'uppercase'} fw={800}
                                  fst={'italic'} color={colors.black_rock}
                            />
                            <Text
                                text={<><span>{heading}</span><span style={{color: colors.mandy}}>{subHeading}</span></>}
                                fs={18} pr={56} lh={26}
                                color={colors.regent_grey}
                                mb={14}
                            />
                            {players.map((player, i) => <PlayerInfoPlayerCard key={i} mt={i ? 10 : 0} player={player}/>)}
                            <Div justifyBetween mt={32}>
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