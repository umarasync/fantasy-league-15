// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";

// Constants
import colors from "constants/colors";
import BorderHorizontal from "components/borders/BorderHorizontal";

// Utils
import R from "utils/getResponsiveValue";

// Styles
const getStyles = (R) => {
    return {
        container: {
            width: '100%'
        }

    }
}
export default function MatchHighlights({
     match,
     containerRef
 }) {

    const STYLES = {...getStyles(R)}

    const {matchDetails} = match
    const { highlights } = matchDetails
    return (
        <div ref={containerRef} style={STYLES.container}>
            {/*Row*/}
            {
                highlights.map((item, index) => {
                    return (
                        <Div key={index} pt={24}>
                            <Div center>
                                <Text text={item.heading} fs={18} lh={26} mb={12} color={colors.regent_grey}/>
                            </Div>

                            <Div className={'flex'} pb={24}>
                                <Div w={'51%'}>
                                    <Div className={'flex justify-end'}>
                                        <Div className={'flex flex-col items-end'}>
                                            {
                                                item.data.team1Players.map((player, index) => (
                                                    <>
                                                        <Div className={'flex items-center'}>
                                                            <Text text={player.name} fs={18} lh={22} fw={600}
                                                                  color={colors.black_rock}/>
                                                            <Text text={`${player.value}`} fs={12} lh={16} ml={8}
                                                                  color={colors.regent_grey}/>
                                                        </Div>
                                                    </>
                                                ))
                                            }

                                        </Div>
                                        <Image src={`/images/${item.image}`} w={24} h={24} ml={60}/>
                                    </Div>
                                </Div>
                                <Div w={'49%'}>
                                    <Div pl={60}>
                                        <Div className={'flex flex-col items-start'}>
                                            {
                                                item.data.team2Players.map((player, index) => (
                                                    <>
                                                        <Div className={'flex items-center'}>
                                                            <Text text={`${player.value}`} fs={12} lh={16} mr={8}
                                                                  color={colors.regent_grey}/>
                                                            <Text text={player.name} fs={18} lh={22} fw={600}
                                                                  color={colors.black_rock}/>

                                                        </Div>
                                                    </>
                                                ))
                                            }

                                        </Div>
                                    </Div>
                                </Div>
                            </Div>

                            {index !== highlights.length - 1 && (<BorderHorizontal opacity={0.5}/>)}
                        </Div>
                    )
                })
            }
        </div>
    )
}