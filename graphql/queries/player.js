import {gql} from "@apollo/client";

export default gql`
    query PlayerById($id: String!) {
      playerById(id: $id) {
        id
        name
        matchName
        position
        photo
        score
        value
        captain
        viceCaptain
        isSubstitute
        totalPoints
        currGWPoints {
          totalPoints
          assistPoints
          yellowCardPoints
          redCardPoints
          savesPoints
          penaltySavePoints
          missedPenaltyPoints
          ownGoalPoints
          playingTimePoints
          scoringPoints
          cleanSheetPoints
          goalsConcededPoints
          normal
          bonus
        }
        history{
          points {
                  goals
                  goalsConceded
                  goalAssist
                  cleanSheetPoints
                  cleanSheet
                  bonus
                  assistPoints
                  goalsConcededPoints
                  minsPlayed
                  missedPenaltyPoints
                  normal
                  ownGoalPoints
                  ownGoals
                  penaltySavePoints
                  playingTimePoints
                  redCard
                  redCardPoints
                  savesPoints
                  scoringPoints
                  totalPoints
                  yellowCard
                  yellowCardPoints
                }
        }
        team {
          id
          name
          logo
          homeKit
          goalkeeperKit
        }
      }
    }
`