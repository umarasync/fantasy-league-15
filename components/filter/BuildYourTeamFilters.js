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
    onSearchClubs,

    // Prices
    prices,
    onPriceSelected,
    selectedPrice
 }){

    const STYLES =  { ... getStyles(R) }

    return(
        <div>
            <SelectSearchInput
                label={'Teams'}
                options={clubs}
                selectedClubs={selectedClubs}
                onSearchClubs={onSearchClubs}
                style={STYLES.container}
                textStyle={STYLES.textStyle}
                parentContainerStyle={STYLES.parentContainerStyle}
                onOptionClicked={onClubSelected}
            />

            <div className={'flex items-center'}>
                <SelectInput
                    options={prices}
                    selectedOption={selectedPrice}
                    onOptionChange={onPriceSelected}
                    style={{...STYLES.container}}
                    parentContainerStyle={{
                        zIndex: 2,
                        marginRight: R(8)
                    }}
                    textStyle={STYLES.textStyle}
                    hideLabel
                    openedBorderColor={''}
                />

                <SelectSearchInput
                    label={'Teams'}
                    options={clubs}
                    selectedClubs={selectedClubs}
                    onSearchClubs={onSearchClubs}
                    style={STYLES.container}
                    textStyle={STYLES.textStyle}
                    parentContainerStyle={{ marginLeft: R(8)}}
                    onOptionClicked={onClubSelected}
                    hideSearchBox
                    arrowImageStyle={{width: R(33)}}
                />
            </div>
        </div>
    )
}