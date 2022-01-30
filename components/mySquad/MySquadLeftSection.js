// Components
import Div from 'components/html/Div'
import MySquadFilterButtons from "components/mySquad/MySquadFilterButtons";
import MatchBoard from "components/mySquad/MatchBoard";
import SelectedSquadOnPitch from 'components/mySquad/SelectedSquadOnPitch'

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        container: {
            paddingTop: R(34),
            paddingLeft: R(81.26),
            paddingRight: R(81.26),
            paddingBottom: R(136),
            minHeight: R()
        },
        logo: {
            width: R(164),
            height: R(40),
            marginLeft: R(-10)
        },
        heading: {
            fontSize: R(42),
            lineHeight: R(46, 'px'),
        },
        textContainer:{
            paddingRight: R(50),
        },
        subHeading: {
            fontSize: R(18),
            lineHeight: R(26, 'px'),
            marginTop: R(20)
        },
        fieldImage: {
            width: R(610),
            height: R(621),
            marginTop: R(44),
        }
    }
}
export default function MySquadLeftSection({
     pickedPlayers,
     onPlayerChange,
     transferInProgress,
     changeFormation,
     handleFilterButtonClick,
     onPlayerClick,
     tripleCaptainApplied,
     benchBoostApplied

}) {

    const STYLES =  { ... getStyles(R) }

    return (
        <div className="bg-[url('/images/bg_my_squad.png')] bg-[length:100%_100%] bg-no-repeat w-full h-full"
             style={STYLES.container}>
            <div className="" style={STYLES.logo}>
                <img src="/images/logo_white.png" alt="" width="100%" height="100%"/>
            </div>

            {/*<TestButtons/>*/}
            <MySquadFilterButtons handleClick={(v) => handleFilterButtonClick(v)}/>

            <div className={'flex items-center justify-center'}>
                <div style={STYLES.fieldImage}>
                    <div className="bg-[url('/images/field2.png')] bg-[length:100%_100%] bg-no-repeat h-full w-full" >
                        {
                            pickedPlayers.length ? (
                                <SelectedSquadOnPitch
                                    changeFormation={changeFormation}
                                    transferInProgress={transferInProgress}
                                    pickedPlayers={pickedPlayers}
                                    onPlayerChange={onPlayerChange}
                                    onPlayerClick={onPlayerClick}
                                    tripleCaptainApplied={tripleCaptainApplied}
                                    benchBoostApplied={benchBoostApplied}
                                />
                            ): null
                        }
                    </div>
                </div>
            </div>
            <Div mt={115}>
                <MatchBoard/>
            </Div>
        </div>
    )
}