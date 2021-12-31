import R from "utils/getResponsiveValue";
import PlayerPlaceholder from "components/player/PlayerPlaceholder";

export default function AllPlayersOnField (){
    return(
        <>
            {/*1*/}
            <div className={'flex justify-center'} style={{paddingTop: R(27)}}>
                <PlayerPlaceholder style={{marginRight: R(30)}}/>
                <PlayerPlaceholder style={{marginLeft: R(30)}}/>
            </div>
            {/*2*/}
            <div className={'flex justify-between'}
                 style={{
                     paddingTop: R(42),
                     paddingLeft: R(80),
                     paddingRight: R(80),
                 }}
            >
                <PlayerPlaceholder/>
                <PlayerPlaceholder/>
                <PlayerPlaceholder/>
            </div>
            {/*3*/}
            <div className={' flex justify-center'}>
                <PlayerPlaceholder
                    style={{
                        marginRight: R(43),
                        marginTop: R(-18),
                    }}
                />
                <PlayerPlaceholder
                    style={{
                        marginLeft: R(43),
                        marginTop: R(-20),
                    }}
                />
            </div>
            {/*4*/}
            <div className={'flex justify-between'}
                 style={{
                     paddingTop: R(42),
                     paddingLeft: R(80),
                     paddingRight: R(80),
                 }}
            >
                <PlayerPlaceholder/>
                <PlayerPlaceholder/>
                <PlayerPlaceholder/>
            </div>
            {/*5*/}
            <div className={' flex justify-center'}>
                <PlayerPlaceholder
                    style={{
                        marginRight: R(43),
                        marginTop: R(-18),
                    }}
                />
                <PlayerPlaceholder
                    style={{
                        marginLeft: R(43),
                        marginTop: R(-20),
                    }}
                />
            </div>
            {/*2*/}
            <div className={'flex justify-center'}
                 style={{
                     paddingTop: R(42),
                     paddingLeft: R(80),
                     paddingRight: R(80),
                 }}
            >
                <PlayerPlaceholder/>
                <PlayerPlaceholder
                    style={{
                        marginRight: R(50),
                        marginLeft: R(50),
                    }}
                />
                <PlayerPlaceholder/>
            </div>
        </>
    )
}