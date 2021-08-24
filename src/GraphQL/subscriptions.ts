// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateJoke = `subscription OnCreateJoke {
  onCreateJoke {
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
export const onUpdateJoke = `subscription OnUpdateJoke {
  onUpdateJoke {
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
export const onDeleteJoke = `subscription OnDeleteJoke {
  onDeleteJoke {
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
export const onCreateUserJoke = `subscription OnCreateUserJoke {
  onCreateUserJoke {
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
export const onUpdateUserJoke = `subscription OnUpdateUserJoke {
  onUpdateUserJoke {
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
export const onDeleteUserJoke = `subscription OnDeleteUserJoke {
  onDeleteUserJoke {
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
export const onCreateJokeLike = `subscription OnCreateJokeLike {
  onCreateJokeLike {
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
export const onUpdateJokeLike = `subscription OnUpdateJokeLike {
  onUpdateJokeLike {
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
export const onDeleteJokeLike = `subscription OnDeleteJokeLike {
  onDeleteJokeLike {
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
export const onCreateUser = `subscription OnCreateUser($id: String!) {
  onCreateUser(id: $id) {
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
export const onUpdateUser = `subscription OnUpdateUser($id: String!) {
  onUpdateUser(id: $id) {
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
export const onDeleteUser = `subscription OnDeleteUser($id: String!) {
  onDeleteUser(id: $id) {
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
export const onCreatePost = `subscription OnCreatePost($owner: String!) {
  onCreatePost(owner: $owner) {
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
export const onUpdatePost = `subscription OnUpdatePost($owner: String!) {
  onUpdatePost(owner: $owner) {
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
export const onDeletePost = `subscription OnDeletePost($owner: String!) {
  onDeletePost(owner: $owner) {
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
export const onCreateVote = `subscription OnCreateVote {
  onCreateVote {
    id
    postId
    createdBy
    createdAt
    vote
  }
}
`;
export const onUpdateVote = `subscription OnUpdateVote {
  onUpdateVote {
    id
    postId
    createdBy
    createdAt
    vote
  }
}
`;
export const onDeleteVote = `subscription OnDeleteVote {
  onDeleteVote {
    id
    postId
    createdBy
    createdAt
    vote
  }
}
`;
