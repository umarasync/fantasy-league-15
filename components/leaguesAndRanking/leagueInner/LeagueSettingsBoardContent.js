// Packages
import {useEffect, useState} from "react";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import BorderHorizontal from "components/borders/BorderHorizontal";
import SuspendMemberModal from "components/leaguesAndRanking/leagueInner/SuspendMemberModal";

// Constants
import colors from "constants/colors";
import {getMembers} from "constants/data/leaguesGameWeeks";

// Utils
import R from "utils/getResponsiveValue";
import {clone, isEmpty} from "utils/helpers";

// Styles
const getStyles = (R) => {
    return {
        tbody: {
            display: 'block',
            overflowY: 'auto',
            overflowX: 'hidden',
            height: R(350),
            width: '100%',
            paddingTop: R(20),
            paddingBottom: R(20),
        },
        trow1: {
            paddingBottom: R(24),
            paddingTop: R(24)
        },
        trow: {
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
        }
    }
}
export default function LeagueSettingsBoardContent() {

    const STYLES = {...getStyles(R)}

    const MEMBERS_INITIAL = clone(getMembers())

    const [members, setMembers] = useState(MEMBERS_INITIAL)
    const [memberToBeSuspended, setMemberToBeSuspended] = useState({})
    const [showSuspendMemberModal, setShowSuspendMemberModal] = useState(false)

    const handleShowSuspendMemberModal = (member) => {
        setMemberToBeSuspended({...member})

    }

    const handleMemberSuspendedConfirmed = (m) => {
        // Call backend with member m.id and suspend it
        setShowSuspendMemberModal(false)
    }

    useEffect(() => {
        if(isEmpty(memberToBeSuspended)) return
        setShowSuspendMemberModal(true)
    }, [memberToBeSuspended])

    return (
        <Div mt={40}>
            <table className={'w-[100%]'}>
                <thead className={'flex items-center justify-between'}>
                    <th>
                        <Text text={'Members'} fs={18} lh={22} fw={600} color={colors.regent_grey}/>
                    </th>
                    <th/>
                </thead>
                <tbody style={STYLES.tbody}>
                {
                    members.map((member, index) => {
                        return (
                            <>
                                {
                                    !index && (
                                        <tr style={STYLES.trow}>
                                            <td className={'w-[100%]'}><BorderHorizontal/></td>
                                        </tr>
                                    )
                                }
                                <tr style={{
                                    ...STYLES.trow,
                                    ...STYLES.trow1
                                }}>
                                    <td>
                                        <Text text={member.teamName} fs={22} lh={26}
                                              fw={900}
                                              color={colors.black_rock}
                                              fst={'italic'}
                                              tt={'uppercase'}
                                        />
                                    </td>
                                    <td>
                                        <Text
                                            text={'Suspend'}
                                            fs={18}
                                            lh={22}
                                            color={colors.bean_red}
                                            cursor={'pointer'}
                                            onClick={() => handleShowSuspendMemberModal(member)}
                                        />
                                    </td>
                                </tr>
                                {
                                    index !== members.length - 1 && (
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

            {/*Suspend-Member-Modal*/}
            <SuspendMemberModal
                show={showSuspendMemberModal}
                member={memberToBeSuspended}
                onCancel={() => setShowSuspendMemberModal(false)}
                onConfirm={(m) => handleMemberSuspendedConfirmed(m)}
            />
        </Div>
    )
}