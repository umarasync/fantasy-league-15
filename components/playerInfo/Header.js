// Components
import Div from "components/html/Div"
import Text from "components/html/Text"
import Image from "components/html/Image"
import PlayerImage from "components/player/PlayerImage";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

export default function Header ({
    player,
    onClose,
    onMakeCaptain,
                                    onMakeViceCaptain
}) {

    const controls = [
        {
            image: 'polygon_red.png',
            heading: 'Sub',
            subHeading: 'out',
            action: false
        },
        {
            image: 'money.png',
            heading: 'Transfer',
            subHeading: 'out',
            action: false
        },
        {
            image: 'captain.png',
            heading: 'Make',
            subHeading: 'captain',
            action: onMakeCaptain
        },
        {
            image: 'vice_captain.png',
            heading: 'Make',
            subHeading: 'vice-captain',
            action: onMakeViceCaptain
        },
    ]

    return (
        <Div h={208} pt={24} pl={24} pr={24} pb={12} btlr={12} btrr={12}
             className={'bg-coastline_blue-congress_blue relative'}>
            {/*close icon*/}
            <Div position={'absolute'} cursor={'pointer'} right={24} onClick={onClose}><Image alt={'close'}
                                                                                              name={'close2.png'}/></Div>
            {/*header*/}
            <Div className={'flex items-center'}>
                <PlayerImage
                    w={120}
                    h={120}
                    ciw={44}
                    cih={44}
                    player={player}
                />
                <Div ml={20}>
                    <Text text={'Naoufal'} fw={600} fs={18} lh={22} mb={2} color={colors.white}/>
                    <Text text={'Bannis'} fw={600} fs={24} lh={28} mb={6} color={colors.white}/>
                    <Text text={'PEC Zwolle • MID'} fw={'normal'} fs={18} lh={22} color={colors.link_water}/>
                </Div>
            </Div>
            {/*controls*/}
            <Div mt={24} justifyBetween>
                {
                    controls.map((item, index) => {
                        return (
                            <Div
                                key={index}
                                w={110}
                                h={100}
                                br={12}
                                ml={index ? 10 : 0}
                                bg={colors.white}
                                cursor={item.action && 'pointer'}
                                onClick={item.action}
                                className={'box-shadow-electric-indigo flex items-center justify-center flex-col'}
                            >
                                <Image name={item.image} w={24} h={24}/>
                                <Text text={item.heading} fs={14} lh={16} mt={10} color={colors.regent_grey}/>
                                <Text text={item.subHeading} fs={14} lh={16} color={colors.regent_grey}/>
                            </Div>
                        )
                    })
                }

            </Div>
        </Div>
    )
}