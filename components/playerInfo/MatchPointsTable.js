// Packages
import {upperCase} from "lodash/string";

// Components
import Div from "components/html/Div"
import Text from "components/html/Text";
import Image from "components/html/Image";
import BorderHorizontal from "components/borders/BorderHorizontal";

// Constants
import colors from "constants/colors";

const MatchPointsTable = ({
    player
}) => {

    const { history } = player.seasonStats

    // Test Data
    const opp = {
        clubImage: 'club_ajax.png',
        clubName: 'GRO',
        matchType: 'H',
        matchResult: '3:1'
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

    const renderBody = () => {
        return history.length > 0 && history.map((h, index) => {
            return (
                <>
                    <tr className={'relative'}>
                        <Div w={'90%'} left={50}  position={'absolute'} >
                            <BorderHorizontal/>
                        </Div>
                    </tr>
                    <tr key={index}>
                        <td><TD title={index + 1}/></td>
                        <td>
                            <Div className={'flex items-center justify-center'} ml={24}>
                                <Image src={`/images/${opp.clubImage}`} w={18} pt={3} alt={'club image'} h={18}/>
                                <TD
                                    title={`${opp.clubName} (${upperCase(h.opp.location)}) ${h.opp.score1}:${h.opp.score2}`}
                                    ml={4}
                                />
                            </Div>
                        </td>
                        <td><TD title={h.pts}/></td>
                        <td><TD title={h.mp}/></td>
                        <td><TD title={h.gs}/></td>
                        <td><TD title={h.as}/></td>
                        <td><TD title={h.cs}/></td>
                        <td><TD title={h.gc}/></td>
                        <td><TD title={h.og}/></td>
                        <td><TD title={h.ps}/></td>
                        <td><TD title={h.pm}/></td>
                    </tr>
                </>

            )
        })
    }

    return (
        <Div pr={30} mt={24} pl={5} pb={15} overFlowXScroll>
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