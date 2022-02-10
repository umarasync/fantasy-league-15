// Packages
import {AnimatePresence, motion} from "framer-motion";

// Components
import Username from "components/user/Username";
import SearchBar from "components/search/SearchBar";
import FilterIcon from "components/filter/FilterIcon";
import FilterButtons from "components/filter/FilterButtons";
import BuildYourTeamFilters from "components/filter/BuildYourTeamFilters";
import SelectInput from "components/inputs/SelectInput";
import PlayerCard from "components/player/PlayerCard";
import NoResultFound from "components/misc/NoResultFound";

// utils
import R from "utils/getResponsiveValue";
import {handleMultiSelectionDropDowns} from "utils/buildYourTeamHelper";

// Animations
import ShowAllFiltersAnimation from "Animations/buildYourTeam/ShowAllFiltersAnimation";
import {PlayersCardAnimation, PlayersCardAnimation1} from "Animations/PlayersCardAnimations";

// Constants
import {ALL_PRICES, ALL_STATUSES, ALL_TEAMS, RECOMMENDED_PLAYERS} from "constants/data/filters";

// Styles
const getStyles = (R) => {
    return {
        allFiltersBox: {
            paddingBottom: R(20),
            paddingTop: R(15)
        },
        noResultFound: {
            top: R(600)
        }
    }
}

export default function BuildTeamRightSection({
    // Filters
    showAllFilters,
    setShowAllFilters,
    // Positions
    activePosition,
    setActivePosition,
    // Initial-Opacity
    initialOpacity,
    // Clubs
    selectedClubs,
    clubs,
    setClubs,
    setSelectedClubs,
    clubsInitial,
    // Statuses
    selectedStatuses,
    statuses,
    setStatuses,
    setSelectedStatuses,
    statusesInitial,
    // Prices
    prices,
    selectedPrice,
    setSelectedPrice,
    // Recommendations
    recommendations,
    selectedRecommendation,
    setSelectedRecommendation,
    // Players-Data
    playersData,
    // Reset-Filter-Button
    handleResetFilter,
    // Sorting
    sortingOptions,
    selectedSortingOption,
    setSelectedSortingOption,
    // Player-Selection
    handlePlayerSelection,
    // Search
    onSearch,
    //user Object
    user
}) {

    const STYLES = {...getStyles(R)}

    const areFiltersApplied = () => {
        return selectedClubs.length === 0 ||
            selectedClubs[0].value !== ALL_TEAMS ||
            selectedStatuses.length === 0 ||
            selectedStatuses[0].value !== ALL_STATUSES ||
            selectedPrice.value !== ALL_PRICES ||
            selectedRecommendation.value !== RECOMMENDED_PLAYERS;
    }

    const getPlayersContainerHeight = () => {
        if (areFiltersApplied() && !playersData.length) {
            return 'hide'
        } else if (showAllFilters) {
            return 'half'
        } else {
            return 'full'
        }
    }

    return (
        <div className={'relative'} style={{width: R(488), paddingTop: R(35)}}>
            {/*username*/}
            <div className={'flex flex-row-reverse'} style={{marginBottom: R(46)}}>
                <Username username={user.username}/>

            </div>

            {/*search*/}
            <div className={'flex'} style={{marginBottom: R(20)}}>
                <div className={'w-full'}>
                    <SearchBar onSearch={onSearch}/>
                </div>
                <div style={{marginLeft: R(8)}}/>
                <FilterIcon
                    showAllFilters={showAllFilters}
                    onClick={() => setShowAllFilters(!showAllFilters)}
                />
            </div>

            {/*filter buttons*/}
            <div style={{
                marginBottom: R(24)
            }}>
                <FilterButtons
                    activePosition={activePosition}
                    onClick={(activePosition) =>
                        setActivePosition(activePosition)}
                />
            </div>
            {/*all filters*/}
            {
                showAllFilters ? (
                    <AnimatePresence>
                        <motion.div
                            variants={ShowAllFiltersAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            custom={{initialOpacity}}
                            className={'absolute w-full'}
                            style={STYLES.allFiltersBox}
                        >
                            <BuildYourTeamFilters
                                // Teams Filter
                                clubs={clubs}
                                selectedClubs={selectedClubs}
                                onClubSelected={(option) => handleMultiSelectionDropDowns(option, {
                                    firstOption: ALL_TEAMS,
                                    initialState: clubsInitial,
                                    state: clubs,
                                    setSelectedOptions: setSelectedClubs,
                                    setOptions: setClubs
                                })}

                                // Statuses Filter
                                statuses={statuses}
                                selectedStatuses={selectedStatuses}
                                onStatusSelected={(option) => handleMultiSelectionDropDowns(option, {
                                    firstOption: ALL_STATUSES,
                                    initialState: statusesInitial,
                                    state: statuses,
                                    setSelectedOptions: setSelectedStatuses,
                                    setOptions: setStatuses
                                })}

                                // Prices Filter
                                prices={prices}
                                selectedPrice={selectedPrice}
                                onPriceSelected={(price) => setSelectedPrice(price)}

                                // Recommendation Filter
                                recommendations={recommendations}
                                selectedRecommendation={selectedRecommendation}
                                onRecommendationSelected={(r) => setSelectedRecommendation(r)}

                                // Reset Filters
                                onResetFilterClicked={handleResetFilter}

                            />
                        </motion.div>
                    </AnimatePresence>
                ) : <AnimatePresence/>
            }

            {
                areFiltersApplied() && !playersData.length && (
                    <div className={'absolute w-full'} style={STYLES.noResultFound}>
                        <NoResultFound/>
                    </div>
                )
            }

            <motion.div
                variants={PlayersCardAnimation}
                animate={showAllFilters ? 'slideDown' : 'slideUp'}
            >

                <motion.div
                    variants={PlayersCardAnimation1}
                    animate={getPlayersContainerHeight()}
                >
                    <div style={{marginBottom: R(16)}}>
                        {
                            areFiltersApplied() && !playersData.length ? null : (
                                <SelectInput
                                    options={sortingOptions}
                                    selectedOption={selectedSortingOption}
                                    onOptionChange={(s) => setSelectedSortingOption(s)}
                                    parentContainerStyle={{
                                        zIndex: 1,
                                    }}
                                    hideLabel
                                    dropDownOfInlineStyle
                                />
                            )
                        }
                    </div>

                    <div style={{
                        height: '100%',
                        paddingBottom: getPlayersContainerHeight() === 'hide' ? 0 : 150,
                        overflow: 'scroll'
                    }}
                    >
                        {
                            playersData.map((player, index) => <PlayerCard
                                key={index}
                                player={player}
                                onSelectPlayer={handlePlayerSelection}
                            />)
                        }
                    </div>

                </motion.div>
            </motion.div>

        </div>
    )
}
