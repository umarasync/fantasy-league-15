import {useState} from "react";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";
import Button from "components/html/Button";
import LeagueSettingsBoardContent from "components/leaguesAndRanking/leagueInner/LeagueSettingsBoardContent";

// Constants
import {SHADOW_WHITE_SMOKE} from "constants/boxShadow";
import colors from "constants/colors"
import BorderHorizontal from "../../Borders/BorderHorizontal";

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
            h={550}
            pl={40}
            pr={40}
            pt={40}
            w={1280}
            className={'flex flex-col bg-white'}
            position="relative"
            br={12}
            bs={SHADOW_WHITE_SMOKE}
        >
            {/*header*/}
            <Div className={'flex items-center justify-between'} mb={24}>
                <Div>
                    <Text text={'League name'} fs={18} lh={22} fw={600} color={colors.regent_grey} mb={16}/>
                    <Text text={'theroom fc'} fs={28} lh={32} fw={900} color={colors.black_rock} fst={'italic'} tt={'uppercase'}/>
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
            <BorderHorizontal/>
            {/*Content*/}
            <LeagueSettingsBoardContent/>
        </Div>

    )
}