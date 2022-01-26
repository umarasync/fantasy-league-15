// Packages
import {useEffect, useState} from "react";
import {AnimatePresence,motion} from "framer-motion";
import {useRouter} from "next/router";

// Components
import Layout from "components/layout/index";
import FooterBar from "components/footer/FooterBar";
import SearchBar from "components/search/SearchBar";
import Username from "components/user/Username";
import FilterIcon from "components/filter/FilterIcon";
import FilterButtons from "components/filter/FilterButtons";
import PlayerCard from "components/player/PlayerCard";
import BuildTeamLeftSection from "components/buildTeam/BuildTeamLeftSection";
import BuildYourTeamFilters from "components/filter/BuildYourTeamFilters";
import SelectInput from "components/inputs/SelectInput";
import NoResultFound from "components/misc/NoResultFound";

// Utils
import R from "utils/getResponsiveValue";
import {clone} from "utils/helpers";
import {
    handleAutoPick,
    handleMultiSelectionDropDowns,
    playerSelectionHandler,
    playerDeselectionHandler,
    sortingHandler
} from "utils/buildYourTeamHelper";

// Animation
import {PlayersCardAnimation, PlayersCardAnimation1} from "Animations/PlayersCardAnimations";
import ShowAllFiltersAnimation from "Animations/buildYourTeam/ShowAllFiltersAnimation"

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
    MOST_TRANSFERRED, POSITION_GK, POSITION_FWD, POSITION_MID, POSITION_DEF
} from "constants/data/filters";

import {
    ALL_PLAYERS_INDEXES,
    SELECTED_PLAYERS
} from "constants/data/players";

import  { PLAYERS } from "constants/data/players"

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

