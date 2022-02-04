// Components
import Div from "components/html/Div";
import Image from "components/html/Image";
import Text from "components/html/Text";
import Button from "components/html/Button";
import BorderGreyVertical from "components/borders/BorderGreyVertical";

// Constants
import colors from "constants/colors";
import LeagueSettingsDropDown from "./LeagueSettingsDropDown";

export default function LeagueSettingsHeader({
    mb,
    onBackArrowClick
 }) {
    return (
        <Div className={'flex items-center justify-between'} mb={mb}>
            <Div className={'flex items-center'}>
                <Image
                    src={'/images/arrow_backward.png'}
                    w={32}
                    h={32}
                    mt={-7}
                    cursor={'pointer'}
                    alt={'arrow_backward'}
                    onClick={onBackArrowClick}
                />
                <Div className={'flex flex-col'} ml={17}>
                    <Text
                        text={'league settings'}
                        fs={42}
                        lh={46}
                        fw={900}
                        fst={'italic'}
                        tt={'uppercase'}
                        color={colors.white}
                        mb={8}
                    />
                </Div>
            </Div>
            <Div className={'flex items-center justify-between'}>
                <LeagueSettingsDropDown/>
                <BorderGreyVertical ml={32} mr={32}/>
                <Button
                    title={'Delete league'}
                    disabled={false}
                    h={50}
                    lh={20}
                    w={236}
                    color={colors.white}
                    bg={colors.rhino_shine}
                    bs={'unset'}
                    onClick={() => false}
                />
            </Div>
        </Div>
    )
}