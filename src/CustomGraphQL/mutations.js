import gql from 'graphql-tag';

export const CreateJokeLike = gql`
  mutation createJokeLike(
    $id: ID!
    $jokeId: ID!
    $userId: ID!
  ) {
    createJokeLike(
      input: {
        id: $id
        jokeId: $jokeId
        userId: $userId
      }
    ) {
      id
      jokeId
      userId
    }
  }
`;

export const DeleteJokeLike = gql`
  mutation deleteJokeLike(
    $id:ID!
    $jokeId: ID!
    ) {
    deleteJokeLike(
      input: {
      id: $id,
      jokeId: $jokeId
      }) {
      id
      jokeId
    }
  }
`;

export const CreateUserJoke = gql`
mutation createUserJoke(
  $id: ID
  $userId: ID
  $userEmail: String
  $userName: String
  $comedian: String
  $jokeText: String
  $info: String
  $file: S3ObjectInput
  ) {
  createUserJoke(
    input: {
      id: $id,
      userId: $userId
      userEmail: $userEmail
      userName: $userName
      comedian: $comedian
      jokeText: $jokeText
      info: $info
      file: $file
    }) {
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
      visibility
    }
  }
}
`;
