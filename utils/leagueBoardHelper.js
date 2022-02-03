// Utils
import {clone} from "utils/helpers";


export const setInitialSettings = ({
   initialGameWeeksRankings,
   setLeaguesGameWeeksRanking,
   setActiveTab,
}) => {
    const $initialGameWeeksRankings = clone(initialGameWeeksRankings)
    $initialGameWeeksRankings[0].active = true
    setActiveTab({
        data: {...$initialGameWeeksRankings[0]},
        animationChange: false
    })
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
    isNext,
    leaguesGameWeeksRanking,
}) => {
    const $leaguesGameWeeksRanking = clone(leaguesGameWeeksRanking)
    let objIndex = $leaguesGameWeeksRanking.findIndex((lgwr) => lgwr.active)
    let nextIndex = isNext ? objIndex + 1 : objIndex - 1
    if (nextIndex === $leaguesGameWeeksRanking.length || nextIndex === -1) return false

    return $leaguesGameWeeksRanking[nextIndex]
}

export const scrollHandler = ({
      activeLeft,
      scrollBoxOriginPoint,
      moved,
      setMoved,
 }) => {

    let movedPixels = 0;

    if (activeLeft > scrollBoxOriginPoint) {
        movedPixels = activeLeft - scrollBoxOriginPoint
    } else {
        movedPixels = -1 * (scrollBoxOriginPoint - activeLeft)
    }
    setMoved(moved + movedPixels)
}

export const tabClickHandler = ({
    // League and ranking
    lgwr,
    leaguesGameWeeksRanking,
    setLeaguesGameWeeksRanking,
    // active tab
    activeTab,
    setActiveTab,
    // scroll container
    scrollContainerRef,
    scrollBoxOriginPoint,
    // moved
    moved,
    setMoved,
    // border
    setBorderData,
    // animation
    animationInProgress,
    // refs
    elementsRef
}) => {

    if (animationInProgress) return

    const $leaguesGameWeeksRanking = clone(leaguesGameWeeksRanking)

    let previousActiveIndex = $leaguesGameWeeksRanking.findIndex((item) => item.active)
    let nextActiveIndex = $leaguesGameWeeksRanking.findIndex((item) => item.id === lgwr.id)

    $leaguesGameWeeksRanking[previousActiveIndex].active = false
    $leaguesGameWeeksRanking[nextActiveIndex].active = true
    setActiveTab({
        data: {...$leaguesGameWeeksRanking[nextActiveIndex]},
        animationChange: !activeTab.animationChange
    })
    setLeaguesGameWeeksRanking($leaguesGameWeeksRanking)

    const el = elementsRef.current[lgwr.id]
    const {activeRect, activeLeft} = getActiveRect({
        itemRef: el,
        scrollContainerRef
    })

    scrollHandler({
        activeLeft,
        scrollBoxOriginPoint,
        moved,
        setMoved
    })

    setBorderData({
        width: activeRect.width,
        // leftOffset: activeLeft
    })
}