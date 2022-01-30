// Packages
import {useEffect, useState} from "react";

// Components
import Div from "components/html/Div"
import MatchDate from "components/mySquad/MatchDate";
import MatchRow from "components/matches/MatchRow";

export default function MatchBoardContent({
    activeTabContent,
    tabChanged
}){

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
                                    <Div key={index} mt={50}>
                                        <MatchRow
                                            match={match}
                                            index={index}
                                            parentIndex={parentIndex}
                                            tabChanged={tabChanged}
                                            initialOpacity={initialOpacity}
                                        />
                                    </Div>
                                ))
                            }
                        </div>
                    )
                })
            }
        </div>

    )
}