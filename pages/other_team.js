// Packages
import {useEffect, useState} from "react";

// Components
import Div from "components/html/Div";
import Layout from "components/layout";
import InfoBoard from "components/mySquad/InfoBoard";
import OtherTeamMySquadLeftSection from "components/otherTeam/OtherTeamMySquadLeftSection";

// constants
import {getPublicLeagues} from "constants/data/leaguesAndRanking";
import {INITIAL} from "constants/animations";
import {getOtherTeamData} from "constants/data/otherTeam";

// Utils
import {clone} from "utils/helpers";

export default function OtherTeam() {

    // Info-Board
    const [publicLeagues, setPublicLeagues] = useState([])
    const [otherTeamData, setOtherTeamData] = useState([])
    const [pickedPlayers, setPickedPlayers] = useState([])
    const [changeFormation, setChangeFormation] = useState(INITIAL)


    const onSelectWeek = (selectedWeek) => {
        const {data} = selectedWeek
        const $pickedPlayers = data.players.map((p) => {
            p.animationState = selectedWeek.animationChange
            return p
        })
        setPickedPlayers([...$pickedPlayers])
        setChangeFormation(data.changeFormation)
    }

    useEffect(() => {
        setPublicLeagues(clone(getPublicLeagues()))
        setOtherTeamData(clone(getOtherTeamData()))
    }, [])


    return (
        <Layout title={'other team'}>
            <Div className="mx-auto relative bg-white">
                <Div className={'flex'}>
                    <Div className={'w-[62%]'}>
                        {
                            otherTeamData.length > 0 && (
                                <OtherTeamMySquadLeftSection
                                    pickedPlayers={pickedPlayers}
                                    changeFormation={changeFormation}
                                    onSelectWeek={onSelectWeek}
                                    otherTeamData={otherTeamData}
                                />
                            )
                        }

                    </Div>
                    <Div className={'w-[38%] flex justify-center'}>
                        {
                            publicLeagues.length > 0 && (
                                <InfoBoard
                                    publicLeagues={publicLeagues}
                                    hideInfoBoardHead
                                    hideInfoBoardFooter
                                />
                            )
                        }
                    </Div>
                </Div>
            </Div>
        </Layout>
    )
}