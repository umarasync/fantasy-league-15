import {gql} from '@apollo/client'

export default gql`
  query teams {
    teams(_first: 100, _offset: 0) {
      data {
        id
        officalName
        logo
        venue
      }
    }
  }
`
