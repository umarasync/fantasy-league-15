// Components
import MySquadFormation442 from "./MySquadFormation442";
import MySquadFormation433 from "./MySquadFormation433";
import MySquadFormation352 from "./MySquadFormation352";
import MySquadFormation451 from "./MySquadFormation451";
import MySquadFormation343 from "./MySquadFormation343";
import MySquadFormation532 from "./MySquadFormation532";
import MySquadFormation541 from "./MySquadFormation541";

// Constants
import {formations} from "constants/universalConstants";

export default function PlayersFormation ({
    formationInfo,
    renderPlayer,
    players
}) {
    const {
        F442,F433,F352,F451,F343,F532,F541
    } = formations

        switch (formationInfo.formation) {
            case F442:
                return (<MySquadFormation442 renderPlayer={renderPlayer} players={{...players}} />)
            case F433:
                return (<MySquadFormation433 renderPlayer={renderPlayer} players={{...players}} />)
            case F352:
                return (<MySquadFormation352 renderPlayer={renderPlayer} players={{...players}} />)
            case F451:
                return (<MySquadFormation451 renderPlayer={renderPlayer} players={{...players}} />)
            case F343:
                 return (<MySquadFormation343 renderPlayer={renderPlayer} players={{...players}} />)
            case F532:
                 return (<MySquadFormation532 renderPlayer={renderPlayer} players={{...players}} />)
            case F541:
                 return (<MySquadFormation541 renderPlayer={renderPlayer} players={{...players}} />)
            default:
                return null
        }
    }