export default function BuildTeamAllPlayer () {

    const STYLES = {...getStyles(R)}

    const router= useRouter()

    // Initial States
    const CLUBS_INITIAL = clone(CLUBS)
    const PLAYERS_INITIAL = clone(PLAYERS)
    const PRICES_INITIAL = clone(PRICES)
    const STATUSES_INITIAL = clone(STATUSES)
    const RECOMMENDATIONS_INITIAL = clone(RECOMMENDATIONS)
    const SORTING_OPTIONS_INITIAL = clone(SORTING_OPTIONS)
    const SELECTED_PLAYERS_INITIAL = clone(SELECTED_PLAYERS)
    const TOTAL_BUDGET = 100000000;
    // const TOTAL_BUDGET = 1000000;

    // Fields States
    const [pickedPlayers, setPickedPlayers] = useState(SELECTED_PLAYERS_INITIAL)

    // Footer Bar States
    const [totalChosenPlayers, setTotalChosenPlayers] = useState(0)
    const [resetDisabled, setResetDisabled] = useState(true)
    const [showAllFilters, setShowAllFilters] = useState(false)
    const [autoPickDisabled, setAutoPickDisabled] = useState(false)
    const [continueDisabled, setContinueDisabled] = useState(true)
    const [totalBudget, setTotalBudget] = useState(TOTAL_BUDGET)
    const [remainingBudget, setRemainingBudget] = useState(TOTAL_BUDGET)

    // Players States
    const [playersData, setPlayersData] = useState([])
    const [playersDataInitial, setPlayersDataInitial] = useState(PLAYERS_INITIAL)

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
    const [sortingOptions, setSortingOptions] = useState([...SORTING_OPTIONS_INITIAL])
    const [selectedSortingOption, setSelectedSortingOption] = useState(SORTING_OPTIONS_INITIAL[0])

    const [initialOpacity, setInitialOpacity] = useState(1)

    const onSearch = () => false

    const handleResetFilter = () => {

        setClubs([...CLUBS_INITIAL])
        setSelectedClubs([CLUBS_INITIAL[0]])

        setStatuses([...STATUSES_INITIAL])
        setSelectedStatuses([STATUSES_INITIAL[0]])

        setPrices([...PRICES_INITIAL])
        setSelectedPrice(PRICES_INITIAL[0])

        setRecommendations([...RECOMMENDATIONS_INITIAL])
        setSelectedRecommendation(RECOMMENDATIONS_INITIAL[0])

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

    // Filters-And-Sorting
    const runFiltersOnPlayersData = () => {

        let $playersData = [ ...playersDataInitial ]

        $playersData = $playersData.filter(player => {
            return startFiltering(player)
        })

        $playersData = sortingHandler({
            playersData: $playersData,
            selectedSortingOption
        })

        setPlayersData([...$playersData])
    }

    // Initialize-Opacity
    const initialOpacityHandler = () => {
        if (initialOpacity) {
            setInitialOpacity(0)
        }
    }

    useEffect(() => {
            runFiltersOnPlayersData()
            initialOpacityHandler()
    }, [clubs, playersDataInitial, statuses, selectedRecommendation, selectedPrice, activePosition, selectedSortingOption, playersDataInitial])


    const areFiltersApplied = () => {
        return selectedClubs.length === 0 ||
            selectedClubs[0].value !== ALL_TEAMS ||
            selectedStatuses.length === 0 ||
            selectedStatuses[0].value !== ALL_STATUSES ||
            selectedPrice.value !== ALL_PRICES ||
            selectedRecommendation.value !== RECOMMENDED_PLAYERS;

    }

    const getPlayersContainerHeight = () => {
        if(areFiltersApplied() && !playersData.length){
            return  'hide'
        }else if(showAllFilters) {
            return 'half'
        }else {
            return 'full'
        }
    }

    const handlePlayerSelection = (player) => {
        return playerSelectionHandler({player,
            playersDataInitial,
            setPlayersDataInitial,
            totalChosenPlayers,
            setTotalChosenPlayers,
            pickedPlayers,
            setPickedPlayers,
            remainingBudget,
            setRemainingBudget
        })
    }


    const handlePlayerDeselection = (position, i) => {
        return playerDeselectionHandler({
            position,
            i,
            pickedPlayers,
            setPickedPlayers,
            remainingBudget,
            setRemainingBudget,
            totalChosenPlayers,
            setTotalChosenPlayers,
            playersDataInitial,
            setPlayersDataInitial,
            setContinueDisabled
        })
    }

    useEffect(() => {
        if(totalChosenPlayers === 0) {
            setAutoPickDisabled(false)
            setResetDisabled(true)
            setContinueDisabled(true)
        }else if(totalChosenPlayers === 15 && remainingBudget > 0){
            setAutoPickDisabled(true)
            setResetDisabled(false)
            setContinueDisabled(false)
        }
    }, [totalChosenPlayers])

    const onAutoPick = () => {
        const {
            chosenPlayersWithinBudget,
            remainingBudget,
            totalChosenPlayers: totalChosenPlayersI,
            players: playersI
        } = handleAutoPick({
            players: PLAYERS,
            allPlayersObjectIndexes: ALL_PLAYERS_INDEXES,
            totalBudget: TOTAL_BUDGET
        })

        setPickedPlayers(chosenPlayersWithinBudget)
        setRemainingBudget(remainingBudget)
        setTotalChosenPlayers(totalChosenPlayersI)
        setPlayersDataInitial(playersI)

        setAutoPickDisabled(true)
        setResetDisabled(false)
    }

    const handleResetClick = () => {
        setPickedPlayers(SELECTED_PLAYERS_INITIAL)
        setTotalChosenPlayers(0)
        setRemainingBudget(totalBudget)
        setAutoPickDisabled(false)
        setResetDisabled(true)
        setContinueDisabled(true)
        setPlayersData(PLAYERS_INITIAL)
        setPlayersDataInitial(PLAYERS_INITIAL)
    }

    const handleContinueClick = () => {
        // TODO:LOCAL_STORAGE_FOR_TESTING:START
        localStorage.setItem("pickedPlayers", JSON.stringify(pickedPlayers))
        // TODO:LOCAL_STORAGE_FOR_TESTING:ENDS

        router.push('/create_team_name')
    }


    // useEffect(() => {
    //     console.log('router =========', router)
    // }, [])

    return (
        <Layout title="Build Team All Player">
            <div className="mx-auto flex bg-white">
                    <div className="w-[57%]"><
                        BuildTeamLeftSection
                            pickedPlayers={pickedPlayers}
                            autoPickDisabled={autoPickDisabled}
                            onDeselectPlayer={handlePlayerDeselection}
                        />
                    </div>

                    {/*Right Section*/}
                    <div className="w-[43%] flex justify-center" style={{minHeight: R()}}>
                        <div className={'relative'} style={{width: R(488), paddingTop: R(35)}}>
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

                                                // Reset Filters
                                                onResetFilterClicked={handleResetFilter}

                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                ): <AnimatePresence/>
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
                                                        zIndex: 288888,
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
                                        overflow: 'scroll'}}
                                    >
                                        {
                                            playersData.map((player, index) => <PlayerCard
                                                key={index + 1}
                                                player={player}
                                                onSelectPlayer={handlePlayerSelection}
                                            />)
                                        }
                                    </div>

                                </motion.div>
                            </motion.div>

                        </div>
                    </div>
                    <FooterBar
                        totalChosenPlayers={totalChosenPlayers}
                        remainingBudget={remainingBudget}
                        resetDisabled={resetDisabled}
                        autoPickDisabled={autoPickDisabled}
                        continueDisabled={continueDisabled}
                        onAutoPick={onAutoPick}
                        onContinueClick={handleContinueClick}
                        onResetClick={handleResetClick}
                    />
            </div>
        </Layout>
    )
}