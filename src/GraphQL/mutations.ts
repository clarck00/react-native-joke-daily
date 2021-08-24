// tslint:disable
// this is an auto generated file. This will be overwritten

export const createJoke = `mutation CreateJoke($input: CreateJokeInput!) {
  createJoke(input: $input) {
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
export const updateJoke = `mutation UpdateJoke($input: UpdateJokeInput!) {
  updateJoke(input: $input) {
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
export const deleteJoke = `mutation DeleteJoke($input: DeleteJokeInput!) {
  deleteJoke(input: $input) {
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
export const createUserJoke = `mutation CreateUserJoke($input: CreateUserJokeInput!) {
  createUserJoke(input: $input) {
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
export const updateUserJoke = `mutation UpdateUserJoke($input: UpdateUserJokeInput!) {
  updateUserJoke(input: $input) {
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
export const deleteUserJoke = `mutation DeleteUserJoke($input: DeleteUserJokeInput!) {
  deleteUserJoke(input: $input) {
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
export const createJokeLike = `mutation CreateJokeLike($input: CreateJokeLikeInput!) {
  createJokeLike(input: $input) {
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
export const updateJokeLike = `mutation UpdateJokeLike($input: UpdateJokeLikeInput!) {
  updateJokeLike(input: $input) {
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
export const deleteJokeLike = `mutation DeleteJokeLike($input: DeleteJokeLikeInput!) {
  deleteJokeLike(input: $input) {
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
export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
export const createPost = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
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
export const updatePost = `mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input) {
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
export const deletePost = `mutation DeletePost($input: DeletePostInput!) {
  deletePost(input: $input) {
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
export const createVote = `mutation CreateVote($input: CreateVoteInput!) {
  createVote(input: $input) {
    id
    postId
    createdBy
    createdAt
    vote
  }
}
`;
export const updateVote = `mutation UpdateVote($input: UpdateVoteInput!) {
  updateVote(input: $input) {
    id
    postId
    createdBy
    createdAt
    vote
  }
}
`;
export const deleteVote = `mutation DeleteVote($input: DeleteVoteInput!) {
  deleteVote(input: $input) {
    id
    postId
    createdBy
    createdAt
    vote
  }
}
`;
