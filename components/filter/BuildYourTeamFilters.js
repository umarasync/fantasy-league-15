// Components
import SelectSearchInput from 'components/inputs/SelectSearchInput'

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from 'constants/colors'
import {ALL_TEAMS} from "constants/data/team";

// Styles
const getStyles = (R) => {
   return {
       parentContainerStyle: {
         marginBottom: R(20)
       },
       container: {
            height: R(50)
       },
       textStyle: {
           color: colors.black_rock,
           fontWeight: '600'
       }
   }
}

export default function BuildYourTeamFilters({
     clubs,
                                                 selectedClubsNames,
     onClubSelected
 }){

    const STYLES =  { ... getStyles(R) }

    return(
        <div>
            <SelectSearchInput
                initialValue={'Teams'}
                selectedClubsNames={selectedClubsNames}
                options={clubs}
                style={STYLES.container}
                textStyle={STYLES.textStyle}
                parentContainerStyle={STYLES.parentContainerStyle}
                setValue={onClubSelected}
            />
        </div>
    )
}