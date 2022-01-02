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

    const [totalSelectedPlayers, setTotalSelectedPlayers] = useState(0)
    const [resetDisabled, setResetDisabled] = useState(true)
    const [showAllFilters, setShowAllFilters] = useState(true)
    const [autoPickDisabled, setAutoPickDisabled] = useState(false)
    const [continueDisabled, setContinueDisabled] = useState(true)
    const [remainingBudget, setRemainingBudget] = useState('100m')
    const [playersData, setPlayersData] = useState([])
    const [sortingOption, setSortingOption] = useState(filterOptions[0])
    const [activePosition, setActivePosition] = useState(POSITION_ALL)

    const [clubs, setClubs] = useState(CLUBS)
    const [selectedClubsNames, setSelectedClubsNames] = useState([ALL_TEAMS])


    const onSearch = () => false

    const resetClubsState = () => {
        setClubs([...CLUBS])
        setSelectedClubsNames([ALL_TEAMS])
    }

    const handleClubSelection = (option) => {

        console.log("option ============", {
            option
        })
        if(option.value === ALL_TEAMS) {
            return resetClubsState()
        }

        let clubsI = [ ...clubs ]

        // Uncheck all teams option
        let allTeamsOption = clubsI[0]

        console.log("allTeamsOption ============", {
            allTeamsOption
        })

        if(allTeamsOption.checked) {allTeamsOption.checked = false}

        let objIndex = clubsI.findIndex((obj) => obj.id === option.id)
        clubsI[objIndex].checked =  !clubsI[objIndex].checked

        const selectedClubsNamesI = clubsI.map((team) => {
            if(team.checked){
                return team.value
            }
        }).filter(notUndefined => notUndefined !== undefined)

        setSelectedClubsNames([...selectedClubsNamesI])
        setClubs([...clubsI])
    }

    const handleFilter = () => {

        let playersDataI = [ ...PLAYERS_DATA ]

        /*********
         * If active position is 'all'
         * ***********/

        // if(activePosition === POSITION_ALL && selectedClubsNames[0] === ALL_TEAMS) {
        //
        // } else

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
            handleFilter()
    }, [selectedClubsNames, activePosition, sortingOption])

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
                                    // showAllFilters={showAllFilters}
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
                                            selectedClubsNames={selectedClubsNames}
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