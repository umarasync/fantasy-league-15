// Components
import PlayerOnPitch from "components/player/PlayerOnPitch";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R, autoPickDisabled) => {
    return {
        container1: {
            paddingTop: R(60),
            paddingLeft: R(110),
            paddingRight: R(110),
            // paddingTop: R(42),
            // paddingLeft: R(80),
            // paddingRight: R(80),
        }
    }
}

export default function AllPlayersOnField ({
   autoPickedPlayers,
   autoPickDisabled
}){

    const STYLES =  { ... getStyles(R, autoPickDisabled) }

    console.log('in AllPlayersOnField', {autoPickDisabled})

    return(
        <>
            {/*1*/}
            <div className={'flex justify-center'} style={{paddingTop: R(27)}}>
                <PlayerOnPitch autoPickDisabled={autoPickDisabled} style={{marginRight: R(40)}}/>
                <PlayerOnPitch autoPickDisabled={autoPickDisabled} style={{marginLeft: R(40)}}/>
            </div>

            {/*2*/}
            <div className={'flex justify-between'} style={STYLES.container1}>
                <PlayerOnPitch autoPickDisabled={autoPickDisabled}/>
                <PlayerOnPitch autoPickDisabled={autoPickDisabled}/>
                <PlayerOnPitch autoPickDisabled={autoPickDisabled}/>
            </div>
            {/*3*/}
            <div className={' flex justify-center'}>
                {/*<PlayerOnPitch autoPickDisabled={autoPickDisabled} style={{marginRight: R(70) }}/>*/}
                {/*<PlayerOnPitch autoPickDisabled={autoPickDisabled} style={{marginLeft: R(70)}}/>*/}
            </div>
            {/*4*/}
            <div className={'flex justify-between'} style={STYLES.container1}>
                <PlayerOnPitch autoPickDisabled={autoPickDisabled}/>
                <PlayerOnPitch autoPickDisabled={autoPickDisabled}/>
                <PlayerOnPitch autoPickDisabled={autoPickDisabled}/>
            </div>
            {/*5*/}
            <div className={' flex justify-center'}>
                {/*<PlayerOnPitch autoPickDisabled={autoPickDisabled} style={{marginRight: R(70)}}/>*/}
                {/*<PlayerOnPitch autoPickDisabled={autoPickDisabled} style={{marginLeft: R(70)}}/>*/}
            </div>
            {/*2*/}
            <div className={'flex justify-center'} style={STYLES.container1}>
                <PlayerOnPitch autoPickDisabled={autoPickDisabled}/>
                <PlayerOnPitch autoPickDisabled={autoPickDisabled} style={{marginRight: R(100), marginLeft: R(100),}}/>
                <PlayerOnPitch autoPickDisabled={autoPickDisabled}/>
            </div>
        </>
    )
}