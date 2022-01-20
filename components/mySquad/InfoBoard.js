// Components
import Username from "components/user/Username";
import BorderHorizontal from "components/Borders/BorderHorizontal";
import Div from "components/html/Div";
import Text from "components/html/Text";
import LeagueCard from "components/leagues/LeagueCard";
import Image from "components/html/Image";
import Button from "components/html/Button";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";
import { SHADOW_DARK_INDIGO} from "constants/boxShadow";


export default function InfoBoard() {

    const leagues = [0, 1]

    return (
        <Div className={'relative'} w={390} pt={35}>
            {/*username*/}
            <div className={'flex flex-row-reverse'}>
                <Username username={'martine.bakker'} iconStyle={{ width: R(16.2), height: R(16.2) }} />
            </div>
            <Div mt={45}>
                <Text text={'gameweek 10'} fs={34} fw={900} fst={'italic'} tt={'uppercase'} lh={38} color={colors.dark_indigo}/>
                <Div mt={8}>
                    <Text text={'Transfer deadline:'} fs={18} lh={26} color={colors.dark_indigo} className={'inline'}/>
                    <Text text={' 10 Nov, 18:45'} fs={18} lh={26} color={colors.brick_red} className={'inline'}/>
                </Div>
            </Div>

            <Div className={'white-shadowed-background'} mt={32}>
                <Text text={'Champions fc'} fw={900} fst={'italic'} tt={'uppercase'} fs={22} p={24} color={colors.black_rock}/>
                <BorderHorizontal/>

                <Div className={'flex justify-evenly'} pt={24} pb={24}>
                    <Div className={'flex flex-col items-center'}>
                        <Text text={40} className={'gradient-text-1'} fs={42} lh={46} mb={8} pr={10} fst={'italic'} fw={800}/>
                        <Text text={'Weekly points'} fs={18} color={colors.regent_grey}/>
                    </Div>
                    <Div className={'flex flex-col items-center'}>
                        <Text text={813} fs={42} lh={46} mb={8} pr={10} fst={'italic'} fw={800}/>
                        <Text text={'Total points'} fs={18} color={colors.regent_grey}/>
                    </Div>
                </Div>
            </Div>

            <Div className={'white-shadowed-background'} p={24} mt={24}>
                <Div className={'flex items-center justify-between'} pb={24}>
                    <Text text={'leagues and ranking'} fs={22} fw={900} fst={'italic'} tt={'uppercase'} lh={26}/>
                    <Image w={24} h={24} name={'info_grey.png'}/>
                </Div>
                <BorderHorizontal/>
                <Div>
                    {
                        leagues.map((e, index) => (
                            <Div key={e}>
                                <LeagueCard pt={24} pb={24}/>
                                { index !== leagues.length - 1 && <BorderHorizontal/>}
                            </Div>
                        ))
                    }
                </Div>

                <Div className={'flex items-center justify-between'} pt={16} mb={16}>
                    <Text
                        text={'leagues and ranking'} fs={22} fw={900} fst={'italic'} tt={'uppercase'} lh={26}/>
                    <Image w={24} h={24} name={'info_grey.png'}/>
                </Div>
                <Text
                    text={"You aren't in any private leagues yet. Create or join one to battle it out Eredivisie stage"}
                    fs={16}
                    lh={20}
                    pr={12}
                    color={colors.regent_grey}
                />
                <Div justifyBetween mt={40}>
                    <Button
                        w={162}
                        h={50}
                        fs={14}
                        lh={20}
                        mr={8}
                        title={'Create a league'}
                    />
                    <Button
                        w={162}
                        h={50}
                        fs={14}
                        lh={20}
                        ml={9}
                        bg={colors.dark_indigo}
                        title={'Join a league'}
                        bs={SHADOW_DARK_INDIGO}
                    />
                </Div>
            </Div>

        </Div>
    )
}