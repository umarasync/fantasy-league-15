// Packages
import {useEffect, useState} from "react";

// Components
import DropDown from "components/dropdowns/DropDown";
import Div from "components/html/Div";
import Text from "components/html/Text";
import BorderHorizontal from "components/borders/BorderHorizontal";

// Constants
import {SHADOW_WHITE_SMOKE_LIGHT} from "constants/boxShadow";
import colors from "constants/colors";
import {GENDERS} from "constants/data/user";

// Utils
import R from "utils/getResponsiveValue";
import {clone, isEmpty} from "utils/helpers";

// Styles
const getStyles = (R) => {
    return {
        container: {
            border: `1px solid ${colors.link_water}`,
            boxShadow: SHADOW_WHITE_SMOKE_LIGHT,
            marginTop: R(6),
        },
        arrowsBox:{
            position: 'absolute',
            top: '35%',
            right: R(22)
        },
        li: {
            fontSize: R(18),
            lineHeight: R(22, 'px'),
            fontWeight: 600,
            color: colors.black_rock,
            padding: R(24),
            borderRadius: R(12)
        }
    }
}
export default function GenderDropDown({
   selectedGender,
   setSelectedGender
}) {

    const STYLES = {...getStyles(R)}

    const GENDERS_INITIAL = clone(GENDERS);

    let defaultSelectedState = {}

    if(selectedGender.value === '') {
        defaultSelectedState = {...GENDERS_INITIAL[0]}
    }else {
        defaultSelectedState = {...selectedGender}
    }

    // Gender States
    const [genders, setGenders] = useState([...GENDERS_INITIAL]);
    const [isOpened, setIsOpened] = useState(false);

    const onSelect = (item) => {

        if(item.value !== GENDERS_INITIAL[0].value){
            setSelectedGender({...item})
        }
    }

    const onToggle = ($isOpened) => {
        setIsOpened($isOpened)
    }

    const isValueSelected = () => selectedGender.value !== ''

    const header = (item) => {
        return (
            <Div
                w={'100%'}
                className={'flex items-center relative'}
                b={`1px solid ${isOpened ? colors.black_rock : colors.link_water}`}
                br={12}
                bs={SHADOW_WHITE_SMOKE_LIGHT}
                h={70}
                p={24}
            >
                {/*placeholder*/}
                {
                    isOpened && (
                        <Div position={'absolute'} top={-8} bg={colors.white} pl={4} pr={4}>
                            <Text text={'Gender'} fs={12} lh={16} color={colors.black_rock}/>
                        </Div>
                    )
                }

                {/*value*/}
                <Text
                    text={`${isOpened && !isValueSelected() ? 'Select' : item.label}`}
                    fs={18}
                    fw={isValueSelected() ? 600 : 'normal'}
                    lh={22}
                    color={isValueSelected() ? colors.black_rock : colors.regent_grey}
                    nowrap
                />
            </Div>
        )
    }

    const li = ({item, index, data}) => {
        if(!index) return <></>
        return (
            <div>
                <p style={STYLES.li} className={'select-options'}>
                    {item.label}
                </p>
                {index !== data.length - 1 && (<BorderHorizontal/>)}
            </div>
        )
    }

    return (
        <DropDown
            header={header}
            li={li}
            onSelect={onSelect}
            onToggle={onToggle}
            data={genders}
            styles={{
                container: STYLES.container,
                arrowsBox: STYLES.arrowsBox,
            }}
            directionRight={false}
            animationY={'-20px'}
            defaultSelectedItem={defaultSelectedState}
        />
    )
}