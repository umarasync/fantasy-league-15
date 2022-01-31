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

export default function LastMatchUps({
    match,
    containerRef
}) {

    const STYLES = {...getStyles(R)}

    const {matchDetails} = match

    const {lastMatchUps} = matchDetails

    return (
        <div ref={containerRef} className={'flex items-center justify-center'} style={STYLES.container}>
            <table>
                <tbody>
                    {
                        lastMatchUps.map((item,index) => {
                           return (
                               <tr key={index} className={`text-center`}>
                                   <td><Text text={item.team1.label} fs={18} lh={22} color={colors.black_rock} /></td>
                                   <td className={'flex items-center justify-center'}><Text text={'2:2'} w={106} fs={18} lh={26} color={colors.black_rock} fw={600}/></td>
                                   <td><Text text={item.team2.label} fs={18} lh={22} color={colors.black_rock} /></td>
                               </tr>
                           )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}