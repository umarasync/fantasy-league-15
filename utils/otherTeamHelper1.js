// Utils
import {clone} from "utils/helpers";


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

    console.log('5=======', itemRef.current)
    return {
        activeRect,
        activeLeft: activeRect.left - scrollRect.left,
    };
}

export const controlsHandler = ({
                                    isNext,
                                    otherTeamData,
                                }) => {
    const $otherTeamData = clone(otherTeamData)
    let objIndex = $otherTeamData.findIndex((lgwr) => lgwr.active)
    let nextIndex = isNext ? objIndex + 1 : objIndex - 1
    if (nextIndex === $otherTeamData.length || nextIndex === -1) return false

    return $otherTeamData[nextIndex]
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

    console.log('3========', {
        activeLeft,
        moved,
        movedPixels
    })

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
        const {activeRect, activeLeft} = $activeRectObj
        setBorderWidth(activeRect.width)
        scrollHandler({...props, activeLeft})
    }
}


export const tabClickHandler = ({
                                    lgwr,
                                    otherTeamData,
                                    setOtherTeamData,
                                    activeTab,
                                    setActiveTab,
                                    animationInProgress,
                                }) => {
    if (animationInProgress) return
    let currentActive = otherTeamData.findIndex((match) => match.active)
    const $otherTeamData = otherTeamData.map((item, index) => {
        item.active = item.id === lgwr.id;
        if (item.active) {
            setActiveTab({
                data: {...item},
                animationChange: !activeTab.animationChange
            })
        }
        item.lastActive = index === currentActive
        return item
    })
    setOtherTeamData([...$otherTeamData])
}


export const tabClickHandler1 = ({
                                     // League and ranking
                                     lgwr,
                                     otherTeamData,
                                     setOtherTeamData,
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
                                     activeRef,
                                     elementsRef
                                 }) => {

    if (animationInProgress) return

    const $otherTeamData = clone(otherTeamData)

    let previousActiveIndex = $otherTeamData.findIndex((item) => item.active)
    let nextActiveIndex = $otherTeamData.findIndex((item) => item.id === lgwr.id)

    $otherTeamData[previousActiveIndex].active = false
    $otherTeamData[nextActiveIndex].active = true
    setActiveTab({
        data: {...$otherTeamData[nextActiveIndex]},
        animationChange: !activeTab.animationChange
    })
    setOtherTeamData([...$otherTeamData])

    // // const el = elementsRef.current[lgwr.id]
    // const el = elementsRef.current[$otherTeamData[nextActiveIndex].id]
    // const {activeRect, activeLeft} = getActiveRect({
    //     // itemRef: activeRef,
    //     itemRef: el,
    //     scrollContainerRef
    // })
    //
    // scrollHandler({
    //     activeLeft,
    //     scrollBoxOriginPoint,
    //     moved,
    //     setMoved
    // })
    //
    // setBorderData({width: activeRect.width,})
}