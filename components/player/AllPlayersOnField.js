// Packages
import {useAnimation} from "framer-motion";

// Components
import PlayerOnPitch from "components/player/PlayerOnPitch";
import Div from "components/html/Div";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import {
    ZERO,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    ELEVEN,
    TWELVE,
    THIRTEEN,
    FOURTEEN
} from "constants/arrayIndexes";
import {POSITION_DEF, POSITION_FWD, POSITION_GK, POSITION_MID} from "constants/data/filters";

// Styles
const getStyles = (R) => {
    return {
        container: {
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'center'
        },
        commonStyle: {
            height: R(110)
        },
        p1: {
            minWidth: R(120),
        },
        p3: {
            minWidth: R(175),
        },
        p6: {
            minWidth: R(190),
        },
        p7: {
            marginTop: R(-50),
            minWidth: R(190),
        },
        p4: {
            marginTop: R(-50),
            minWidth: R(175),
        },
        p5: {
            minWidth: R(115),
        },
    }
}

export default function AllPlayersOnField({
  pickedPlayers,
  onDeselectPlayer,
  isOneFreeTransferWindow
}) {

    const STYLES = {...getStyles(R)}

    const buildPlayer = (position, index) => {
        return {
            ...pickedPlayers[position][index],
            isOneFreeTransferWindow
        }
    }

    const p1 = buildPlayer(POSITION_GK, ZERO)
    const p2 = buildPlayer(POSITION_GK, ONE)
    const p3 = buildPlayer(POSITION_DEF, ZERO)
    const p4 = buildPlayer(POSITION_DEF, ONE)
    const p5 = buildPlayer(POSITION_DEF, TWO)
    const p6 = buildPlayer(POSITION_DEF, THREE)
    const p7 = buildPlayer(POSITION_DEF, FOUR)
    const p8 = buildPlayer(POSITION_MID, ZERO)
    const p9 = buildPlayer(POSITION_MID, ONE)
    const p10 = buildPlayer(POSITION_MID, TWO)
    const p11 = buildPlayer(POSITION_MID, THREE)
    const p12 = buildPlayer(POSITION_MID, FOUR)
    const p13 = buildPlayer(POSITION_FWD, ZERO)
    const p14 = buildPlayer(POSITION_FWD, ONE)
    const p15 = buildPlayer(POSITION_FWD, TWO)

    return (
        <div style={{paddingTop: R(27)}}>
            {/*1*/}
            <Div style={STYLES.container}>
                <PlayerOnPitch
                    player={p1}
                    placeholderText={'Add goalkeeper'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p1,
                        opacity: p1.opacity
                    }}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_GK, ZERO)}}
                />
                <PlayerOnPitch
                    player={p2}
                    placeholderText={'Add goalkeeper'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p1,
                        opacity: p2.opacity
                    }}
                    onDeselectPlayer={() => {
                        onDeselectPlayer(POSITION_GK, ONE)
                    }}
                />
            </Div>
            {/*2*/}
            <Div style={STYLES.container}>

                <PlayerOnPitch
                    player={p3}
                    placeholderText={'Add defender'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p3,
                        opacity: p3.opacity
                    }}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_DEF, ZERO)}}
                />
                <PlayerOnPitch
                    player={p4}
                    placeholderText={'Add defender'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p3,
                        opacity: p4.opacity
                    }}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_DEF, ONE)}}
                />
                <PlayerOnPitch
                    player={p5}
                    placeholderText={'Add defender'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p3,
                        opacity: p5.opacity
                    }}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_DEF, TWO)}}
                />
            </Div>
            {/*3*/}
            <Div style={STYLES.container}>
                <PlayerOnPitch
                    player={p6}
                    placeholderText={'Add defender'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p4,
                        opacity: p6.opacity
                    }}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_DEF, THREE)}}
                />
                <PlayerOnPitch
                    player={p7}
                    placeholderText={'Add defender'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p4,
                        opacity: p7.opacity
                    }}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_DEF, FOUR)}}
                />
            </Div>
            {/*4*/}
            <Div style={STYLES.container}>
                <PlayerOnPitch
                    player={p8}
                    placeholderText={'Add midfielder'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p6,
                        opacity: p8.opacity
                    }}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_MID, ZERO)}}
                />
                <PlayerOnPitch
                    player={p9}
                    placeholderText={'Add midfielder'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p6,
                        opacity: p9.opacity
                    }}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_MID, ONE)}}
                />
                <PlayerOnPitch
                    player={p10}
                    placeholderText={'Add midfielder'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p6,
                        opacity: p10.opacity
                    }}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_MID, TWO)}}
                />
            </Div>
            {/*5*/}
            <Div style={STYLES.container}>
                <PlayerOnPitch
                    player={p11}
                    placeholderText={'Add midfielder'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p7,
                        opacity: p11.opacity
                    }}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_MID, THREE)}}
                />
                <PlayerOnPitch
                    player={p12}
                    placeholderText={'Add midfielder'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p7,
                        opacity: p12.opacity
                    }}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_MID, FOUR)}}
                />
            </Div>
            {/*6*/}
            <Div style={STYLES.container} mt={1}>
                <PlayerOnPitch
                    player={p13}
                    placeholderText={'Add forward'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p5,
                        opacity: p13.opacity
                    }}
                    onDeselectPlayer={() => {
                        onDeselectPlayer(POSITION_FWD, ZERO)
                    }}
                />
                <PlayerOnPitch
                    player={p14}
                    placeholderText={'Add forward'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p5,
                        opacity: p14.opacity
                    }}
                    onDeselectPlayer={() => {
                        onDeselectPlayer(POSITION_FWD, ONE)
                    }}
                />
                <PlayerOnPitch
                    player={p15}
                    placeholderText={'Add forward'}
                    style={{
                        ...STYLES.commonStyle,
                        ...STYLES.p5,
                        opacity: p15.opacity
                    }}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_FWD, TWO)}}
                />
            </Div>
        </div>
    )
}