// Components
import PlayerImage from "components/player/PlayerImage";
import Border from "components/Borders/Border";

// utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";
import {useState} from "react";

// Styles
const getStyles = (R) => {
    return {
        container: {
            height: R(94),
            border: '0.1px solid whitesmoke',
            borderRadius: R(15),
            marginBottom: R(8),
            backgroundColor: colors.white,
            // boxShadow: 'rgba(99, 99, 99, 0.2) 4px 4px 40px -10px'
            boxShadow: '4px 4px 10px -5px rgba(0, 0, 0, 0.05)'
        },
        infoImage: {
            width: R(20),
            height: R(20),
            marginLeft: R(20),
            marginRight: R(17)
        },
        playerImage: {
            marginLeft: R(16),
            marginRight: R(16)
        },
        playerName:{
            fontSize: R(18),
        },
        price:{
            fontSize: R(18),
            textAlign: 'right',
            fontWeight: '600',
        },
        type: {
            paddingTop: R(3),
            fontWeight: '200'
        },
        totalPoints: {
            marginLeft: R(16),
            marginRight: R(34),
            fontSize: R(22),
            fontWeight: '600'
        }
    }
}

export default function PlayerCard ({
    player,
    onSelectPlayer
}){
    const STYLES =  { ... getStyles(R) }

    const [hover, setHover] = useState(false);


    return (
        <div
            className={'card-box flex text-black_rock hover:text-white items-center justify-between cursor-pointer'} style={STYLES.container}
            onMouseEnter={()=>{setHover(true);}}
            onMouseLeave={()=>{setHover(false)}}
            onClick={() => onSelectPlayer(player)}
        >
            {/*left side*/}
            <div className={'flex items-center'}>
                <div style={STYLES.infoImage}><img src={`/images/${hover ? 'info_light.svg' : 'info_grey.svg'}`} alt=""/></div>
                <Border/>
                <PlayerImage playerImage={player.image} clubImage={player.clubImage} imageStyle={STYLES.playerImage} />
                <div>
                    <p className={'font-[600]'} style={STYLES.playerName}>
                        {player.name}
                        <p style={{paddingTop: R(3)}}>
                            <span>{player.nextMatch.club}</span>
                            <span className={'font-[200]'}>{` vs ${player.nextMatch.vs}`}</span>
                        </p>
                    </p>
                </div>
            </div>
            {/*right side*/}
            <div className={'flex items-center'}>
                <div style={{marginRight: R(16)}}>
                    <p style={STYLES.price}>
                        {player.formattedPrice}
                        <p style={STYLES.type}><span>{player.position}</span></p>
                    </p>
                </div>
                <Border/>
                <p style={{
                    ...STYLES.totalPoints,
                    color: hover? colors.white : colors.brink_pink
                }}>{player.points}</p>
            </div>
        </div>
    )
}