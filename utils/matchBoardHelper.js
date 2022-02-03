// Packages
import dayjs from "dayjs";

// Utils
import {clone} from "utils/helpers";

// Constants
export const MAKE_TRANSFERS = 'make transfers'

export const setInitialSettings = ({
  initialMatches,
  setActiveTabContent,
  setMatches
}) => {
    const $matches = initialMatches.map((match, index) => {
        const todayDate = dayjs().format('YYYY-MM-D')
        if (dayjs(match.date).isSame(todayDate)) {
            match.date = MAKE_TRANSFERS
            match.active = true
            setActiveTabContent({...match})
        }
        return match
    })
    setMatches($matches)
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
    match,
    matches,
    setMatches,
    tabChanged,
    setTabChanged,
    setActiveTabContent,
    animationInProgress,
}) => {
    if(animationInProgress) return
    let currentActive = matches.findIndex((match) => match.active)
    const $matches = matches.map((item, index) => {
        item.active = item.id === match.id;
        if (item.active) {
            setActiveTabContent({...item})
            setTabChanged(!tabChanged)
        }
        item.lastActive = index === currentActive
        return item
    })
    setMatches($matches)
}


export const controlsHandler = ({
    animationInProgress,
    isNext,
    matches,
    // These props are necessary for tabClickHandler function
    setMatches,
    tabChanged,
    setTabChanged,
    setActiveTabContent,
}) => {
    if (animationInProgress) return;
    const $matches = clone(matches)
    let objIndex = $matches.findIndex((match) => match.active)
    let nextIndex = isNext ? objIndex + 1 : objIndex - 1
    if (nextIndex === $matches.length || nextIndex === -1) return

    tabClickHandler({
        matches,
        match: $matches[nextIndex],
        setMatches,
        tabChanged,
        setTabChanged,
        setActiveTabContent,
    })
}

