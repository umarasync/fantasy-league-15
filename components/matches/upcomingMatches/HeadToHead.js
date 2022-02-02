// Components
import Div from "components/html/Div";
import Text from "components/html/Text";
import Image from "components/html/Image";

// Constants
import colors from "constants/colors";

// Utils
import MatchProgressBar from "components/matches/MatchProgressBar";

export default function HeadToHead({
     match,
     containerRef
 }) {

    const {matchDetails} = match

    const { headToHead } = matchDetails
    const {team1, team2, totalMatchPlayed, draws} = headToHead

    return (
        <div ref={containerRef}>
            <Div className={'flex'} pt={24} pb={35}>
                <Div w={'57.5%'} className={'flex justify-end'}>
                    <Div className={'flex flex-col'}>
                       <Div className={'flex items-center justify-end'} mb={28}>
                            <Text text={team1.label} fs={18} lh={22} fw={600} color={colors.black_rock} mr={12}/>
                            <Image src={`/images/${team1.image}`} alt={'team_logo'} w={40} h={40}/>
                       </Div>

                        <MatchProgressBar
                            title = 'Total Wins'
                            value={team1.totalWins}
                            total={totalMatchPlayed}
                            rightAlign
                        />
                        <MatchProgressBar
                            title='Home'
                            value={team1.home}
                            total={totalMatchPlayed}
                            rightAlign
                        />
                        <MatchProgressBar
                            title='Away'
                            value={team1.away}
                            total={totalMatchPlayed}
                            rightAlign
                            mb={0}
                        />
                    </Div>
                    <Div w={200} className={'flex flex-col items-center justify-center'}>
                        <Text text={'Played'} fs={18} lh={26} fw={600} color={colors.regent_grey} mb={2}/>
                        <Text text={totalMatchPlayed} fs={70} lh={80} fw={600} mb={6} className={'text-froly-cerise_red'}/>
                        <Div>
                            <Text text={'Draws'} fs={16} lh={20} color={colors.regent_grey} inline mr={6}/>
                            <Text text={draws} fs={18} lh={26} fw={600} color={colors.black_rock} inline/>
                        </Div>
                    </Div>
                </Div>
                <Div w={'42.5%'}>
                    <Div className={'flex flex-col'}>
                        <Div className={'flex items-center'} mb={28}>
                            <Image src={`/images/${team2.image}`} alt={'team_logo'} w={40} h={40}/>
                            <Text text={team2.label} fs={18} lh={22} fw={600} color={colors.black_rock} ml={12}/>
                        </Div>
                        <MatchProgressBar
                            title='Total Wins'
                            value={team2.totalWins}
                            total={totalMatchPlayed}
                        />
                        <MatchProgressBar
                            title='Home'
                            value={team2.home}
                            total={totalMatchPlayed}
                        />
                        <MatchProgressBar
                            title='Away'
                            value={team2.away}
                            total={totalMatchPlayed}
                            mb={0}
                        />
                    </Div>
                </Div>
            </Div>
        </div>
    )
}