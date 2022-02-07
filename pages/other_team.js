// Packages
import {useState} from "react";

// Components
import Div from "components/html/Div";
import Layout from "components/layout";
import InfoBoard from "components/mySquad/InfoBoard";
import OtherTeamMySquadLeftSection from "components/otherTeam/OtherTeamMySquadLeftSection";

// constants
import {getPublicLeagues} from "constants/data/leaguesAndRanking";

// Utils
import {clone} from "utils/helpers";
import {setPlayersAdditionalData} from "utils/otherTeamHelper";

export default function OtherTeam() {

    // Info-Board
    const [publicLeagues, setPublicLeagues] = useState(clone(getPublicLeagues()))
    const [pickedPlayers, setPickedPlayers] = useState([])
    const [changeFormation, setChangeFormation] = useState(false)

    const onSelectWeek = (selectedWeek) => {

        // TODO:BACKEND - FETCH DATA FROM BACKEND By Week ID and Update
        const teamData = JSON.parse(localStorage.getItem('teamData'))
        let $pickedPlayers = setPlayersAdditionalData(teamData.pickedPlayers)
        $pickedPlayers = $pickedPlayers.map((p) => {
            p.animationState = selectedWeek.animationChange
            return p
        })
        setPickedPlayers([...$pickedPlayers])
    }

    return (
        <Layout title={'other team'}>
            <Div className="mx-auto relative bg-white">
                <Div className={'flex'}>
                    <Div className={'w-[62%]'}>
                        <OtherTeamMySquadLeftSection
                            pickedPlayers={pickedPlayers}
                            changeFormation={changeFormation}
                            onSelectWeek={onSelectWeek}
                        />
                    </Div>
                    <Div className={'w-[38%] flex justify-center'}>
                        <InfoBoard
                            publicLeagues={publicLeagues}
                            hideInfoBoardHead
                            hideInfoBoardFooter
                        />
                    </Div>
                </Div>
            </Div>
        </Layout>
    )
}
