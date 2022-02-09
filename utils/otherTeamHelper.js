// Utils
import {clone} from "utils/helpers";
import {POSITION_DEF, POSITION_FWD, POSITION_GK, POSITION_MID} from "../constants/data/filters";
import {ANIMATE, INITIAL} from "../constants/animations";

export const setInitialSettings = ({
   otherTeamDataInitial,
   setOtherTeamData,
   setActiveTab,
}) => {
    const $otherTeamDataInitial = clone(otherTeamDataInitial)
    $otherTeamDataInitial.map((item) => {
        item.playersFormationAnimation = INITIAL
        return item
    })
    setActiveTab({
        data: {...$otherTeamDataInitial.find((item) => item.active)},
        toggleAnimation: false
    })
    setOtherTeamData([...$otherTeamDataInitial])
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

const changeAnimationFormation = (item) => {
    if (item.playersFormationAnimation === ANIMATE) {
        item.playersFormationAnimation = INITIAL
    } else {
        item.playersFormationAnimation = ANIMATE
    }
    return item
}

export const tabClickHandler = ({
    ot,
    otherTeamData,
    setOtherTeamData,
    activeTab,
    setActiveTab,
}) => {

    const $otherTeamData = otherTeamData.map(($item) => {
        $item.active = $item.id === ot.id;
        let item = changeAnimationFormation($item)
        if (item.active) {
            setActiveTab({
                data: {...item},
                toggleAnimation: !activeTab.toggleAnimation
            })
        }
        return item
    })

    setOtherTeamData([...$otherTeamData])
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


export const setPlayersAdditionalData = (pickedPlayersObject) => {

    const $pickedPlayersObject = clone(pickedPlayersObject)

    // Set icon for GKs
    const GKs = $pickedPlayersObject[POSITION_GK].map((player, index) => {
        player.isSubstitutePlayer = index === $pickedPlayersObject[POSITION_GK].length - 1;
        return player
    })

    // Set icon for DEFS
    const DEFs = $pickedPlayersObject[POSITION_DEF].map((player, index) => {

        player.isSubstitutePlayer = index === $pickedPlayersObject[POSITION_DEF].length - 1 || index === $pickedPlayersObject[POSITION_DEF].length - 2;

        return player
    })

    // Set icon for MIDs
    const MIDs = $pickedPlayersObject[POSITION_MID].map((player, index) => {

        player.isSubstitutePlayer = index === $pickedPlayersObject[POSITION_MID].length - 1;
        return player
    })

    // Set icon for FWDs
    const FWDs = $pickedPlayersObject[POSITION_FWD].map((player) => {
        player.isSubstitutePlayer = false
        return player
    })

    const players = [
        GKs[0],
        DEFs[0],
        DEFs[1],
        DEFs[2],
        MIDs[0],
        MIDs[1],
        MIDs[2],
        MIDs[3],
        FWDs[0],
        FWDs[1],
        FWDs[2],
        GKs[1],
        DEFs[3],
        DEFs[4],
        MIDs[4],
    ]

    return players.map((player, index) => {

        player.opacity = 1
        player.animationState = true

        return player
    })
}
