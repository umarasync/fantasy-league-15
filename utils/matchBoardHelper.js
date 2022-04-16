// Utils
import {clone} from "utils/helpers";
import {getMatchFixturesForGameWeek} from "../redux/MatchFixtures/api";

// Constants
export const MAKE_TRANSFERS = 'make transfers'

export const setInitialSettings = ({
  initialGameWeeks,
  setMatchesGameWeeks
}) => {
    const $initialGameWeeks = clone(initialGameWeeks)
    const $gameWeeks = $initialGameWeeks.map((gw) => {
        if (gw.current) {
            gw.deadline = MAKE_TRANSFERS
            gw.active = true
        }else {
            gw.active = false
        }
        return gw
    })

    setMatchesGameWeeks([...$gameWeeks])
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

export const tabClickHandler1 = ({
    matchFixturesObj,
    matchesGameWeeks,
    setMatchesGameWeeks,
    activeTabContent,
    setActiveTabContent,
}) => {

    let currentActive = matchesGameWeeks.findIndex((match) => match.active)
    const $matchesGameWeeks = matchesGameWeeks.map((item, index) => {
        item.active = item.id === matchFixturesObj.id;
        item.lastActive = index === currentActive
        return item
    })

    setActiveTabContent({
        toggleAnimation: !activeTabContent.toggleAnimation,
        data: {...$matchesGameWeeks.find((gw) => gw.active)}
    })

    setMatchesGameWeeks($matchesGameWeeks)
}

export const tabClickHandler = ({
    activeGameWeek,
    matchesGameWeeks,
    setMatchesGameWeeks,
}) => {

    let currentActive = matchesGameWeeks.findIndex((match) => match.active)
    const $matchesGameWeeks = matchesGameWeeks.map((item, index) => {
        item.active = item.id === activeGameWeek;
        item.lastActive = index === currentActive
        return item
    })
    setMatchesGameWeeks($matchesGameWeeks)
}


export const controlsHandler = async ({
    isNext,
    matchesGameWeeks,
    dispatch,
    // These props are necessary for tabClickHandler function
    setMatchesGameWeeks,
    activeTabContent,
    setActiveTabContent,
}) => {
    const $matchesGameWeeks = clone(matchesGameWeeks)
    let objIndex = $matchesGameWeeks.findIndex((match) => match.active)
    let nextIndex = isNext ? objIndex + 1 : objIndex - 1
    if (nextIndex === $matchesGameWeeks.length || nextIndex === -1) return
    let nextGw = $matchesGameWeeks[nextIndex]

    const res = await dispatch(getMatchFixturesForGameWeek({gameWeek: nextGw.gameWeek}))

    tabClickHandler({
        matchesGameWeeks,
        // matchFixturesObj: res.data,
        matchFixturesObj: nextGw,
        setMatchesGameWeeks,
        activeTabContent,
        setActiveTabContent,
    })
}

