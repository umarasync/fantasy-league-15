// Packages
import React, {useState} from "react";
import {useRouter} from "next/router";

// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Animated from "components/animation/Animated";
import BorderHorizontal from "components/borders/BorderHorizontal";
import Button from "components/html/Button";
import Image from "components/html/Image";

// Constants
import colors from "constants/colors";

export default function EditClubSettings(){

    // Router
    const router = useRouter()

    // Success-Box
    const [successBoxHidden, setSuccessBoxHidden] = useState(true);

    const handleOnChangeClub = () => {
        router.push({
            pathname: '/select_club',
            query: {
                fromSettings: true
            }
        })
    }

    return (
        <Div>
            <Animated
                toggleAnimation={successBoxHidden}
                h={'100%'}
            >
                <div>
                    <Div>
                        <Text text={'Favorite club'} fs={22} lh={26} fw={900} fst={'italic'} tt={'uppercase'}
                              color={colors.black_rock}
                              mb={24}/>
                        <BorderHorizontal/>
                    </Div>
                    <Div mt={24} className={'flex flex-col items-center justify-center'} style={{flexGrow: 1}}>
                        <Image src={'/images/club_ajax.png'} w={150} h={150} alt={'club_ajax'}/>
                        <Text text={'AJAX'} fs={32} lh={44} fw={800} color={colors.black_rock} fst={'italic'} tt={'uppercase'} mt={20}/>
                        <Text text={'Amsterdam'} fs={18} lh={26} color={colors.regent_grey} mb={32} mt={4}/>
                        <Div w={'100%'}>
                            <Button
                                title={'Change club'}
                                color={colors.white}
                                h={50}
                                onClick={handleOnChangeClub}
                            />
                        </Div>
                    </Div>
                </div>
            </Animated>
        </Div>
    )
}