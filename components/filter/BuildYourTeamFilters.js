// Components
import SelectSearchInput from 'components/inputs/SelectSearchInput'
import SelectInput from 'components/inputs/SelectInput'

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from 'constants/colors'

// Styles
const getStyles = (R) => {
   return {
       parentContainerStyle: {
         marginBottom: R(16)
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
     selectedClubs,
     onClubSelected,
     onSearchClubs
 }){

    const STYLES =  { ... getStyles(R) }

    return(
        <div>
            <SelectSearchInput
                label={'Teams'}
                selectedClubs={selectedClubs}
                options={clubs}
                onSearchClubs={onSearchClubs}
                style={STYLES.container}
                textStyle={STYLES.textStyle}
                parentContainerStyle={STYLES.parentContainerStyle}
                setValue={onClubSelected}
            />

            <div className={'flex items-center'}>
                <SelectInput
                    initialValue={'All Prices'}
                    options={clubs}
                    style={{...STYLES.container}}
                    parentContainerStyle={{
                        zIndex: 2,
                        marginRight: R(7)
                    }}
                    textStyle={STYLES.textStyle}
                    hideLabel
                    openedBorderColor={''}
                />
                <SelectInput
                    initialValue={'All Prices'}
                    options={clubs}
                    style={{...STYLES.container}}
                    parentContainerStyle={{
                        zIndex: 2,
                        marginLeft: R(8)
                    }}
                    textStyle={STYLES.textStyle}
                    hideLabel
                    openedBorderColor={''}
                />
            </div>
        </div>
    )
}