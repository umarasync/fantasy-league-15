// Components
import PlayerOnPitch from "components/player/PlayerOnPitch";

// Utils
import R from "utils/getResponsiveValue";
import {POSITION_DEF, POSITION_FWD, POSITION_GK, POSITION_MID} from "../../constants/data/filters";

// Styles
const getStyles = (R, autoPickDisabled) => {
    return {
        player1: {
            justifyContent: 'end',
            width: '50%',
            height: R(110),
            paddingRight: R(45),
            marginTop: R(15),
        },
        player2: {
            justifyContent: 'start',
            width: '50%',
            height: R(110),
            paddingLeft: R(45),
            marginTop: R(15),
        },
        player3:{
            width: '33%',
            height: R(50),
            justifyContent: 'center',
            paddingLeft: R(70),
        },
        player4:{
            width: '33%',
            height: R(50),
            justifyContent: 'center'
        },
        player5:{
            width: '33%',
            height: R(50),
            justifyContent: 'center',
            paddingRight: R(70)
        },
        player6: {
            justifyContent: 'end',
            width: '50%',
            height: R(117),
            paddingRight: R(65),
        },
        player7: {
            justifyContent: 'start',
            width: '50%',
            height: R(117),
            paddingLeft: R(65),
        },
        player13:{
            width: '33%',
            height: R(50),
            justifyContent: 'end',
            paddingLeft: R(30),
        },
        player14:{
            width: '33%',
            height: R(50),
            justifyContent: 'center'
        },
        player15:{
            width: '33%',
            height: R(50),
            justifyContent: 'start',
            paddingRight: R(30)
        }
    }
}

export default function AllPlayersOnField ({
   autoPickedPlayers,
   autoPickDisabled,
   onDeselectPlayer
}){


    const STYLES =  { ... getStyles(R, autoPickDisabled) }

    const ZERO = 0
    const ONE = 1
    const TWO = 2
    const THREE = 3
    const FOUR = 4

    return(
        <div style={{paddingTop: R(27)}}>
            {/*1*/}
            <div className={'flex justify-center'}>

                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_GK][ZERO]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add goalkeeper'}
                    style={STYLES.player1}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_GK, ZERO)}}
                />
                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_GK][ONE]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add goalkeeper'}
                    style={STYLES.player2}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_GK, ONE)}}
                />
            </div>

            {/*2*/}
            <div className={'flex justify-between'}>
                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_DEF][ZERO]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add defender'}
                    style={STYLES.player3}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_DEF, ZERO)}}
                />
                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_DEF][ONE]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add defender'}
                    style={STYLES.player4}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_DEF, ONE)}}

                />
                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_DEF][TWO]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add defender'}
                    style={STYLES.player5}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_DEF, TWO)}}

                />
            </div>
            {/*3*/}
            <div className={'flex justify-center'}>
                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_DEF][THREE]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add defender'}
                    style={STYLES.player6}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_DEF, THREE)}}
                />
                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_DEF][FOUR]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add defender'}
                    style={STYLES.player7}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_DEF, FOUR)}}
                />
            </div>
            {/*4*/}
            <div className={'flex justify-between'}>
                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_MID][ZERO]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add midfielder'}
                    style={STYLES.player3}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_MID, ZERO)}}
                />
                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_MID][ONE]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add midfielder'}
                    style={STYLES.player4}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_MID, ONE)}}
                />
                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_MID][TWO]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add midfielder'}
                    style={STYLES.player5}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_MID, TWO)}}
                />
            </div>
            {/*5*/}
            <div className={'flex justify-center'}>
                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_MID][THREE]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add midfielder'}
                    style={STYLES.player6}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_MID, THREE)}}
                />
                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_MID][FOUR]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add midfielder'}
                    style={STYLES.player7}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_MID, FOUR)}}
                />
            </div>
            {/*6*/}
            <div className={'flex justify-between'}>
                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_FWD][ZERO]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add forward'}
                    style={STYLES.player13}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_FWD, ZERO)}}
                />
                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_FWD][ONE]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add forward'}
                    style={STYLES.player14}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_FWD, ONE)}}
                />
                <PlayerOnPitch
                    player={autoPickDisabled && autoPickedPlayers[POSITION_FWD][TWO]}
                    autoPickDisabled={autoPickDisabled}
                    placeholderText={'Add forward'}
                    style={STYLES.player15}
                    onDeselectPlayer={() => {onDeselectPlayer(POSITION_FWD, TWO)}}
                />
            </div>
        </div>
    )
}