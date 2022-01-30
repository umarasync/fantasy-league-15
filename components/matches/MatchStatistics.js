// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";

// Constants
import colors from "constants/colors";

export default function MatchHighlights({
    match
}) {

    const {matchDetails} = match

    const {statistics} = matchDetails

    return (
        <Div w={'100%'} mt={24} className={'flex items-center justify-center'}>
            <table>
                <thead>
                    <th>
                        <Div className={'flex items-center'} mb={24}>
                            <Text text={match.club1.name} fs={18} lh={22} fw={600} color={colors.black_rock} mr={12}/>
                            <Image name={match.club1.logo} w={40} h={40}/>
                        </Div>
                    </th>
                    <th>
                        <Text text={'Team Stats'} fs={18} lh={26} color={colors.regent_grey} w={427} textAlign={'center'} mb={24}/>
                    </th>
                    <th>
                        <Div className={'flex items-center'} mb={24}>
                            <Image name={match.club2.logo} w={40} h={40}/>
                            <Text text={match.club2.name} fs={18} lh={22} fw={600} color={colors.black_rock} ml={12}/>
                        </Div>
                    </th>
                </thead>

                <tbody>
                    {
                        statistics.map((stat,index) => {
                           return (
                               <tr key={index} className={`text-center`}>
                                   <td><Text text={stat.team1} fs={18} lh={26} color={colors.black_rock} mb={24}/></td>
                                   <td><Text text={stat.heading} fs={18} lh={26} color={colors.regent_grey} mb={24}/></td>
                                   <td><Text text={stat.team2} fs={18} lh={26} color={colors.black_rock} mb={24}/></td>
                               </tr>
                           )
                        })
                    }
                </tbody>
            </table>
        </Div>
    )
}