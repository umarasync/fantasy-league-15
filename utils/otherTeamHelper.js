// Packages
import dayjs from "dayjs";

// Utils
import {clone} from "utils/helpers";

// Constants
export const MAKE_TRANSFERS = 'make transfers'

export const setInitialSettings = ({
   initialOtherTeamData,
   setOtherTeamData,
   setActiveTab,
}) => {
    const $initialOtherTeamData = clone(initialOtherTeamData)

    $initialOtherTeamData.map((item, index) => {
        item.active = item.week === 10;
        return item
    })

    setActiveTab({
        data: {...$initialOtherTeamData.find((item) => item.active)},
        animationChange: false
    })
    setOtherTeamData([...$initialOtherTeamData])
}


// export const setInitialSettings = ({
//                                        initialMatches,
//                                        setActiveTabContent,
//                                        setMatches
//                                    }) => {
//     const $matches = initialMatches.map((match, index) => {
//         const todayDate = dayjs().format('YYYY-MM-D')
//         if (dayjs(match.date).isSame(todayDate)) {
//             match.date = MAKE_TRANSFERS
//             match.active = true
//             setActiveTabContent({...match})
//         }
//         return match
//     })
//     setMatches($matches)
// }

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
                                    ot,
                                    animationInProgress,
                                    otherTeamData,
                                    setOtherTeamData,
                                    activeTab,
                                    setActiveTab,
                                }) => {
    if (animationInProgress) return
    const $otherTeamData = otherTeamData.map((item, index) => {
        item.active = item.id === ot.id;
        if (item.active) {
            setActiveTab({
                data: {...item},
                animationChange: !activeTab.animationChange
            })
        }
        return item
    })
    setOtherTeamData($otherTeamData)
}


export const controlsHandler = ({
    animationInProgress,
    isNext,
    otherTeamData,
    // These props are necessary for tabClickHandler function
    setOtherTeamData,
    activeTab,
    setActiveTab,
}) => {
    if (animationInProgress) return;
    const $otherTeamData = clone(otherTeamData)
    let objIndex = $otherTeamData.findIndex((item) => item.active)
    let nextIndex = isNext ? objIndex + 1 : objIndex - 1
    if (nextIndex === $otherTeamData.length || nextIndex === -1) return

    tabClickHandler({
        animationInProgress,
        ot: $otherTeamData[nextIndex],
        otherTeamData,
        setOtherTeamData,
        activeTab,
        setActiveTab,
    })
}

