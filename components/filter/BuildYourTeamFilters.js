// Components
import SelectSearchInput from 'components/inputs/SelectSearchInput'
import SelectInput from 'components/inputs/SelectInput'

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from 'constants/colors'
import {ALL_STATUSES, ALL_TEAMS} from "constants/data/filters";
import BorderHorizontal from "components/borders/BorderHorizontal";

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
       },
       resetFilters:{
           fontSize: R(16),
           color: colors.mandy,
           marginTop: R(20)
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

    // Reset Filters
    onResetFilterClicked
 }){

    const STYLES =  { ... getStyles(R) }

    return(
        <div>
            <BorderHorizontal style={{marginBottom: R(24)}}/>
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
            <p
                className={'uppercase font-[900] italic text-center cursor-pointer'}
                style={STYLES.resetFilters}
                onClick={onResetFilterClicked}
            >
                reset filters
            </p>
            <BorderHorizontal style={{marginTop: R(24)}}/>
        </div>
    )
}

