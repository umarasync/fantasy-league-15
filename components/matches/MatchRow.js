// Packages
import {useEffect, useRef, useState} from "react";

// Components
import TeamName from "components/mySquad/TeamName";
import CardImage from "components/selectClub/CardImage";
import GoalAndMatchTime from "components/mySquad/GoalAndMatchTime";
import FT from "components/mySquad/FT";
import Div from "components/html/Div";
import FinishedMatchDetails from "components/matches/finishedMatches/FinishedMatchDetails";

// Animations
import ClubImageAnimation from "Animations/mySquad/ClubImageAnimation";

// Utils
import R from "utils/getResponsiveValue";
import UpcomingMatchDetails from "./upcomingMatches/UpcomingMatchDetails";

// Constants
import {ZERO} from "constants/arrayIndexes";

// Styles
const getStyles = (R) => {
    return {
        team1Name: {
            marginRight: R(20),
            marginLeft: R(16),
            right: R(160)
        },
        team2Name: {
            marginRight: R(16),
            marginLeft: R(20),
            left: R(60)
        },
        teamImage: {
            width: R(50),
            height: R(50)
        }
    }
}

export default function MatchRow({
    parentIndex,
    index,
    match,
    tabChanged,
    initialOpacity,
}) {
    const STYLES = {...getStyles(R)}
    const [showMatchDetails, setShowMatchDetails] = useState(false)

    const handleShowMatchDetails = () => {
        setShowMatchDetails(!showMatchDetails)
    }

    useEffect(() => {
        setShowMatchDetails(false)
    }, [tabChanged])

    return (
        <div>
            <Div className={'flex items-center cursor-pointer'} onClick={handleShowMatchDetails}>
                <div className={'w-[54%]'}>
                    <Div className={'flex justify-end items-center relative'} pr={100}>
                        <TeamName
                            tabChanged={tabChanged}
                            match={match}
                            club={match.club1}
                            index={index}
                            parentIndex={parentIndex}
                            initialOpacity={initialOpacity}
                            fromSecondClub={false}
                            teamStyle={STYLES.team1Name}
                        />
                        <div style={STYLES.teamImage}>
                            <CardImage
                                fadeInOutAnimation={ClubImageAnimation}
                                custom={{initialOpacity}}
                                changeCard={tabChanged}
                                image={{...STYLES.teamImage, name: `/images/${match.club1.logo}`}}
                            />
                        </div>
                        <div className={'relative'}>
                            <GoalAndMatchTime
                                match={match}
                                index={index}
                                parentIndex={parentIndex}
                                initialOpacity={initialOpacity}
                                tabChanged={tabChanged}
                            />
                            <FT
                                match={match}
                                index={index}
                                parentIndex={parentIndex}
                                initialOpacity={initialOpacity}
                                tabChanged={tabChanged}
                            />
                        </div>

                    </Div>
                </div>
                <div className={'w-[46%]'}>
                    <div className={'flex items-center relative'}>
                        <div style={STYLES.teamImage}>
                            <CardImage
                                fadeInOutAnimation={ClubImageAnimation}
                                custom={{initialOpacity}}
                                changeCard={tabChanged}
                                image={{...STYLES.teamImage, name: `/images/${match.club2.logo}`}}
                            />
                        </div>
                        <TeamName
                            tabChanged={tabChanged}
                            match={match}
                            club={match.club2}
                            index={index}
                            parentIndex={parentIndex}
                            initialOpacity={initialOpacity}
                            fromSecondClub={true}
                            teamStyle={STYLES.team2Name}
                        />
                    </div>
                </div>
            </Div>
            {/*Match Details*/}
            <div>
                {
                    match.finished ? (
                        <FinishedMatchDetails
                            match={match}
                            tabChanged={tabChanged}
                            showMatchDetails={showMatchDetails}
                        />
                    ): (
                        <UpcomingMatchDetails
                            match={match}
                            tabChanged={tabChanged}
                            showMatchDetails={showMatchDetails}
                        />
                    )
                }
            </div>
        </div>
    )
}