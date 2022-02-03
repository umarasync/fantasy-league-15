// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import BorderHorizontal from "components/Borders/BorderHorizontal";

// Constants
import colors from "constants/colors";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        thead: {
          marginBottom: R(20)
        },

        row: {
            paddingTop: R(24),
            paddingBottom: R(24)
        }
    }
}
export default function LeagueSettingsBoardContent() {

    const STYLES = {...getStyles(R)}

    const members = [
        '1. Klopps and robbers',
        '2. Football DEvils',
        '3. peace and love',
        '4. slow fc'
    ]

    const handleShowMemberSuspendModal = () => {
        return false
    }

    return (
        <Div mt={60}>
            <table>
                <thead className={'flex items-center justify-between'} style={STYLES.thead}>
                    <th>
                        <Text text={'Members'} fs={18} lh={22} fw={600} color={colors.regent_grey}/>
                    </th>
                    <th/>
                </thead>
                <tbody>
                {
                    members.map((member, index) => {
                        return (
                            <>
                                {
                                    !index && (
                                        <tr>
                                            <td className={'w-[100%]'}><BorderHorizontal/></td>
                                        </tr>
                                    )
                                }
                                <tr>
                                    <td style={STYLES.row}>
                                        <Text text={member} fs={22} lh={26}
                                              fw={900}
                                              color={colors.black_rock}
                                              fst={'italic'}
                                              tt={'uppercase'}
                                        />
                                    </td>
                                    <td style={STYLES.row}>
                                        <Text
                                            text={'Suspend'}
                                            fs={18}
                                            lh={22}
                                            color={colors.bean_red}
                                            cursor={'pointer'}
                                            onClick={handleShowMemberSuspendModal}
                                        />
                                    </td>
                                </tr>
                                {
                                    index !== members.length - 1 && (
                                        <tr>
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
        </Div>
    )
}