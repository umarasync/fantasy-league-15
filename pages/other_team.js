// Packages
import {useState} from "react";

// Components
import Div from "components/html/Div";
import Layout from "components/layout";
import InfoBoard from "components/mySquad/InfoBoard";
import OtherTeamMySquadLeftSection from "components/otherTeam/OtherTeamMySquadLeftSection";

// constants
import colors from "constants/colors";
import {getPublicLeagues} from "constants/data/leaguesAndRanking";

// Utils
import {clone} from "utils/helpers";

export default function OtherTeam() {

    // Info-Board
    const [publicLeagues, setPublicLeagues] = useState(clone(getPublicLeagues()))

    return (
        <Layout title={'other team'}>
            <Div className="mx-auto relative bg-white">
                <Div className={'flex'}>
                    <Div className={'w-[62%]'}>
                        <OtherTeamMySquadLeftSection
                            pickedPlayers={[]}
                            changeFormation={false}
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