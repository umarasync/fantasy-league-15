// Utils
import {clone} from "utils/helpers";
import {getMatchFixturesForGameWeek} from "../redux/MatchFixtures/api";

// Constants
export const MAKE_TRANSFERS = 'make transfers'

export const setInitialSettings = ({
  initialGameWeeks,
  setGameWeeks
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

    setGameWeeks([...$gameWeeks])
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
    activeGameWeek,
    gameWeeks,
    setGameWeeks,
}) => {

    let currentActive = gameWeeks.findIndex((match) => match.active)
    const $gameWeeks = gameWeeks.map((item, index) => {
        item.active = item.id === activeGameWeek;
        item.lastActive = index === currentActive
        return item
    })
    setGameWeeks($gameWeeks)
}


export const controlsHandler = async ({
    isNext,
    gameWeeks,
    setGameWeeks,
}) => {

    let objIndex = gameWeeks.findIndex((match) => match.active)
    let nextIndex = isNext ? objIndex + 1 : objIndex - 1
    if (nextIndex === gameWeeks.length || nextIndex === -1) return
    let nextGw = gameWeeks[nextIndex]

    tabClickHandler({
        activeGameWeek: nextGw.id,
        gameWeeks,
        setGameWeeks,
    })
}

