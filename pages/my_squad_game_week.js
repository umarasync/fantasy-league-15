// Packages
import {useState} from "react";

// Components
import Layout from "components/layout/index";
import Username from "components/user/Username";
import MySquadLeftSection from "components/mySquad/MySquadLeftSection";
import Div from "components/html/Div";

// Utils
import R from "utils/getResponsiveValue";
import {clone} from "utils/helpers";

import {
    SELECTED_PLAYERS
} from "constants/data/players";

import {useRouter} from "next/router";

// Constants
import colors from "constants/colors";
import BorderHorizontal from "../components/Borders/BorderHorizontal";
import InfoBoard from "../components/mySquad/InfoBoard";
import MatchBoard from "../components/mySquad/MatchBoard";

// Styles
const getStyles = (R) => {
    return {}
}

export default function MySquadGameWeek () {


    const STYLES =  { ... getStyles(R) }

    const router= useRouter()

    // Initial States
    const SELECTED_PLAYERS_INITIAL = clone(SELECTED_PLAYERS)
    const TOTAL_BUDGET = 100000000;
    // const TOTAL_BUDGET = 1000000;

    // Fields States
    const [pickedPlayers, setPickedPlayers] = useState(SELECTED_PLAYERS_INITIAL)

    // Footer Bar States
    const [autoPickDisabled, setAutoPickDisabled] = useState(false)

    return (
        <Layout title="Build Team All Player">
            <Div className="mx-auto relative bg-white">
                <div className={'flex'}>
                    <Div className="w-[62%]">
                        <MySquadLeftSection
                            pickedPlayers={pickedPlayers}
                            autoPickDisabled={autoPickDisabled}
                            onDeselectPlayer={() => false}
                        />
                    </Div>

                    {/*Right Section*/}
                    <div className="w-[38%] flex justify-center" style={{height: 'max-content'}}>
                        <InfoBoard/>
                    </div>
                </div>
            </Div>
        </Layout>
    )
}


