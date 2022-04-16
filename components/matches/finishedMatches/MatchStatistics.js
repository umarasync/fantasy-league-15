// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";

// Constants
import colors from "constants/colors";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        container: {
            marginTop: R(24),
            width:'100%',
            paddingBottom: R(40)
        }

    }
}

export default function MatchHighlights({
    match,
    containerRef
}) {

    const STYLES = {...getStyles(R)}

    const {details} = match

    const team1 = match.homeTeam
    const team2 = match.awayTeam

    const {statistics} = details

    return (
        <div ref={containerRef} className={'flex items-center justify-center'} style={STYLES.container}>
            <table>
                <thead>
                    <th>
                        <Div className={'flex items-center'} mb={24}>
                            <Text text={team1.name} fs={18} lh={22} fw={600} color={colors.black_rock} mr={12}/>
                            <Image src={team1.logo} w={40} h={40}/>
                        </Div>
                    </th>
                    <th>
                        <Text text={'Team Stats'} fs={18} lh={26} color={colors.regent_grey} w={427} textAlign={'center'} mb={24}/>
                    </th>
                    <th>
                        <Div className={'flex items-center'} mb={24}>
                            <Image src={team2.logo} w={40} h={40}/>
                            <Text text={team2.name} fs={18} lh={22} fw={600} color={colors.black_rock} ml={12}/>
                        </Div>
                    </th>
                </thead>

                <tbody>
                    {
                        statistics.map((stat,index) => {
                           return (
                               <tr key={index} className={`text-center`}>
                                   <td><Text text={stat.away} fs={18} lh={26} color={colors.black_rock} mb={24}/></td>
                                   <td><Text text={stat.title} fs={18} lh={26} color={colors.regent_grey} mb={24}/></td>
                                   <td><Text text={stat.home} fs={18} lh={26} color={colors.black_rock} mb={24}/></td>
                               </tr>
                           )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}