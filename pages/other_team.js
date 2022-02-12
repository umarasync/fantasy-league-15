// Packages
import {useEffect, useState} from "react";

// Components
import Div from "components/html/Div";
import Layout from "components/layout";
import InfoBoard from "components/mySquad/InfoBoard";
import OtherTeamMySquadLeftSection from "components/otherTeam/OtherTeamMySquadLeftSection";
import ProfileSettingsSideDrawer from "components/profileSettings/ProfileSettingsSideDrawer";

// constants
import {INITIAL} from "constants/animations";
import {getOtherTeamData} from "constants/data/otherTeam";

// Utils
import {clone, isEmpty} from "utils/helpers";
import {useSelector} from "react-redux";

export default function OtherTeam() {

    const [otherTeamData, setOtherTeamData] = useState([])
    const [pickedPlayers, setPickedPlayers] = useState([])
    const [selectedWeek, setSelectedWeek] = useState({})
    const [playersFormationAnimation, setPlayersFormationAnimation] = useState(INITIAL)

    const onSelectWeek = ($selectedWeek) => {

        const {data} = $selectedWeek

        const $pickedPlayers = data.players.map((p) => {
            p.toggleAnimation = $selectedWeek.toggleAnimation
            return p
        })

        setSelectedWeek($selectedWeek)
        setPickedPlayers([...$pickedPlayers])
        setPlayersFormationAnimation(data.playersFormationAnimation)
    }

    useEffect(() => {
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
                                    playersFormationAnimation={playersFormationAnimation}
                                    onSelectWeek={onSelectWeek}
                                    otherTeamData={otherTeamData}
                                />
                            )
                        }
                    </Div>
                    <Div className={'w-[38%] flex justify-center'}>
                        {
                            !isEmpty(selectedWeek) && (
                                <InfoBoard
                                    gameWeekInfo={selectedWeek}
                                    hideInfoBoardHead
                                    hideInfoBoardFooter
                                    disableClick
                                />
                            )
                        }
                        <ProfileSettingsSideDrawer/>
                    </Div>
                </Div>
            </Div>
        </Layout>
    )
}