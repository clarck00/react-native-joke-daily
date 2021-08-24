// tslint:disable
// this is an auto generated file. This will be overwritten

export const getJoke = `query GetJoke($id: ID!) {
  getJoke(id: $id) {
    id
    comedian
    jokeSetup
    jokePunchline
    date
    info
    file {
      bucket
      region
      key
      localUri
      visibility
      mimeType
    }
    owner
    visibility
    searchField
    createdAt
    likes {
      nextToken
    }
    queryName
    numLikes
  }
}
`;
export const listJokes = `query ListJokes(
  $filter: ModelJokeFilterInput
  $limit: Int
  $nextToken: String
) {
  listJokes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      comedian
      jokeSetup
      jokePunchline
      date
      info
      owner
      visibility
      searchField
      createdAt
      queryName
      numLikes
    }
    nextToken
  }
}
`;
export const getUserJoke = `query GetUserJoke($id: ID!) {
  getUserJoke(id: $id) {
    id
    userId
    userName
    userEmail
    comedian
    jokeText
    info
    file {
      bucket
      region
      key
      localUri
      visibility
      mimeType
    }
    createdAt
  }
}
`;
export const listUserJokes = `query ListUserJokes(
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
      jokeText
      info
      createdAt
    }
    nextToken
  }
}
`;
export const getJokeLike = `query GetJokeLike($id: ID!) {
  getJokeLike(id: $id) {
    id
    jokeId
    joke {
      id
      comedian
      jokeSetup
      jokePunchline
      date
      info
      owner
      visibility
      searchField
      createdAt
      queryName
      numLikes
    }
    userId
    createdAt
  }
}
`;
export const listJokeLikes = `query ListJokeLikes(
  $filter: ModelJokeLikeFilterInput
  $limit: Int
  $nextToken: String
) {
  listJokeLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      jokeId
      userId
      createdAt
    }
    nextToken
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    premium
    posts {
      nextToken
    }
    createdAt
    updatedAt
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      premium
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getPost = `query GetPost($id: ID!) {
  getPost(id: $id) {
    id
    postTitle
    postContent
    postImage {
      bucket
      region
      key
      localUri
      visibility
      mimeType
    }
    votes
    owner
  }
}
`;
export const listPosts = `query ListPosts(
  $filter: ModelPostFilterInput
  $limit: Int
  $nextToken: String
) {
  listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      postTitle
      postContent
      votes
      owner
    }
    nextToken
  }
}
`;
export const getVote = `query GetVote($id: ID!) {
  getVote(id: $id) {
    id
    postId
    createdBy
    createdAt
    vote
  }
}
`;
export const listVotes = `query ListVotes(
  $filter: ModelVoteFilterInput
  $limit: Int
  $nextToken: String
) {
  listVotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      postId
      createdBy
      createdAt
      vote
    }
    nextToken
  }
}
`;
export const jokesByDate = `query JokesByDate(
  $queryName: String
  $date: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelJokeFilterInput
  $limit: Int
  $nextToken: String
) {
  jokesByDate(
    queryName: $queryName
    date: $date
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      comedian
      jokeSetup
      jokePunchline
      date
      info
      owner
      visibility
      searchField
      createdAt
      queryName
      numLikes
    }
    nextToken
  }
}
`;
export const votesByUser = `query VotesByUser(
  $createdBy: ID
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelVoteFilterInput
  $limit: Int
  $nextToken: String
) {
  votesByUser(
    createdBy: $createdBy
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      postId
      createdBy
      createdAt
      vote
    }
    nextToken
  }
}
`;
