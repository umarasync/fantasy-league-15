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
}) => {
    const {activeLeft, activeRect} = getActiveRect({
        itemRef: activeRef,
        scrollContainerRef
    })
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
        setBorderData,
    } = props

    const $activeRectObj = getActiveRect({
        itemRef: activeRef,
        scrollContainerRef
    })
    if ($activeRectObj) {
        const {activeRect} = $activeRectObj
        setBorderData({width: activeRect.width})
        scrollHandler({...props})
    }
}

export const tabClickHandler = ({
    ot,
    otherTeamData,
    setOtherTeamData,
    activeTab,
    setActiveTab,
}) => {

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
    isNext,
    otherTeamData,
    // These props are necessary for tabClickHandler function
    setOtherTeamData,
    activeTab,
    setActiveTab,
}) => {
    const $otherTeamData = clone(otherTeamData)
    let objIndex = $otherTeamData.findIndex((item) => item.active)
    let nextIndex = isNext ? objIndex + 1 : objIndex - 1
    if (nextIndex === $otherTeamData.length || nextIndex === -1) return

    tabClickHandler({
        ot: $otherTeamData[nextIndex],
        otherTeamData,
        setOtherTeamData,
        activeTab,
        setActiveTab,
    })
}

