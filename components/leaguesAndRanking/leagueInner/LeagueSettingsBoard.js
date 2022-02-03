import {useState} from "react";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";

// Constants
import {SHADOW_WHITE_SMOKE} from "constants/boxShadow";
import colors from "constants/colors"
import Button from "../../html/Button";
import LeagueSettingsBoardContent from "./LeagueSettingsBoardContent";

export default function LeagueSettingsBoard() {

    const [editOpen, setEditOpen] = useState(false)

    const handleEdit = () => {
        setEditOpen(true)
    }

    const handleEditDone = () => {
        setEditOpen(false)
    }

    return (
        <Div
            minH={533}
            p={40}
            w={1280}
            className={'flex flex-col bg-white'}
            position="relative"
            br={12}
            bs={SHADOW_WHITE_SMOKE}
        >
            {/*header*/}
            <Div className={'flex items-center justify-between'}>
                <Div>
                    <Text text={'League name'} fs={18} lh={22} fw={600} color={colors.regent_grey} mb={16}/>
                    <Text text={'League name'} fs={28} lh={32} fw={900} color={colors.black_rock} fst={'italic'} tt={'uppercase'}/>
                </Div>
                {
                    editOpen ? (
                            <div>
                                <Button
                                    title={'Done'}
                                    disabled={false}
                                    h={50}
                                    lh={20}
                                    w={125}
                                    onClick={handleEditDone}
                                />
                            </div>
                        ): (
                            <div className={'flex items-center justify-between cursor-pointer'} onClick={handleEdit}>
                                <Text text={'Rename'} fs={18} lh={22} color={colors.dark_indigo} mr={5}/>
                                <Image src={'/images/edit.png'} w={24} h={24}/>
                            </div>
                        )
                }

            </Div>

            {/*Content*/}
            <LeagueSettingsBoardContent/>
        </Div>

    )
}