// Packages
import {useEffect, useState} from "react";

// Components
import CardImage from "components/selectClub/CardImage";
import GoalAndMatchTime from "components/mySquad/GoalAndMatchTime";
import MatchDate from "components/mySquad/MatchDate";
import TeamName from "components/mySquad/TeamName";
import FT from "components/mySquad/FT";

// Utils
import R from "utils/getResponsiveValue";

// Animations
import ClubImageAnimation from 'Animations/mySquad/ClubImageAnimation'

// Styles
const getStyles = (R) => {
    return {
        matchBox: {
            marginTop: R(50)
        },
        leftBox:{
          paddingRight: R(100),
        },
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
        },
    }
}


export default function MatchBoardContent({
    activeTabContent,
    tabChanged
}){

    const STYLES =  { ...getStyles(R) }

    const { matchesDates } = activeTabContent

    const [initialOpacity, setInitialOpacity] = useState(1)

    useEffect(() => {
        if(initialOpacity) {
            setInitialOpacity(0)
        }
    }, [tabChanged])

    return (
        <div className={'w-full'}>
            {
               matchesDates && matchesDates.length > 0 && matchesDates.map((matchDate, index) => {
                   const parentIndex = index
                    return (
                        <div key={parentIndex} >
                            <MatchDate tabChanged={tabChanged} initialOpacity={initialOpacity} matchDate={matchDate}/>
                            {
                                matchDate.matches.map((match, index) => (
                                    <div key={index} style={STYLES.matchBox}>
                                        <div className={'flex items-center'}>
                                            <div className={'w-[54%]'}>
                                                <div className={'flex justify-end items-center relative'} style={STYLES.leftBox}>

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
                                                            image={{ ...STYLES.teamImage, name: match.club1.logo }}
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

                                                </div>
                                            </div>

                                            <div className={'w-[46%]'}>
                                                <div className={'flex items-center relative'}>
                                                    <div style={STYLES.teamImage}>
                                                        <CardImage
                                                            fadeInOutAnimation={ClubImageAnimation}
                                                            custom={{initialOpacity}}
                                                            changeCard={tabChanged}
                                                            image={{ ...STYLES.teamImage, name: match.club2.logo }}
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
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                })
            }
        </div>

    )
}