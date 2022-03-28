// Packages
import dayjs from "dayjs";

// Utils
import {clone} from "utils/helpers";

// Constants
export const MAKE_TRANSFERS = 'make transfers'

export const setInitialSettings = ({
  initialMatchFixturesGameWeeks,
  setActiveTabContent,
  setMatchesGameWeeks
}) => {
    const $matchesGameWeeks = initialMatchFixturesGameWeeks.map((gw, index) => {
        if (gw.currentGameWeek) {
            gw.gameWeekDate = MAKE_TRANSFERS
            gw.active = true
            setActiveTabContent({...gw})
        }
        return gw
    })
    setMatchesGameWeeks($matchesGameWeeks)
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

export const scrollHandler = ({
    activeRef,
    scrollContainerRef,
    scrollBoxOriginPoint,
    moved,
    setMoved,
    setBorderWidth,
}) => {
    const {activeLeft, activeRect} = getActiveRect({
        itemRef: activeRef,
        scrollContainerRef
    })
    setBorderWidth(activeRect.width)
    let movedPixels = 0;
    if (activeLeft > scrollBoxOriginPoint) {
        movedPixels = activeLeft - scrollBoxOriginPoint
    } else {
        movedPixels = -1 * (scrollBoxOriginPoint - activeLeft)
    }
    setMoved(moved + movedPixels)
}

export const scrollRenderer = (props) => {
    const {
        activeRef,
        scrollContainerRef,
        setBorderWidth,
    } = props

    const $activeRectObj = getActiveRect({
        itemRef: activeRef,
        scrollContainerRef
    })
    if ($activeRectObj) {
        const {activeRect} = $activeRectObj
        setBorderWidth(activeRect.width)
        scrollHandler({...props})
    }
}

export const tabClickHandler = ({
    gw,
    matchesGameWeeks,
    setMatchesGameWeeks,
    tabChanged,
    setTabChanged,
    setActiveTabContent,
    animationInProgress,
}) => {
    if(animationInProgress) return
    let currentActive = matchesGameWeeks.findIndex((match) => match.active)
    const $matchesGameWeeks = matchesGameWeeks.map((item, index) => {
        item.active = item.id === gw.id;
        if (item.active) {
            setActiveTabContent({...item})
            setTabChanged(!tabChanged)
        }
        item.lastActive = index === currentActive
        return item
    })
    setMatchesGameWeeks($matchesGameWeeks)
}


export const controlsHandler = ({
    animationInProgress,
    isNext,
    matchesGameWeeks,
    // These props are necessary for tabClickHandler function
    setMatchesGameWeeks,
    tabChanged,
    setTabChanged,
    setActiveTabContent,
}) => {
    if (animationInProgress) return;
    const $matchesGameWeeks = clone(matchesGameWeeks)
    let objIndex = $matchesGameWeeks.findIndex((match) => match.active)
    let nextIndex = isNext ? objIndex + 1 : objIndex - 1
    if (nextIndex === $matchesGameWeeks.length || nextIndex === -1) return

    tabClickHandler({
        matchesGameWeeks,
        gw: $matchesGameWeeks[nextIndex],
        setMatchesGameWeeks,
        tabChanged,
        setTabChanged,
        setActiveTabContent,
    })
}

