// Components
import PlayerImage from "components/player/PlayerImage";
import Border from "components/misc/Border";

// utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

const getStyles = (R) => {
    return {
        container: {
            height: R(94),
            border: '1px solid white',
            borderRadius: R(12)
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
            color: colors.black_rock
        },
        price:{
            fontSize: R(18),
            color: colors.black_rock,
            textAlign: 'right',
            fontWeight: '600'
        },
        type: {
            paddingTop: R(3),
            fontWeight: '200'
        },
        totalPoints: {
            marginLeft: R(16),
            marginRight: R(34),
            color: colors.brink_pink,
            fontSize: R(22),
            fontWeight: '600'
        }
    }
}

export default function PlayerCard ({
    playerType = 'MID'
}){
    const STYLES =  { ... getStyles(R) }

    return (
        <div className={'box-shadow-1 flex items-center justify-between'} style={STYLES.container}>
            {/*left side*/}
            <div className={'flex items-center'}>
                <div style={STYLES.infoImage}><img src="/images/info.png" alt=""/></div>
                <Border/>
                <PlayerImage playerImage={'player1.png'} clubImage={'club_fc.png'} imageStyle={STYLES.playerImage} />
                <div>
                    <p className={'font-[600]'} style={STYLES.playerName}>
                        R. Nelson
                        <p style={{paddingTop: R(3)}}>
                            <span>GRO</span>
                            <span className={'font-[200]'}>{` vs BEN`}</span>
                        </p>
                    </p>
                </div>
            </div>
            {/*right side*/}
            <div className={'flex items-center'}>
                <div style={{marginRight: R(16)}}>
                    <p style={STYLES.price}>
                        €6.4m
                        <p style={STYLES.type}><span>{playerType}</span></p>
                    </p>
                </div>
                <Border/>
                <p style={STYLES.totalPoints}>54</p>
            </div>
        </div>
    )
}