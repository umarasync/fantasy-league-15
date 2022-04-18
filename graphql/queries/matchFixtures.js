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
            home {
              goals
              team {
                id
                name
                logo
              }
            }
            away {
              goals
              team {
                id
                name
                logo
              }
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
            away {
              away
              home
              totalWins
              team {
                id
                logo
                name
              }
            }
  
            totalMatchPlayed
            home {
              away
              home
              totalWins
              team {
                logo
              id
                name
              }
            }
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
