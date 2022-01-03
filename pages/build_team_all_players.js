// Packages
import {useEffect, useState} from "react";

// Components
import Layout from "components/layout/index";
import FooterBar from "components/footer/FooterBar";
import SearchBar from "components/search/SearchBar";
import Username from "components/login/Username";
import FilterIcon from "components/filter/FilterIcon";
import FilterButtons from "components/filter/FilterButtons";
import SortingFilter from "components/filter/SortingFilter/SortingFilter";
import PlayerCard from "components/player/PlayerCard";
import BuildTeamLeftSection from "components/buildTeam/BuildTeamLeftSection";
import BuildYourTeamFilters from "components/filter/BuildYourTeamFilters";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import {PLAYERS_DATA, CLUBS, POSITION_ALL, ALL_TEAMS} from "constants/data/team";

import filterOptions, {
    TOTAL_POINTS,
    PRICE_FROM_HIGH_TO_LOW,
    PRICE_FROM_LOW_TO_HIGH,
    MOST_TRANSFERRED
} from "constants/data/sortingFilterData";

// Styles
const getStyles = (R) => {
    return {
        allFiltersBox: {
            marginBottom: R(50),
            marginTop: R(50)
        }
    }
}

export default function BuildTeamAllPlayer () {

    const STYLES =  { ... getStyles(R) }

    const CLUBS_INITIAL = JSON.parse(JSON.stringify(CLUBS))
    const PLAYERS_DATA_INITIAL = JSON.parse(JSON.stringify(PLAYERS_DATA))

    const [totalSelectedPlayers, setTotalSelectedPlayers] = useState(0)
    const [resetDisabled, setResetDisabled] = useState(true)
    const [showAllFilters, setShowAllFilters] = useState(false)
    const [autoPickDisabled, setAutoPickDisabled] = useState(false)
    const [continueDisabled, setContinueDisabled] = useState(true)
    const [remainingBudget, setRemainingBudget] = useState('100m')
    const [playersData, setPlayersData] = useState([])
    const [sortingOption, setSortingOption] = useState(filterOptions[0])
    const [activePosition, setActivePosition] = useState(POSITION_ALL)

    const [clubs, setClubs] = useState([... CLUBS_INITIAL])
    const [selectedClubsNames, setSelectedClubsNames] = useState([ALL_TEAMS])
    const [selectedClubs, setSelectedClubs] = useState([CLUBS_INITIAL[0]])


    const onSearch = () => false

    const resetClubsState = (club) => {

        let CLUBS_INITIAL_I = [ ...CLUBS_INITIAL ]

        if(club.fromBackSpace || club.checked) {
            setSelectedClubs([])
            setSelectedClubsNames([])
            CLUBS_INITIAL_I[0].checked = false
        }else {
            // Reset
            setSelectedClubs([CLUBS_INITIAL_I[0]])
            setSelectedClubsNames([ALL_TEAMS])
        }

        setClubs([
            ...CLUBS_INITIAL_I
        ])
    }

    const handleClubSelection = (club) => {

        if(club.name === ALL_TEAMS) {
            return resetClubsState(club)
        }

        let clubsI = [ ...clubs ]

        // Uncheck all_teams option
        let allTeamsOption = clubsI[0]

        if(allTeamsOption.checked) {allTeamsOption.checked = false}

        let objIndex = clubsI.findIndex((obj) => obj.id === club.id)

        clubsI[objIndex].checked =  !clubsI[objIndex].checked

        const selectedClubs = clubsI.filter((club) => club.checked)

        setSelectedClubs([...selectedClubs])

        const selectedClubsNamesI = selectedClubs.map((clubI) => clubI.name)

        setSelectedClubsNames([...selectedClubsNamesI])

        setClubs([...clubsI])
    }

    const runFiltersOnPlayersData = () => {

        let playersDataI = [ ...PLAYERS_DATA_INITIAL ]

        if(activePosition !== POSITION_ALL && selectedClubsNames[0] === ALL_TEAMS) {
            playersDataI = playersDataI.filter(player => player.position === activePosition)
        } else if(activePosition === POSITION_ALL && selectedClubsNames[0] !== ALL_TEAMS) {
            playersDataI = playersDataI.filter(player => selectedClubsNames.includes(player.clubName))
        } else if (activePosition !== POSITION_ALL && selectedClubsNames[0] !== ALL_TEAMS) {
            playersDataI = playersDataI.filter(player => {
                if((player.position === activePosition) && selectedClubsNames.includes(player.clubName)){return player}
            })
        }


        if(sortingOption.value === PRICE_FROM_HIGH_TO_LOW){
            playersDataI = playersDataI.sort((a, b) => a.price < b.price ? 1 : -1)
        } else if(sortingOption.value === PRICE_FROM_LOW_TO_HIGH){
            playersDataI = playersDataI.sort((a, b) => a.price > b.price ? 1 : -1)
        } else if(sortingOption.value === TOTAL_POINTS){
            playersDataI = playersDataI.sort((a, b) => a.points < b.points ? 1 : -1)
        }else if(sortingOption.value === MOST_TRANSFERRED) {
            playersDataI = playersDataI.sort((a, b) => a.most_transferred < b.most_transferred ? 1 : -1)
        }

        setPlayersData([...playersDataI])
    }

    useEffect(() => {
            runFiltersOnPlayersData()
    }, [clubs, activePosition, sortingOption])

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
                                <FilterButtons activePosition={activePosition} onClick={(activePosition) => setActivePosition(activePosition)}/>
                            </div>

                            {/*all filters*/}

                            {
                                showAllFilters && (
                                    <div style={STYLES.allFiltersBox}>
                                        <BuildYourTeamFilters
                                            selectedClubs={selectedClubs}
                                            clubs={clubs}
                                            onClubSelected={handleClubSelection}
                                        />
                                    </div>
                                )
                            }

                            {/*sorting filter*/}
                            <div style={{marginBottom: R(16)}}>
                                <SortingFilter options={filterOptions} onApplyFilter={(option) => setSortingOption(option)}/>
                            </div>

                            {/*players cards*/}
                            <div style={{height: R(700), paddingBottom: R(200), overflowY: 'scroll'}}>
                                { playersData.map((player, index) => <PlayerCard key={index} player={player}/>) }
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