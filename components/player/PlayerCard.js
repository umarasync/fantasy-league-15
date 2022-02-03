// Components
import PlayerImage from "components/player/PlayerImage";
import Border from "components/borders/Border";

// utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";
import {useEffect, useState} from "react";

// Styles
const getStyles = (R, props) => {

    const { chosen, hover } = props
    const selected = chosen || hover

    const { disablePlayerCard } = props.player

    return {
        container: {
            height: R(94),
            border: '0.1px solid whitesmoke',
            borderRadius: R(15),
            marginBottom: R(8),
            boxShadow: '4px 4px 10px -5px rgba(0, 0, 0, 0.05)',
            color: selected ? colors.white : colors.black_rock,
            background: selected ? 'linear-gradient(180deg, #EE6384 0%, #D9335B 100%)' : colors.white,
            opacity: disablePlayerCard && !selected ? 0.5 : 1,
            cursor: disablePlayerCard ? 'auto': 'pointer'
        },
        infoImage: {
            width: R(20),
            height: R(20),
            marginLeft: R(20),
            marginRight: R(17)
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
            fontWeight: '600',
            color: selected? colors.white : colors.brink_pink
        }
    }
}

export default function PlayerCard (props){

    const [hover, setHover] = useState(null);
    const {player, onSelectPlayer} = props
    const [chosen, setChosen] = useState(false)

    const STYLES =  { ...getStyles(R, { ...props, chosen, hover}) }

    const onMouseEnter = () => {
        if(player.disablePlayerCard) return
        setHover(true);
    }

    const onMouseLeave = () => {
        if (player.disablePlayerCard) return
        setHover(false);
    }

    const handleOnClick = () => {
        if(onSelectPlayer && !player.disablePlayerCard) {
            onSelectPlayer(player)
        }
    }

    useEffect(() => {
        setHover(false)
        setChosen(player.chosen)
    }, [player.chosen])

    return (
        <div
            className={'card-box flex items-center justify-between'} style={STYLES.container}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={handleOnClick}
        >
            {/*left side*/}
            <div className={'flex items-center'}>
                <div style={STYLES.infoImage}>
                    <img src={`/images/${chosen ? 'info_light.png' : 'info_grey.png'}`} width={'100%'} height={'100%'} alt=""/></div>
                <Border/>
                <PlayerImage player={player} ml={16} mr={16} w={70} h={70} />
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
                <p style={
                    STYLES.totalPoints
                }>{player.points}</p>
            </div>
        </div>
    )
}