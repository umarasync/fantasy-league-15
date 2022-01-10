// Components
import Username from "components/user/Username";
import BorderHorizontal from "components/Borders/BorderHorizontal";

// Utils
import R from "utils/getResponsiveValue";
import colors from "../../constants/colors";
import LeagueCard from "../leagues/LeagueCard";

// Styles
const getStyles = (R) => {
    return {
        person: {
            width: R(16.2),
            height: R(16.2)
        },
        container: {
            width: R(390),
            paddingTop: R(35)
        },
        gameWeekHeading: {
            fontSize: R(34),
            lineHeight: R(38, 'px'),
            color: colors.dark_indigo,
            marginTop: R(45)
        },
        gameWeekSubHeading: {
            fontSize: R(18),
            lineHeight: R(26, 'px'),
            color: colors.dark_indigo,
            marginTop: R(8)
        },
        clubNameText: {
            fontSize: R(22),
            padding: R(24)
        },
        points: {
            fontSize: R(42),
            lineHeight: R(46, 'px'),
            marginBottom: R(8),
            paddingRight: R(10),
            fontStyle: 'italic',
            fontWeight: '800'
        },
        pointsSubHeading: {
            fontSize: R(18),
            color: colors.regent_grey
        },
        clubNameBox: {
            marginTop: R(32),
        },
        pointBox: {
            paddingTop: R(24),
            paddingBottom: R(24),
        },
        rankingText: {
            fontSize: R(22),
            paddingBottom: R(24)
        },
        leagueContainer: {
            padding: R(24),
            marginTop: R(24)
        },
        leaguePointBox: {
            paddingTop: R(24),
            paddingBottom: R(40)
        },
        infoIcon: {
            width: R(24),
            height: R(24)
        },
        clubImage: {

        }
    }
}

export default function InfoBoard() {

    const STYLES =  { ... getStyles(R) }

    return (
        <div className={'relative'} style={STYLES.container}>
            {/*username*/}
            <div className={'flex flex-row-reverse'}>
                <Username username={'martine.bakker'} iconStyle={STYLES.person} />
            </div>
            <div>
                <p className={'uppercase italic font-[900]'} style={STYLES.gameWeekHeading}>gameweek 10</p>
                <p style={STYLES.gameWeekSubHeading}>Transfer deadline: <span className={'text-brick_red'}>10 Nov, 18:45</span></p>
            </div>

            <div className={'white-shadowed-background'} style={STYLES.clubNameBox}>
                <p className={'uppercase italic font-[900]'} style={STYLES.clubNameText}>Champions fc</p>
                <BorderHorizontal/>
                <div className={'flex justify-evenly'} style={STYLES.pointBox}>
                    <div className={'flex flex-col items-center'}>
                        <p className={'gradient-text-1'} style={STYLES.points}>40</p>
                        <p style={STYLES.pointsSubHeading}>Weekly points</p>
                    </div>
                    <div className={'flex flex-col items-center'}>
                        <p style={STYLES.points}>813</p>
                        <p style={STYLES.pointsSubHeading}>Total points</p>
                    </div>
                </div>
            </div>

            <div className={'white-shadowed-background'} style={STYLES.leagueContainer}>
                <div className={'flex items-center justify-between'} style={STYLES.rankingText}>
                    <p className={'uppercase italic font-[900]'} >
                        leagues and ranking
                    </p>
                    <div style={STYLES.infoIcon}>
                        <img src="/images/info_grey.png" alt="" width={'100%'} height={'100%'}/>
                    </div>
                </div>
                <BorderHorizontal/>

                <div className={'flex justify-evenly'} style={STYLES.leaguePointBox}>
                    <LeagueCard/>
                </div>

            </div>

        </div>
    )
}