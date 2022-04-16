// Packages
import dayjs from "dayjs";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";
import BorderHorizontal from "components/borders/BorderHorizontal";
import Goals from "components/matches/Goals";

// Constants
import colors from "constants/colors";

export default function LastMatchUps({
    match,
    containerRef
}) {

    const {details} = match

    const {lastMatchUps} = details

    return (
        <div ref={containerRef}>
            <Div pb={20}>
                {
                    lastMatchUps.map((item, index) => {

                        const team1 = item.homeTeam
                        const team2 = item.awayTeam

                        return (
                            <Div key={index} pt={24}>
                                <Text text={dayjs(item.date).format('dddd M MMMM YYYY')} fs={16} color={colors.regent_grey} textAlign={'center'}/>
                                <Div className={`flex`} pb={24} mt={12}>
                                    <Div w={'54.5%'}>
                                        <Div className={'flex items-center justify-end'}>
                                            <Div className={'flex items-center'}>
                                                <Text text={team1.name} fs={18} lh={22} mr={12}
                                                      color={colors.black_rock}/>
                                                <Image src={team1.logo} w={40} h={40} alt={'team1logo'}/>
                                            </Div>
                                            <Div center w={106}>
                                                <Goals
                                                    team1Goals={team1.goals}
                                                    team2Goals={team2.goals}
                                                    fs={18}
                                                    lh={26}
                                                />
                                            </Div>
                                        </Div>
                                    </Div>
                                    <Div w={'45.5%'} className={''}>
                                        <Div className={'flex items-center'}>
                                            <Image src={team2.logo} w={40} h={40} alt={'team2logo'}/>
                                            <Text text={team2.name} fs={18} lh={22} ml={12}
                                                  color={colors.black_rock}/>
                                        </Div>
                                    </Div>
                                </Div>
                                {index !== lastMatchUps.length - 1 && (<BorderHorizontal opacity={0.5}/>)}
                            </Div>

                        )
                    })
                }
            </Div>
        </div>
    )
}