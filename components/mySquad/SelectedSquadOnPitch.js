// Components
import SelectedPlayerOnPitch from "components/mySquad/SelectedPlayerOnPitch";
import Div from "components/html/Div";

// Utils
import R from "utils/getResponsiveValue";
import {POSITION_DEF, POSITION_FWD, POSITION_GK, POSITION_MID} from "../../constants/data/filters";

// Styles
const getStyles = (R, transferInProgress) => {

    const { state, forPosition } = transferInProgress
    const getOpacity = (v) => v ? 0.5 : 1

    return {
        player1: {
            height: R(50),
            marginTop: R(15),
            opacity: getOpacity(state && forPosition === POSITION_GK),
        },
        player3:{
            height: R(50),
            opacity: getOpacity(state)
        },
        player4:{
            marginLeft: R(120),
            marginRight: R(120),
            height: R(50),
            opacity: getOpacity(state)
        },
        player5:{
            height: R(50),
            opacity: getOpacity(state)
        },
        row3: {
          marginLeft: R(57),
          marginRight: R(57),
        },
        player8: {
            height: R(50),
            opacity: getOpacity(state)
        },
        player9: {
            height: R(50),
            opacity: getOpacity(state)
        },
        player10: {
            height: R(50),
            opacity: getOpacity(state)
        },
        player11: {
            height: R(50),
            opacity: getOpacity(state)
        },
        player13:{
            height: R(50),
            opacity: getOpacity(state)
        },
        player14:{
            height: R(50),
            marginLeft: R(100),
            marginRight: R(100),
            opacity: getOpacity(state)
        },
        player15:{
            height: R(50),
            opacity: getOpacity(state)
        },
        benchContainer: {
            marginLeft: R(62),
            marginRight: R(62),
        },
        player2: {
            height: R(50),
            opacity: getOpacity(state)
        },
        player6: {
            height: R(50),
            opacity: getOpacity(state)
        },
        player7: {
            height: R(50),
            opacity: getOpacity(state)
        },
        player12: {
            height: R(50),
            opacity: getOpacity(state)
        },
    }
}

