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

    const {matchDetails} = match

    const {lastMatchUps} = matchDetails

    return (
        <div ref={containerRef}>
            <Div pb={20}>
                {
                    lastMatchUps.map((item, index) => {
                        return (
                            <Div key={index} pt={24}>
                                <Text text={item.date} fs={16} color={colors.regent_grey} textAlign={'center'}/>
                                <Div className={`flex`} pb={24} mt={12}>
                                    <Div w={'54.5%'}>
                                        <Div className={'flex items-center justify-end'}>
                                            <Div className={'flex items-center'}>
                                                <Text text={item.team1.label} fs={18} lh={22} mr={12}
                                                      color={colors.black_rock}/>
                                                <Image src={`/images/${item.team1.image}`} w={40} h={40}/>
                                            </Div>
                                            <Div center w={106}>
                                                <Goals
                                                    team1Goals={item.team1.goals}
                                                    team2Goals={item.team2.goals}
                                                    fs={18}
                                                    lh={26}
                                                />
                                            </Div>
                                        </Div>
                                    </Div>
                                    <Div w={'45.5%'} className={''}>
                                        <Div className={'flex items-center'}>
                                            <Image src={`/images/${item.team2.image}`} w={40} h={40}/>
                                            <Text text={item.team2.label} fs={18} lh={22} ml={12}
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