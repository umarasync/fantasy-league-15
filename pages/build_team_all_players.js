// Packages
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

// Components
import Layout from "components/layout/index";
import FooterBar from "components/footer/FooterBar";
import BuildTeamLeftSection from "components/buildTeam/BuildTeamLeftSection";
import BuildTeamRightSection from "components/buildTeam/BuildTeamRightSection";

// Utils
import R from "utils/getResponsiveValue";
import {clone} from "utils/helpers";
import {
    handleAutoPick,
    playerSelectionHandler,
    playerDeselectionHandler,
    sortingHandler
} from "utils/buildYourTeamHelper";
import filtersHandler from "utils/buildYourTeamFiltersHelper";

// Constants
import {
    // POSITIONS
    POSITION_ALL,
    // CLUBS
    CLUBS,
    // PRICES
    PRICES,
    // STATUES
    STATUSES,
    // RECOMMENDATIONS
    RECOMMENDATIONS,
    // SORTING
    SORTING_OPTIONS,
} from "constants/data/filters";

import {
    ALL_PLAYERS_INDEXES,
    SELECTED_PLAYERS
} from "constants/data/players";

import  { PLAYERS } from "constants/data/players"

export default function BuildTeamAllPlayer () {

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

    // Filters-And-Sorting
    const runFiltersOnPlayersData = () => {

        let $playersData = [ ...playersDataInitial ]

        $playersData = $playersData.filter(player => {
            return filtersHandler({
                player,
                activePosition,
                selectedClubs,
                selectedPrice,
                selectedStatuses,
                selectedRecommendation
            })
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
                    {/*Left-Section*/}
                    <div className="w-[57%]"><
                        BuildTeamLeftSection
                            pickedPlayers={pickedPlayers}
                            autoPickDisabled={autoPickDisabled}
                            onDeselectPlayer={handlePlayerDeselection}
                        />
                    </div>
                    {/*Right-Section*/}
                    <div className="w-[43%] flex justify-center" style={{minHeight: R()}}>
                        <BuildTeamRightSection
                            // Filters
                            showAllFilters={showAllFilters}
                            setShowAllFilters={setShowAllFilters}
                            // Positions
                            activePosition={activePosition}
                            setActivePosition={setActivePosition}
                            // Initial-Opacity
                            initialOpacity={initialOpacity}
                            // Clubs
                            selectedClubs={selectedClubs}
                            clubs={clubs}
                            setClubs={setClubs}
                            setSelectedClubs={setSelectedClubs}
                            clubsInitial={CLUBS_INITIAL}
                            // Statuses
                            selectedStatuses={selectedStatuses}
                            statuses={statuses}
                            setStatuses={setStatuses}
                            setSelectedStatuses={setSelectedStatuses}
                            statusesInitial={STATUSES_INITIAL}
                            // Prices
                            prices={prices}
                            selectedPrice={selectedPrice}
                            setSelectedPrice={setSelectedPrice}
                            // Recommendations
                            recommendations={recommendations}
                            selectedRecommendation={selectedRecommendation}
                            setSelectedRecommendation={setSelectedRecommendation}
                            // Players-Data
                            playersData={playersData}
                            // Reset-Filter-Button
                            handleResetFilter={handleResetFilter}
                            // Sorting
                            sortingOptions={sortingOptions}
                            selectedSortingOption={selectedSortingOption}
                            setSelectedSortingOption={setSelectedSortingOption}
                            // Player-Selection
                            handlePlayerSelection={handlePlayerSelection}
                            // Search
                            onSearch={onSearch}
                        />
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