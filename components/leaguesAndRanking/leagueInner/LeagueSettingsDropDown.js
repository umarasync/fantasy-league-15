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
import {clone, isEmpty} from "utils/helpers";


// Styles
const getStyles = (R) => {
    return {
        dropDownContent: {
            height: R(284),
            border: `1px solid ${colors.link_water}`,
            borderRadius: R(12),
            boxShadow: SHADOW_WHITE_SMOKE_LIGHT,
            background: colors.white,
            overflow: 'scroll'
        }
    }
}
export default function LeagueSettingsDropDown() {

    const STYLES = {...getStyles(R)}
    const DROPDOWN_DATA_INITIAL = clone(getLeagueSettingsDropdownData())
    const [dropdownData, setDropdownData] = useState(DROPDOWN_DATA_INITIAL)
    const [selectedItem, setSelectedItem] = useState({...dropdownData[2]})


    const handleLiClick = (item) => {
        setSelectedItem({...item})
    }

    const DropDownHeader = () => {
        if(isEmpty(selectedItem)) return
        return (
            <Div className={'flex items-center'}>
                <Text text={'Scoring starts:'} fs={24} lh={28} color={colors.lavender_grey} mr={6} nowrap/>
                <Text text={`GW ${selectedItem.week}`} fs={24} lh={28} fw={600} color={colors.white} mr={10} nowrap/>
            </Div>
        )
    }

    const DropDownBody = () => {
        return (
            <div style={STYLES.dropDownContent}>
                {
                   dropdownData.length > 0 && dropdownData.map((item, index) => {
                        return (
                            <Div key={item.id} onClick={() => handleLiClick(item)} cursor={'pointer'}>
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
                                {
                                    index !== dropdownData.length - 1 && (
                                        <BorderHorizontal/>
                                    )
                                }
                            </Div>

                        )
                    })
                }
            </div>
        )
    }

    const li = (item) => {
        return (
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
        )
    }

    return (
        <Div>
            <DropDown
                header={<DropDownHeader/>}
                li={li}
                // body={<DropDownBody/>}
                data={dropdownData}
                dropDownContentStyle={STYLES.dropDownContent}
                handleLiClick={handleLiClick}
            />
        </Div>
    )
}