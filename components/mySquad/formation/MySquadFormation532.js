// Components
import Div from "components/html/Div";

// Utils
import R from "utils/getResponsiveValue";

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
    players,
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
                <Div style={STYLES.container1} mt={-24} pl={50} pr={50}>
                    {renderPlayer(p5())}
                    {renderPlayer(p6())}
                </Div>
                 {/*3*/}
                 <Div style={STYLES.container} mt={-30}>
                     {renderPlayer(p7())}
                     {renderPlayer(p8())}
                     {renderPlayer(p9())}
                 </Div>
                 {/*4*/}
                 <Div style={STYLES.container} mt={24}>
                     {renderPlayer(p10())}
                     {renderPlayer(p11())}
                 </Div>
                 {/*5*/}
                 <Div style={STYLES.container} mt={40}>
                     {renderPlayer(p12())}
                     {renderPlayer(p13())}
                     {renderPlayer(p14())}
                     {renderPlayer(p15())}
                 </Div>
             </div>
        )
    }