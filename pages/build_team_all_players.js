// Packages
import {useEffect, useState} from "react";

// Components
import Layout from "components/layout/index";
import FooterBar from "components/footer/FooterBar";
import SearchBar from "components/search/SearchBar";
import Username from "components/login/Username";
import FilterIcon from "components/filter/FilterIcon";
import FilterButtons from "components/filter/FilterButtons";
import PlayerCard from "components/player/PlayerCard";
import BuildTeamLeftSection from "components/buildTeam/BuildTeamLeftSection";
import BuildYourTeamFilters from "components/filter/BuildYourTeamFilters";
import SelectInput from "components/inputs/SelectInput";

// Utils
import R from "utils/getResponsiveValue";
import {clone, nFormatter} from "utils/helpers";

// Constants
import {
    // POSITIONS
    POSITION_ALL,
    // CLUBS
    CLUBS,
    ALL_TEAMS,
    // PRICES
    PRICES,
    ALL_PRICES,
    // STATUES
    STATUSES,
    ALL_STATUSES,
    // RECOMMENDATIONS
    RECOMMENDATIONS,
    RECOMMENDED_PLAYERS,
    POTENTIAL_PENALTY_TAKERS,
    MOST_PICKED_PLAYERS,
    MOST_PICKED_AS_CAPTAIN,
    // SORTING
    SORTING_OPTIONS,
    TOTAL_POINTS,
    PRICE_FROM_HIGH_TO_LOW,
    PRICE_FROM_LOW_TO_HIGH,
    MOST_TRANSFERRED
} from "constants/data/filters";

import  { PLAYERS } from "constants/data/players"

// Styles
const getStyles = (R) => {
    return {
        allFiltersBox: {
            paddingBottom: R(20),
            paddingTop: R(20)
        }
    }
}

