// Packages
import {useState} from "react";

// Components
import Layout from "components/layout/index";
import AllPlayersOnField from "components/player/AllPlayersOnField";
import FooterBar from "components/footer/FooterBar";
import SearchBar from "components/search/SearchBar";
import Username from "components/login/Username";
import FilterIcon from "components/filter/FilterIcon";
import FilterButtons from "components/filter/filterButtons";
import SortingFilter from "components/filter/SortingFilter";

// Utils
import R from "utils/getResponsiveValue";
import PlayerCard from "../components/player/PlayerCard";

const options = [
    {
        name: 'Total points',
        value: 'total_points'
    },
    {
        name: 'Price (from high to low)',
        value: 'price_from_high_to_low'
    },
    {
        name: 'Price (from low to high)',
        value: 'price_from_low_to_high'
    },
    {
        name: 'Most transferred',
        value: 'most_transferred'
    },
]

export default function BuildTeamAllPlayer () {

    const [totalSelectedPlayers, setTotalSelectedPlayers] = useState(0)
    const [resetDisabled, setResetDisabled] = useState(true)
    const [activeButton, setActiveButton] = useState('All')
    const [autoPickDisabled, setAutoPickDisabled] = useState(false)
    const [continueDisabled, setContinueDisabled] = useState(true)
    const [remainingBudget, setRemainingBudget] = useState('100m')

    const onFilterButtonsClick = (buttonTitle) => setActiveButton(buttonTitle)

    const setValue = (option) => console.log(`Selected option:`, {
        option
    })

    const onSearch = () => false
    return (
        <Layout title="Build Team All Player">
            <div className="mx-auto flex bg-white">

                    {/*Left Section*/}
                    <div className="w-[57%]">
                        <div className="bg-[url('/images/bg-blue.png')] bg-[length:100%_100%] bg-no-repeat  w-full h-full" style={{
                            paddingTop: R(34),
                            paddingLeft: R(81.26),
                            paddingRight: R(81.26),
                            paddingBottom: R(150),
                            minHeight: R()
                        }}>
                            <div className="" style={{
                                width: R(164),
                                height: R(40),
                            }}>
                                <img src="/images/logo_white.png" alt="" width="100%" height="100%"/>
                            </div>

                            <div className="mt-[5rem] flex flex-col items-center">
                                <p
                                    className="uppercase font-[900] italic text-white"
                                    style = {{
                                        fontSize: R(42),
                                        lineHeight: R(46, 'px')
                                    }}
                                >
                                    make your selection
                                </p>
                                <p
                                    className="font-[300] text-center text-lavender_grey"
                                    style={{
                                        fontSize: R(18),
                                        lineHeight: R(26, 'px'),
                                        marginTop: R(20)
                                    }}
                                >
                                    Select a maximum of 3 players from a single team <br/>{`or 'Auto Pick' if you're short of time.`}
                                </p>
                            </div>

                            <div>
                                <div className=""
                                     style={{
                                         width: R(610),
                                         height: R(621),
                                         marginTop: R(40),
                                     }}
                                >
                                    <div className="bg-gray-500 bg-[url('/images/field1.png')] bg-[length:100%_100%] bg-no-repeat h-full w-full" >
                                        <AllPlayersOnField/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/*Right Section*/}
                    <div
                        className="w-[43%] flex justify-center"
                        style={{
                            minHeight: R()
                        }}
                    >
                        <div style={{width: R(488), paddingTop: R(35)}}>

                            {/*username*/}
                            <div
                                className={'flex flex-row-reverse'}
                                style={{
                                    marginBottom: R(46)
                                }}
                            ><Username username={'martine.bakker'} /></div>

                            {/*search*/}
                            <div className={'flex'} style={{marginBottom: R(20)}}>
                                <div className={'w-full'}>
                                    <SearchBar onSearch={onSearch}/>
                                </div>
                                <div style={{marginLeft: R(8)}}/>
                                <FilterIcon/>
                            </div>

                            {/*filter buttons*/}
                            <div style={{
                                marginBottom: R(24)
                            }}>
                                <FilterButtons activeButton={activeButton} onClick={onFilterButtonsClick}/>
                            </div>

                            {/*sorting filter*/}
                            <div>
                                <SortingFilter options={options} setValue={setValue}/>
                            </div>

                            {/*players cards*/}

                            <div>
                                <PlayerCard/>
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