export default function selectedSquadOnPitch ({
   pickedPlayers,
   autoPickDisabled,
   onPlayerChange,
   transferInProgress
}){

    const STYLES =  { ... getStyles(R, transferInProgress) }

    const ZERO = 0
    const ONE = 1
    const TWO = 2
    const THREE = 3
    const FOUR = 4

    console.log({
        transferInProgress
    })

    return(
        <div style={{paddingTop: R(27)}}>
            {/*1*/}
            <Div center>
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_GK][ZERO]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add goalkeeper'}
                    style={STYLES.player1}
                    // onPlayerChange={() => {onPlayerChange(POSITION_GK, ZERO)}}
                    onPlayerChange={onPlayerChange}
                />
                {/*<SelectedPlayerOnPitch*/}
                {/*    player={pickedPlayers[POSITION_GK][ONE]}*/}
                {/*    autoPickDisabled={autoPickDisabled}*/}
                {/*    placeholderText={'Add goalkeeper'}*/}
                {/*    style={STYLES.player2}*/}
                {/*    onPlayerChange={() => {onPlayerChange(POSITION_GK, ONE)}}*/}
                {/*/>*/}
            </Div>
            {/*2*/}
            <Div center mt={60}>
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_DEF][ZERO]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add defender'}
                    style={STYLES.player3}
                    // onPlayerChange={() => {onPlayerChange(POSITION_DEF, ZERO)}}
                    onPlayerChange={onPlayerChange}
                />
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_DEF][ONE]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add defender'}
                    style={STYLES.player4}
                    // onPlayerChange={() => {onPlayerChange(POSITION_DEF, ONE)}}
                    onPlayerChange={onPlayerChange}

                />
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_DEF][TWO]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add defender'}
                    style={STYLES.player5}
                    // onPlayerChange={() => {onPlayerChange(POSITION_DEF, TWO)}}
                    onPlayerChange={onPlayerChange}
                />
            </Div>
            {/*3*/}
            <div className={'flex justify-center'}>
                {/*<SelectedPlayerOnPitch*/}
                {/*    player={pickedPlayers[POSITION_DEF][THREE]}*/}
                {/*    autoPickDisabled={autoPickDisabled}*/}
                {/*    placeholderText={'Add defender'}*/}
                {/*    style={STYLES.player6}*/}
                {/*    onPlayerChange={() => {onPlayerChange(POSITION_DEF, THREE)}}*/}
                {/*/>*/}
                {/*<SelectedPlayerOnPitch*/}
                {/*    player={pickedPlayers[POSITION_DEF][FOUR]}*/}
                {/*    autoPickDisabled={autoPickDisabled}*/}
                {/*    placeholderText={'Add defender'}*/}
                {/*    style={STYLES.player7}*/}
                {/*    onPlayerChange={() => {onPlayerChange(POSITION_DEF, FOUR)}}*/}
                {/*/>*/}
            </div>
            {/*4*/}
            <Div center mt={70}>
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_MID][ZERO]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add midfielder'}
                    style={{...STYLES.row3, ...STYLES.player8}}
                    // onPlayerChange={() => {onPlayerChange(POSITION_MID, ZERO)}}
                    onPlayerChange={onPlayerChange}
                />
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_MID][ONE]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add midfielder'}
                    style={{...STYLES.row3, ...STYLES.player9}}
                    // onPlayerChange={() => {onPlayerChange(POSITION_MID, ONE)}}
                    onPlayerChange={onPlayerChange}
                />
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_MID][TWO]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add midfielder'}
                    style={{...STYLES.row3, ...STYLES.player10}}
                    // onPlayerChange={() => {onPlayerChange(POSITION_MID, TWO)}}
                    onPlayerChange={onPlayerChange}
                />
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_MID][THREE]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add midfielder'}
                    style={{...STYLES.row3, ...STYLES.player11}}
                    // onPlayerChange={() => {onPlayerChange(POSITION_MID, THREE)}}
                    onPlayerChange={onPlayerChange}
                />
            </Div>
            {/*5*/}
            <div className={'flex justify-center'}>
                {/*<SelectedPlayerOnPitch*/}
                {/*    player={pickedPlayers[POSITION_MID][FOUR]}*/}
                {/*    autoPickDisabled={autoPickDisabled}*/}
                {/*    placeholderText={'Add midfielder'}*/}
                {/*    style={STYLES.player7}*/}
                {/*    onPlayerChange={() => {onPlayerChange(POSITION_MID, FOUR)}}*/}
                {/*/>*/}
            </div>
            {/*6*/}
            <Div center mt={70}>
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_FWD][ZERO]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add forward'}
                    style={STYLES.player13}
                    // onPlayerChange={() => {onPlayerChange(POSITION_FWD, ZERO)}}
                    onPlayerChange={onPlayerChange}
                />
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_FWD][ONE]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add forward'}
                    style={STYLES.player14}
                    // onPlayerChange={() => {onPlayerChange(POSITION_FWD, ONE)}}
                    onPlayerChange={onPlayerChange}
                />
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_FWD][TWO]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add forward'}
                    style={STYLES.player15}
                    // onPlayerChange={() => {onPlayerChange(POSITION_FWD, TWO)}}
                    onPlayerChange={onPlayerChange}
                />
            </Div>

            <Div center mt={90}>
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_GK][ONE]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add goalkeeper'}
                    style={{...STYLES.benchContainer, ...STYLES.player2}}
                    // onPlayerChange={() => {onPlayerChange(POSITION_GK, ONE)}}
                    onPlayerChange={onPlayerChange}
                />
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_DEF][THREE]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add defender'}
                    style={{...STYLES.benchContainer, ...STYLES.player6}}
                    // onPlayerChange={() => {onPlayerChange(POSITION_DEF, THREE)}}
                    onPlayerChange={onPlayerChange}
                />
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_DEF][FOUR]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add defender'}
                    style={{...STYLES.benchContainer, ...STYLES.player7}}
                    // onPlayerChange={() => {onPlayerChange(POSITION_DEF, FOUR)}}
                    onPlayerChange={onPlayerChange}
                />
                <SelectedPlayerOnPitch
                    player={pickedPlayers[POSITION_MID][FOUR]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add midfielder'}
                    style={{...STYLES.benchContainer, ...STYLES.player12}}
                    // onPlayerChange={() => {onPlayerChange(POSITION_MID, FOUR)}}
                    onPlayerChange={onPlayerChange}
                />
            </Div>
        </div>
    )
}