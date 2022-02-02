// Utils
import {clone} from "utils/helpers";


export const setInitialSettings = ({
   initialGameWeeksRankings,
   setLeaguesGameWeeksRanking,
   setActiveTab,
}) => {
    const $initialGameWeeksRankings = clone(initialGameWeeksRankings)
    $initialGameWeeksRankings[0].active = true
    setActiveTab({...$initialGameWeeksRankings[0]})
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
    setLeaguesGameWeeksRanking,
}) => {
    if (animationInProgress) return;
    const $leaguesGameWeeksRanking = clone(leaguesGameWeeksRanking)
    let objIndex = $leaguesGameWeeksRanking.findIndex((lgwr) => lgwr.active)
    let nextIndex = isNext ? objIndex + 1 : objIndex - 1
    if (nextIndex === $leaguesGameWeeksRanking.length || nextIndex === -1) return false

    return $leaguesGameWeeksRanking[nextIndex]
}