export default function BuildTeamAllPlayer () {

    const STYLES =  { ... getStyles(R) }

    // Initial States
    const CLUBS_INITIAL = clone(CLUBS)
    const PLAYERS_INITIAL = clone(PLAYERS)
    const PRICES_INITIAL = clone(PRICES)
    const STATUSES_INITIAL = clone(STATUSES)
    const RECOMMENDATIONS_INITIAL = clone(RECOMMENDATIONS)
    const SORTING_OPTIONS_INITIAL = clone(SORTING_OPTIONS)

    // Footer Bar States
    const [totalSelectedPlayers, setTotalSelectedPlayers] = useState(0)
    const [resetDisabled, setResetDisabled] = useState(true)
    const [showAllFilters, setShowAllFilters] = useState(false)
    const [autoPickDisabled, setAutoPickDisabled] = useState(false)
    const [continueDisabled, setContinueDisabled] = useState(true)
    const [remainingBudget, setRemainingBudget] = useState(nFormatter(100000000))

    // Players States
    const [playersData, setPlayersData] = useState([])

    // Positions States
    const [activePosition, setActivePosition] = useState(POSITION_ALL)

    // Clubs States
    const [clubs, setClubs] = useState([... CLUBS_INITIAL])
    const [selectedClubs, setSelectedClubs] = useState([CLUBS_INITIAL[0]])

    // Statuses Statuses
    const [statuses, setStatuses] = useState([... STATUSES_INITIAL])
    const [selectedStatuses, setSelectedStatuses] = useState([STATUSES_INITIAL[0]])

    // Prices States
    const [prices, setPrices] = useState([...PRICES_INITIAL])
    const [selectedPrice, setSelectedPrice] = useState(PRICES_INITIAL[0])

    // Recommendations States
    const [recommendations, setRecommendations] = useState([...RECOMMENDATIONS_INITIAL])
    const [selectedRecommendation, setSelectedRecommendation] = useState(RECOMMENDATIONS_INITIAL[0])

    // Sorting
    const [sortingOptions, setSortingOptions] = useState([...SORTING_OPTIONS])
    const [selectedSortingOption, setSelectedSortingOption] = useState(SORTING_OPTIONS[0])


    const onSearch = () => false

    const resetMultiSelectsDataState = (option, data) => {

        const {
            setSelectedOptions,
            setOptions
        } = data

        let STATE_INITIAL_I = [ ...data.initialState ]

        if(option.fromBackSpace || option.checked) {
            setSelectedOptions([])
            STATE_INITIAL_I[0].checked = false
        }else {
            setSelectedOptions([STATE_INITIAL_I[0]])
        }

        setOptions([
            ...STATE_INITIAL_I
        ])
    }

    // Handles multi selections filters
    const handleMultiSelectionDropDowns = (option, data) => {

        if(option.value === data.firstOption) {
            return resetMultiSelectsDataState(option, data)
        }

        const {
            setSelectedOptions,
            setOptions
        } = data

        let newStateI = [ ...data.state ]

        let firstOption = newStateI[0]

        if(firstOption.checked) {firstOption.checked = false}

        let objIndex = newStateI.findIndex((obj) => obj.id === option.id)

        newStateI[objIndex].checked =  !newStateI[objIndex].checked

        const selectedOptions = newStateI.filter((option) => option.checked)

        setSelectedOptions([...selectedOptions])
        setOptions([...newStateI])
    }

    const runRecommendationsFilter = (player) => {

        if(
            (selectedRecommendation.value === RECOMMENDED_PLAYERS) && (player.recommended) ||
            (selectedRecommendation.value === POTENTIAL_PENALTY_TAKERS) && (player.penaltyTaker) ||
            (selectedRecommendation.value === MOST_PICKED_PLAYERS) && (player.picked > 0) ||
            (selectedRecommendation.value === MOST_PICKED_AS_CAPTAIN) && (player.pickedAsCaptain > 0)
        ){
            return true
        }
    }

    const runStatusFilter = (player) => {
        if(selectedStatuses.length > 0 &&
            (selectedStatuses[0].value === ALL_STATUSES || selectedStatuses.some( status => status.value === player.status ))){
            return runRecommendationsFilter(player)
        }
    }

    const runPriceFilter = (player) => {
        if(
            selectedPrice.value === ALL_PRICES ||
            ((selectedPrice.value.to === null) && player.price > selectedPrice.value.from) ||
            (player.price > selectedPrice.value.from && player.price < selectedPrice.value.to)) {
            return runStatusFilter(player)
        }
    }

    const runTeamFilter = (player) => {
        if(selectedClubs.length > 0 &&
            (selectedClubs[0].value === ALL_TEAMS || selectedClubs.some( club => club.value === player.clubName ))){
            return runPriceFilter(player)
        }
    }

    const runPositionFilter = (player) => {
        if(player.position === activePosition || activePosition === POSITION_ALL){
            return runTeamFilter(player)
        }
    }

    const startFiltering = (player) => runPositionFilter(player)

    const runFiltersOnPlayersData = () => {

        let playersDataI = [ ...PLAYERS_INITIAL ]

        playersDataI = playersDataI.filter(player => {
            return startFiltering(player)
        })

        // Sorting
        if(selectedSortingOption.value === PRICE_FROM_HIGH_TO_LOW){
            playersDataI = playersDataI.sort((a, b) => a.price < b.price ? 1 : -1)
        } else if(selectedSortingOption.value === PRICE_FROM_LOW_TO_HIGH){
            playersDataI = playersDataI.sort((a, b) => a.price > b.price ? 1 : -1)
        } else if(selectedSortingOption.value === TOTAL_POINTS){
            playersDataI = playersDataI.sort((a, b) => a.points < b.points ? 1 : -1)
        }else if(selectedSortingOption.value === MOST_TRANSFERRED) {
            playersDataI = playersDataI.sort((a, b) => a.most_transferred < b.most_transferred ? 1 : -1)
        }

        setPlayersData([...playersDataI])
    }

    useEffect(() => {
            runFiltersOnPlayersData()
    }, [clubs, statuses, selectedRecommendation, selectedPrice, activePosition, selectedSortingOption])

    return (
        <Layout title="Build Team All Player">
            <div className="mx-auto flex bg-white">
                    <div className="w-[57%]"><BuildTeamLeftSection/></div>

                    {/*Right Section*/}
                    <div className="w-[43%] flex justify-center" style={{minHeight: R()}}>
                        <div style={{width: R(488), paddingTop: R(35)}}>
                            {/*username*/}
                            <div className={'flex flex-row-reverse'} style={{marginBottom: R(46)}}>
                                <Username username={'martine.bakker'} />
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
                                (showAllFilters || true) && (
                                    <div style={STYLES.allFiltersBox}>
                                        <BuildYourTeamFilters

                                            // Teams Filter
                                            clubs={clubs}
                                            selectedClubs={selectedClubs}
                                            onClubSelected={(option) => handleMultiSelectionDropDowns(option, {
                                                firstOption: ALL_TEAMS,
                                                initialState: CLUBS_INITIAL,
                                                state: clubs,
                                                setSelectedOptions: setSelectedClubs,
                                                setOptions: setClubs
                                            })}

                                            // Statuses Filter
                                            statuses={statuses}
                                            selectedStatuses={selectedStatuses}
                                            onStatusSelected={(option) => handleMultiSelectionDropDowns(option, {
                                                firstOption: ALL_STATUSES,
                                                initialState: STATUSES_INITIAL,
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

                                        />
                                    </div>
                                )
                            }

                            {/*sorting filter*/}
                            <div style={{marginBottom: R(16)}}>
                                <SelectInput
                                    options={sortingOptions}
                                    selectedOption={selectedSortingOption}
                                    onOptionChange={(s) => setSelectedSortingOption(s)}
                                    hideLabel
                                    dropDownOfInlineStyle
                                />
                            </div>

                            {/*players cards*/}
                            <div style={{height: R(700), paddingBottom: R(200), overflowY: 'scroll'}}>
                                { playersData.map((player, index) => <PlayerCard key={index + 1} index={index} player={player}/>) }
                            </div>
                        </div>
                    </div>
                    <FooterBar
                        totalSelectedPlayers={totalSelectedPlayers}
                        remainingBudget={remainingBudget}
                        resetDisabled={resetDisabled}
                        autoPickDisabled={autoPickDisabled}
                        continueDisabled={continueDisabled}
                    />
            </div>
        </Layout>
    )
}