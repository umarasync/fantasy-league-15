// Utils
import {clone} from "utils/helpers";


export const setInitialSettings = ({
   initialGameWeeksRankings,
   setLeaguesGameWeeksRanking,
   setActiveTabContent,
}) => {
    const $initialGameWeeksRankings = clone(initialGameWeeksRankings)
    $initialGameWeeksRankings[0].active = true
    setActiveTabContent($initialGameWeeksRankings[0])
    setLeaguesGameWeeksRanking([...$initialGameWeeksRankings])
}

export const getActiveRect = ({
  itemRef,
  scrollContainerRef
}) => {
    if (!itemRef.current) return;
    const scrollRect = scrollContainerRef.current.getBoundingClientRect()
    const activeRect = itemRef.current.getBoundingClientRect()
    return {
        activeRect,
        activeLeft: activeRect.left - scrollRect.left,
    };
}


export const controlsHandler = ({
                                    animationInProgress,
                                    isNext,
                                    leaguesGameWeeksRanking,
                                }) => {
    // if (animationInProgress) return;
    const $leaguesGameWeeksRanking = clone(leaguesGameWeeksRanking)
    let objIndex = $leaguesGameWeeksRanking.findIndex((lgwr) => lgwr.active)
    let nextIndex = isNext ? objIndex + 1 : objIndex - 1
    if (nextIndex === $leaguesGameWeeksRanking.length || nextIndex === -1) return false

    $leaguesGameWeeksRanking[objIndex].active = false
    $leaguesGameWeeksRanking[nextIndex].active = true

    return $leaguesGameWeeksRanking

    // tabClickHandler({
    //     matches,
    //     match: $leaguesGameWeeksRanking[nextIndex],
    //     setMatches,
    //     tabChanged,
    //     setTabChanged,
    //     setActiveTabContent,
    // })
}