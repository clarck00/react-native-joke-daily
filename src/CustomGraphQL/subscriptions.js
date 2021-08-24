import gql from "graphql-tag";

export const OnCreateJokeLike = gql`subscription onCreateJokeLike {
  onCreateJokeLike {
    id
    jokeId
    userId
  }
}
`;

export const JokeSubscription = gql`
subscription jokeSubscription {
  onCreateJokeLike {
    id
    jokeId
    userId
  }
}
`;

export const OnDeleteJokeLike = gql`subscription {
  onDeleteJokeLike {
    id
  }
}
`;

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
      key
      region
    }
    owner
    visibility
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
      key
      region
    }
    owner
    visibility
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
      key
      region
    }
    owner
    visibility
    createdAt
    likes {
      nextToken
    }
    queryName
    numLikes
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
      createdAt
      queryName
      numLikes
    }
    userIdItemId
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
      key
      region
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
      key
      region
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
      key
      region
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
