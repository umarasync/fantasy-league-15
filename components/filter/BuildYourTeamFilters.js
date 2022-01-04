// Components
import SelectSearchInput from 'components/inputs/SelectSearchInput'
import SelectInput from 'components/inputs/SelectInput'

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from 'constants/colors'
import {ALL_STATUSES, ALL_TEAMS} from "constants/data/filters";

// Styles
const getStyles = (R) => {
   return {
       parentContainerStyle: {
         marginBottom: R(16),
           zIndex: 11
       },
       container: {
            height: R(50)
       },

       textStyle: {
           color: colors.black_rock,
           fontWeight: '600'
       },
       optionImageStyle: {
           width: R(18),
           height: R(18),
       },
       tagImagesStyle: {
           width: R(20),
           height: R(20),
       }
   }
}

export default function BuildYourTeamFilters({
    // Clubs
    clubs,
    selectedClubs,
    onClubSelected,

    // Clubs
    statuses,
    selectedStatuses,
    onStatusSelected,

    // Prices
    prices,
    selectedPrice,
    onPriceSelected,

    // Recommendations
    recommendations,
    selectedRecommendation,
    onRecommendationSelected,
 }){

    const STYLES =  { ... getStyles(R) }

    return(
        <div>
            <SelectSearchInput
                label={'Teams'}
                options={clubs}
                selectedOptions={selectedClubs}
                firstOptionName={ALL_TEAMS}
                style={STYLES.container}
                textStyle={STYLES.textStyle}
                parentContainerStyle={STYLES.parentContainerStyle}
                onOptionClicked={onClubSelected}
                offClickOnParent
            />

            <div className={'flex items-center'}>
                <SelectInput
                    options={prices}
                    selectedOption={selectedPrice}
                    onOptionChange={onPriceSelected}
                    style={{...STYLES.container}}
                    parentContainerStyle={{
                        zIndex: 3,
                        marginRight: R(8)
                    }}
                    textStyle={STYLES.textStyle}
                    hideLabel
                    openedBorderColor={''}
                />

                <SelectSearchInput
                    label={'Statuses'}
                    options={statuses}
                    selectedOptions={selectedStatuses}
                    firstOptionName={ALL_STATUSES}
                    style={STYLES.container}
                    textStyle={STYLES.textStyle}
                    parentContainerStyle={{ marginLeft: R(8)}}
                    onOptionClicked={onStatusSelected}
                    hideSearchBox
                    optionImageStyle={STYLES.optionImageStyle}
                    tagImagesStyle={STYLES.optionImageStyle}
                    arrowImageStyle={{width: R(33)}}
                />
            </div>

            <SelectInput
                options={recommendations}
                selectedOption={selectedRecommendation}
                onOptionChange={onRecommendationSelected}
                style={{...STYLES.container}}
                parentContainerStyle={{
                    zIndex: 2,
                    marginTop: R(10)
                }}
                textStyle={STYLES.textStyle}
                hideLabel
                openedBorderColor={''}
            />
        </div>
    )
}

