// Packages
import {useRouter} from "next/router";

// Components
import Text from "components/html/Text";
import LeagueBoardTeamName from "components/leaguesAndRanking/leagueInner/LeagueBoardTeamName";
import LeagueBoardGameWeekPoints from "components/leaguesAndRanking/leagueInner/LeagueBoardGameWeekPoints";
import LeagueBoardWeeklyPoints from "components/leaguesAndRanking/leagueInner/LeagueBoardWeeklyPoints";
import LeagueBoardWeeklyPointsHeading from "components/leaguesAndRanking/leagueInner/LeagueBoardWeeklyPointsHeading";
import LeagueBoardGameWeekPointsHeading from "components/leaguesAndRanking/leagueInner/LeagueBoardGameWeekPointsHeading";

// Constants
import colors from "constants/colors"
import BorderHorizontal from "components/borders/BorderHorizontal";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        container: {
            paddingLeft: R(40),
            paddingRight: R(40),
            marginTop: R(32)
        },
        tbody: {
            display: 'block',
            overflowY: 'auto',
            overflowX: 'hidden',
            height: R(430),
            width: '143%',
            paddingTop: R(20),
            paddingBottom: R(20),
        },
        trow1: {
            paddingBottom: R(24),
            paddingTop: R(24)
        },
        trow: {
            display: 'flex',
            width: '100%',
        }
    }
}
export default function LeagueBoardContentTable({
    activeTab,
}) {
    const STYLES = {...getStyles(R)}
    const router = useRouter()

    const {data, animationChange} = activeTab
    const {teamsRank, overall, week} = data
    const shouldTexColorBeRed = false // put condition to make it red

    const handleRowClick = (team) => {
        router.push({
            pathname: '/other_team',
            id: team.id
        })
    }

    return (
        <div style={STYLES.container}>
            <table className={'w-[100%]'}>
                {/*Table-Head*/}
                <thead className={'w-[100%]'}>
                    <th className={'w-[70%] text-left whitespace-nowrap'}>
                        <Text text={'Rank'} fs={18} lh={22} fw={600} color={colors.regent_grey}/>
                    </th>
                    <th className={'w-[15%] text-center whitespace-nowrap'}>
                        <LeagueBoardWeeklyPointsHeading overall={overall} heading={'Weekly points'}/>
                    </th>

                    <th className={`text-right whitespace-nowrap w-[15%]`}>
                        <LeagueBoardGameWeekPointsHeading
                            overall={overall}
                            heading={`${overall ? 'Total points' : `GW${week} points`}`}
                            animationChange={animationChange}
                        />
                    </th>
                </thead>
                {/*Table-Body*/}
                <tbody style={STYLES.tbody}>
                {
                    teamsRank.map((team, index) => {
                        return (
                            <>
                                {
                                    !index && (
                                        <tr style={STYLES.trow}>
                                            <td className={'w-[100%]'}><BorderHorizontal/></td>
                                        </tr>
                                    )
                                }
                                <tr key={index}
                                    style={{
                                        ...STYLES.trow,
                                        ...STYLES.trow1,
                                    }}
                                    className={'cursor-pointer'}
                                    onClick={() => handleRowClick(team)}
                                >
                                    <td className={'w-[70%] text-left whitespace-nowrap'}>
                                        <LeagueBoardTeamName
                                            team={team}
                                            index={index}
                                            animationChange={animationChange}
                                            shouldTexColorBeRed={shouldTexColorBeRed}
                                        />
                                    </td>
                                    <td className={'w-[15%] text-center whitespace-nowrap'}>
                                        <LeagueBoardWeeklyPoints overall={overall} team={team}/>
                                    </td>
                                    <td className={`text-right whitespace-nowrap w-[15%]`}>
                                        <LeagueBoardGameWeekPoints
                                            overall={overall}
                                            team={team}
                                            animationChange={animationChange}
                                        />
                                    </td>
                                </tr>
                                {
                                    index !== teamsRank.length - 1 && (
                                        <tr style={STYLES.trow}>
                                            <td className={'w-[100%]'}><BorderHorizontal/></td>
                                        </tr>
                                    )
                                }
                            </>
                        )
                    })
                }
                </tbody>
            </table>

        </div>
    )
}