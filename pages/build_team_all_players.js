// Packages
import {useEffect, useState} from "react";
import {AnimatePresence,motion} from "framer-motion";

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
import {clone, isEmpty, nFormatter} from "utils/helpers";
import {
    handleAutoPick,
    handleMultiSelectionDropDowns,
    updatePlayersDataAfterSelectionOrDeselection
} from "utils/buildYourTeam";

// Animation
import {PlayersCardAnimation, PlayersCardAnimation1} from "Animations/PlayersCardAnimations";

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
import {useRouter} from "next/router";

// Styles
const getStyles = (R, showAllFilters) => {
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

    const router= useRouter()

    // Initial States
    const CLUBS_INITIAL = clone(CLUBS)
    const PLAYERS_INITIAL = clone(PLAYERS)
    const PRICES_INITIAL = clone(PRICES)
    const STATUSES_INITIAL = clone(STATUSES)
    const RECOMMENDATIONS_INITIAL = clone(RECOMMENDATIONS)
    const SORTING_OPTIONS_INITIAL = clone(SORTING_OPTIONS)
    const ALL_PLAYERS_INDEXES_INITIAL = clone(ALL_PLAYERS_INDEXES)
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

    const STYLES =  { ... getStyles(R, showAllFilters) }

    // showAllFiltersAnimation: Starts
    const [initialOpacity, setInitialOpacity] = useState(1)
    const duration = 0.6
    const showAllFiltersAnimation = {
        initial: {
            opacity: initialOpacity,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: duration,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: duration,
            },
        },
    };

    //showAllFiltersAnimation:Ends

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

    const areFiltersApplied = () => {
        if(selectedClubs.length === 0 ||
            selectedClubs[0].value !== ALL_TEAMS ||
            selectedStatuses.length === 0 ||
            selectedStatuses[0].value !== ALL_STATUSES ||
            selectedPrice.value !== ALL_PRICES ||
            selectedRecommendation.value !== RECOMMENDED_PLAYERS
        ) {
            return true
        }

        return false
    }

    const runFiltersOnPlayersData = () => {

        let playersDataI = [ ...playersDataInitial ]

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
            // For animation
            if(initialOpacity) {
                setInitialOpacity(0)
            }
    }, [clubs, playersDataInitial, statuses, selectedRecommendation, selectedPrice, activePosition, selectedSortingOption, playersDataInitial])


    const getPlayersContainerHeight = () => {
        if(areFiltersApplied() && !playersData.length){
            return  'hide'
        }else if(showAllFilters) {
            return 'half'
        }else {
            return 'full'
        }
    }

    const handlePlayerSelection = (playerI) => {

        if(totalChosenPlayers === 15) return

        const playerPositionI = playerI.position

        const pickedPlayersI = { ...pickedPlayers }
        const pickedPlayersArray = pickedPlayersI[playerPositionI]

        if(
            (playerPositionI === POSITION_GK && pickedPlayersI[POSITION_GK].length < 2) ||
            (playerPositionI === POSITION_FWD && pickedPlayersI[POSITION_FWD].length < 3) ||
            (playerPositionI === POSITION_MID && pickedPlayersI[POSITION_MID].length < 5) ||
            (playerPositionI === POSITION_DEF && pickedPlayersI[POSITION_DEF].length < 5)
        ) {

            if(pickedPlayersArray.length === 0 || (pickedPlayersArray.length > 0 && !pickedPlayersArray.some(p => p.id === playerI.id))) {
                setRemainingBudget(remainingBudget - playerI.price)
                setTotalChosenPlayers(totalChosenPlayers + 1)
                pickedPlayersArray.push(playerI)

                setPlayersDataInitial(updatePlayersDataAfterSelectionOrDeselection(playersDataInitial, playerI, true))

            }

        } else if (!pickedPlayersArray.some(p => p.id === playerI.id)) {

            const indexOfEmptyPosition = pickedPlayersArray.findIndex(x => x === false)

            if(indexOfEmptyPosition === -1) return

            pickedPlayersArray[indexOfEmptyPosition] = playerI

            setRemainingBudget(remainingBudget - playerI.price)
            setTotalChosenPlayers(totalChosenPlayers + 1)

            setPlayersDataInitial(updatePlayersDataAfterSelectionOrDeselection(playersDataInitial, playerI, true))
        }

        setPickedPlayers({...pickedPlayersI})
    }



    const handlePlayerDeselection = (position, i) => {

        const pickedPlayersI = { ...pickedPlayers }

        const playerI = pickedPlayersI[position][i]

        setRemainingBudget(remainingBudget + playerI.price)
        setTotalChosenPlayers(totalChosenPlayers -1)
        setContinueDisabled(true)
        pickedPlayersI[position][i] = false

        setPickedPlayers(pickedPlayersI)

        setPlayersDataInitial(updatePlayersDataAfterSelectionOrDeselection(playersDataInitial, playerI, false))

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
                                            variants={showAllFiltersAnimation}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
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
                                                index={index}
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
                        onContinueClick={() => { router.push('/create_team_name')}}
                        onResetClick={handleResetClick}
                    />
            </div>
        </Layout>
    )
}