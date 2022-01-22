// Packages
import {useState} from "react";

// Components
import Div from "components/html/Div"
import Text from "components/html/Text";
import Image from "components/html/Image";
import BorderHorizontal from "components/Borders/BorderHorizontal";

// Constants
import colors from "constants/colors";
import PLAYER_POINTS from "constants/data/playerPoints";

// Utils
import R from "utils/getResponsiveValue";
import {clone} from "utils/helpers";

// Styles
const getStyles = (R) => {
    return {
        container: {
            overflowX: 'scroll'
        },
        borderRow: {
            position: 'relative'
        }
    }
}

const MatchPointsTable = () => {
    const PLAYER_POINTS_INITIAL = clone(PLAYER_POINTS)
    const STYLES = {...getStyles(R)}

    const [employees, setEmployees] = useState([])

    const renderHeader = () => {
        let headerElement = ['GW', 'OPP', 'PTS', 'MP', 'GS', 'A', 'CS', 'GC', 'OG', 'PS', 'PM']
        return headerElement.map((title, index) => {
            return (
                <th key={index}>
                     <TH title={title} index={index}/>
                </th>
            )
        })
    }

    const TH = ({title, index}) => {
        return (
            <>
                <Text
                    text={title}
                    ml={24}
                    mb={12}
                    textAlign={index !== 1 ? 'center' : 'left'}
                    fst={'italic'}
                    fw={700}
                    fs={16}
                    lh={20}
                    color={colors.regent_grey}
                />
            </>
        )
    }

    const TD = ({title, ml=24}) => {
        return (
            <>
                <Text
                    text={title}
                    ml={ml}
                    mt={15}
                    mb={12}
                    center
                    fw={600}
                    fs={14}
                    lh={18}
                    nowrap
                    color={colors.black_rock}
                />
            </>
        )
    }

    const renderBody = () => {
        return  PLAYER_POINTS_INITIAL.matchPoints.map((item, index) => {
            return (
                <>
                    <tr style={STYLES.borderRow}>
                        <Div w={'90%'} left={50}  position={'absolute'} >
                            <BorderHorizontal/>
                        </Div>
                    </tr>
                    <tr key={index}>
                        <td><TD title={item.gw}/></td>
                        <td>
                            <Div className={'flex items-center justify-center'} ml={24}>
                                <Image name={item.opp.clubImage} w={18} pt={3} alt={'club image'} h={18}/>
                                <TD title={`${item.opp.clubName} (${item.opp.matchType}) ${item.opp.matchResult}`} ml={4}/>
                            </Div>
                        </td>
                        <td><TD title={item.pts}/></td>
                        <td><TD title={item.mp}/></td>
                        <td><TD title={item.gs}/></td>
                        <td><TD title={item.a}/></td>
                        <td><TD title={item.cs}/></td>
                        <td><TD title={item.gc}/></td>
                        <td><TD title={item.og}/></td>
                        <td><TD title={item.ps}/></td>
                        <td><TD title={item.pm}/></td>
                    </tr>
                </>

            )
        })
    }

    return (
        <Div style={STYLES.container} pr={30} mt={24} pl={5} pb={15}>
            <table>
                <thead>
                <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                {renderBody()}
                </tbody>
            </table>
        </Div>
    )


}

export default MatchPointsTable