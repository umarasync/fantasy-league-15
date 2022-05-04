import { gql } from "@apollo/client";

export default gql`
  query FantasyTeamById($gameweek: Int!, $fantasyTeamId: String!) {
    fantasyTeamById(gameweek: $gameweek, id: $fantasyTeamId) {
      id
      overallPoints
      name
      gameweekPoints
      boosters {
        type
        id
        gameweek
        createdAt
      }
      squad {
        id
        name
        matchName
        position
        photo
        value
        totalPoints
        captain
        state
        viceCaptain
        isSubstitute
        team {
          id
          name
          logo
        }
      }
    }
  }
`;
