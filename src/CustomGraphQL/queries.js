import gql from 'graphql-tag';

export const AllJokesByDate = gql`
  query jokesByDate(
    $queryName: String = "Joke"
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection = DESC
    $limit: Int = 200
    $nextToken: String
    $user: ID
  ) {
    jokesByDate(
      queryName: $queryName
      date: $date
      nextToken: $nextToken
      sortDirection: $sortDirection
      limit: $limit
    ) {
      items {
        id
        comedian
        jokeSetup
        jokePunchline
        date
        file {
          bucket
          key
          region
        }
        searchField
        info
        totalLikes: likes {
          items {
            id
          }
        }
        userLike: likes(filter: {userId: {eq: $user}}) {
          items {
            id
            jokeId
            userId
          }
        }
      }
      nextToken
    }
  }
`;

export const SearchJokes = gql`
  query searchJokes(
    $queryName: String = "Joke"
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection = DESC
    $limit: Int = 200
    $user: ID
    $nextToken: String
    $searchQuery: String
  ) {
    jokesByDate(
      filter: {searchField: {contains: $searchQuery}}
      queryName: $queryName
      limit: $limit
      date: $date
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        comedian
        jokeSetup
        jokePunchline
        date
        file {
          bucket
          key
          region
        }
        searchField
        info
        totalLikes: likes {
          items {
            id
          }
        }
        userLike: likes(filter: {userId: {eq: $user}}) {
          items {
            id
            jokeId
            userId
          }
        }
      }
      nextToken
    }
  }
`;

export const ListUserJokes = gql`
  query listUserJokes(
    $filter: ModelUserJokeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserJokes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        userName
        userEmail
        comedian
        file {
          bucket
          region
          key
          visibility
        }
        jokeText
        info
      }
      nextToken
    }
  }
`;

export const GetJokes = gql`
  query getJokes($limit: Int, $date: String, $user: ID, $jokeId: ID) {
    listJokes(filter: {date: {le: $date}, id: {eq: $jokeId}}, limit: $limit) {
      items {
        id
        comedian
        jokeSetup
        jokePunchline
        date
        file {
          bucket
          key
          region
        }
        searchField
        info
        totalLikes: likes(limit: 200) {
          items {
            id
          }
        }
        userLike: likes(filter: {userId: {eq: $user}}) {
          items {
            id
            userId
            jokeId
          }
        }
      }
    }
  }
`;

export const ListJokes = gql`
  query listJokes(
    $limit: Int = 200
    $date: String
    $user: ID
    $jokeId: ModelIDFilterInput
  ) {
    listJokes(filter: {date: {le: $date}, id: $jokeId}, limit: $limit) {
      items {
        id
        comedian
        jokeSetup
        jokePunchline
        date
        file {
          bucket
          key
          region
        }
        searchField
        info
        totalLikes: likes(limit: 200) {
          items {
            id
          }
        }
        userLike: likes(filter: {userId: {eq: $user}}) {
          items {
            id
            userId
            jokeId
          }
        }
      }
    }
  }
`;

export const ListJokeLikes = gql`
  query listJokeLikes {
    listJokeLikes {
      items {
        id
        jokeId
        userId
      }
    }
  }
`;