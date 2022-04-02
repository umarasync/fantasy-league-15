// Packages
import {useAnimation} from "framer-motion";
import {useEffect} from "react";

// Components
import Div from "components/html/Div";

// Utils
import R from "utils/getResponsiveValue";

// Animations
import animation from "Animations/mySquad/PlayersFormationAnimation";


// Styles
const getStyles = (R) => {
    return {
        // Styles for Without Bench Boost Applied
        topContainer: {
            paddingTop: R(22)
        },
        container: {
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'center'
        },
        container1: {
            display: 'flex',
            flexFlow: 'row',
            justifyContent: 'space-between',
        }
    }
}

export default function MySquadFormation352 ({
    renderPlayer,
    players
}) {

    const STYLES =  { ... getStyles(R) }

    const {
        p1,
        p2,
        p3,
        p4,
        p5,
        p6,
        p7,
        p8,
        p9,
        p10,
        p11,
        p12,
        p13,
        p14,
        p15
    } = players

    const controls = useAnimation()

    const getAnimationInfo = (variants) => {
        return {
            animation: {
                variants,
                controls
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            controls.start('p5Animation')
            controls.start('p6Animation')
            controls.start('p9Animation')
            controls.start('p10Animation')
            controls.start('p11Animation')
        }, 100)
    }, [])

    return (
            <div style={STYLES.topContainer}>
                 {/*1*/}
                 <Div style={STYLES.container}>
                     {renderPlayer(p1())}
                 </Div>
                 {/*2*/}
                 <Div style={STYLES.container} mt={24}>
                     {renderPlayer(p2())}
                     {renderPlayer(p3())}
                     {renderPlayer(p4())}
                 </Div>
                 {/*3*/}
                 <Div style={STYLES.container} mt={24}>
                     {renderPlayer({ ...getAnimationInfo(animation().p5()), ...p5() })}
                     {renderPlayer({ ...getAnimationInfo(animation().p6()), ...p6() })}
                     {renderPlayer({ ...getAnimationInfo(animation().p7()), ...p7() })}
                     {renderPlayer({ ...getAnimationInfo(animation().p8()), ...p8() })}
                 </Div>
                 {/*4*/}
                 <Div style={STYLES.container} mt={24}>
                     {renderPlayer({ ...getAnimationInfo(animation().p10()), ...p10() })}
                     {renderPlayer({ ...getAnimationInfo(animation().p11()), ...p11() })}
                     {renderPlayer({ ...getAnimationInfo(animation().p9()), ...p9() })}
                 </Div>
                 {/*5*/}
                 <Div style={STYLES.container} mt={50}>
                     {renderPlayer(p12())}
                     {renderPlayer(p13())}
                     {renderPlayer(p14())}
                     {renderPlayer(p15())}
                 </Div>
             </div>
        )
    }