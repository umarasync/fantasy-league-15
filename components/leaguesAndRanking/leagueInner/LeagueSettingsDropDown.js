// Packages
import {useState} from "react";

// Components
import DropDown from "components/dropdowns/DropDown";
import Div from "components/html/Div";
import Text from "components/html/Text";
import BorderHorizontal from "components/borders/BorderHorizontal";

// Constants
import {SHADOW_WHITE_SMOKE_LIGHT} from "constants/boxShadow";
import colors from "constants/colors";
import {getLeagueSettingsDropdownData} from "constants/data/leaguesAndRanking";

// Utils
import R from "utils/getResponsiveValue";
import {clone} from "utils/helpers";

// Styles
const getStyles = (R) => {
    return {
        container: {
            height: R(284),
            border: `1px solid ${colors.link_water}`,
            boxShadow: SHADOW_WHITE_SMOKE_LIGHT,
            overflow: 'scroll'
        }
    }
}
export default function LeagueSettingsDropDown() {

    const STYLES = {...getStyles(R)}
    const DROPDOWN_DATA_INITIAL = clone(getLeagueSettingsDropdownData())
    const [dropdownData, setDropdownData] = useState(DROPDOWN_DATA_INITIAL)

    const onSelect = (item) => {}

    const header = (item) => {
        return (
            <Div className={'flex items-center'}>
                <Text text={'Scoring starts:'} fs={24} lh={28} color={colors.lavender_grey} mr={6} nowrap/>
                <Text text={`GW ${item.week}`} fs={24} lh={28} fw={600} color={colors.white} mr={5} nowrap minW={76}/>
            </Div>
        )
    }

    const li = ({item, index, data}) => {
        return (
            <Div>
                <Text
                    text={`${item.heading}`}
                    fs={18}
                    lh={22}
                    fw={600}
                    color={colors.black_rock}
                    pt={24}
                    pb={24}
                    pl={20}
                    pr={20}
                    nowrap
                />
                {index !== data.length - 1 && (<BorderHorizontal/>)}
            </Div>


        )
    }

    return (
        <DropDown
            header={header}
            li={li}
            onSelect={onSelect}
            data={dropdownData}
            styles={{container: STYLES.container}}
            directionRight
            defaultSelectedItem={{...DROPDOWN_DATA_INITIAL[0]}}
        />
    )
}