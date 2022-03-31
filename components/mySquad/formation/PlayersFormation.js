// Components
import MySquadFormation442 from "./MySquadFormation442";
import MySquadFormation433 from "./MySquadFormation433";

export default function PlayersFormation ({
        playersFormation,
        renderPlayer,
        players
    }) {
        switch (playersFormation) {
            case '442':
                return (<MySquadFormation442 renderPlayer={renderPlayer} players={{...players}} />)
            case '433':
                return (<MySquadFormation433 renderPlayer={renderPlayer} players={{...players}} />)
            default:
                return null
        }
    }