import {gql} from '@apollo/client'

export default gql`
  query MatchFixtures($gameweek: Int!) {
    matchFixtures(gameweek: $gameweek) {
      date
      matches {
        id
        finished
        gameWeek
  
        matchTime
  
        details {
          statistics {
            title
            away
            home
            type
          }
          lastMatchUps {
            date
            awayTeam {
              checked
              goals
              id
              logo
              name
            }
            homeTeam {
              checked
              goals
              id
              logo
              name
            }
          }
          awardedPlayers {
            award
            player {
              id
              name
              matchName
              photo
              totalPoints
              viceCaptain
              team {
                logo
                name
              }
            }
            points
          }
          headToHead {
            draws
            homeTeam {
              id
              name
              logo
              totalWins
              checked
              away
              home
            }
            awayTeam {
              away
              checked
              home
              id
              logo
              name
              totalWins
            }
            totalMatchPlayed
          }
          highlights {
            away {
              name
              value
            }
            home {
              name
              value
            }
            image
            title
            type
          }
        }
        home {
          goals
          fantasyPlayers {
            id
            name
          }
          team {
            id
            name
            logo
          }
        }
        away {
          fantasyPlayers {
            id
            name
            photo
            value
            captain
            viceCaptain
            matchName
            team {
              id
              logo
              name
            }
          }
          goals
          team {
            id
            logo
            name
          }
        }
      }
    }
  }
`
