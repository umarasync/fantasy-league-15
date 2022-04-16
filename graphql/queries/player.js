import {gql} from "@apollo/client";

export default gql`
    query PlayerById($id: String!) {
      playerById(id: $id) {
        id
        name
        firstName
        lastName
        photo
        value
        totalPoints
        isSubstitute
        captain
        viceCaptain
        position
        matchName
        team {
          name
          logo
        }
        seasonStats {
          assistPoints
          bonus
          currWeekPoints
          goalAssist
          goals
          history {
            opp {
              location
              score1
              score2
              team
              teamLogo
            } 
            as
            cs
            gc
            gs
            gw
            mp
            og
            pm
            ps
            pts
          }
          minsPlayed
          playingTimePoints
          prevWeekPoints
          scoringPoints
          totalPoints
        }  
      }
    }
`