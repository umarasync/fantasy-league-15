// Packages
import Div from "components/html/Div";
import Text from "components/html/Text";

// Constants
import colors from "constants/colors"
import BorderHorizontal from "../../Borders/BorderHorizontal";

export default function LeagueBoardContent({
    activeTab
}) {
    const { teamsRank } = activeTab

    return (
        <Div className={'flex flex-col'} pl={24} pr={24}>

            {
                teamsRank.map((team,index) => {
                    return (
                        <Div key={index} className={'flex items-center justify-between'}>
                            <Div>
                                {/*<Text text={'Rank'} fs={18} lh={22} fw={600} color={colors.regent_grey}/>*/}
                                <Div key={index}>
                                    <Text text={`${index + 1}.${team.teamName}`} fs={22} lh={26} fw={900}
                                          color={colors.black_rock} fst={'italic'} tt={'uppercase'} pb={24}
                                          pt={24}/>
                                    <BorderHorizontal/>
                                </Div>
                            </Div>
                            <Div className={'flex'}>
                                <Div mr={100} textCenter>
                                    {/*<Text text={'Weekly points'} fs={18} lh={22} fw={600} color={colors.regent_grey}/>*/}
                                    <Div key={index}>
                                        <Text text={team.weeklyPoints} fs={24} lh={28} fw={600}
                                              color={colors.black_rock} pb={24} pt={24}/>
                                        <BorderHorizontal/>
                                    </Div>
                                </Div>
                                <Div textAign={'right'}>
                                    {/*<Text text={'Total points'} fs={18} lh={22} fw={600} color={colors.regent_grey}/>*/}
                                    <Div key={index}>
                                        <Text text={team.totalPoints} fs={24} lh={28} fw={600}
                                              color={colors.black_rock} pb={24} pt={24}/>
                                        <BorderHorizontal/>
                                    </Div>
                                </Div>
                            </Div>
                        </Div>
                    )
                })
            }

        </Div>
    )
}