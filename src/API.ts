/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateJokeInput = {
	id?: string | null;
	comedian?: string | null;
	jokeSetup?: string | null;
	jokePunchline?: string | null;
	date?: string | null;
	info?: string | null;
	file?: S3ObjectInput | null;
	owner?: string | null;
	visibility?: Visibility | null;
	searchField?: string | null;
	createdAt?: string | null;
	queryName?: string | null;
	numLikes?: number | null;
};

export type S3ObjectInput = {
	bucket: string;
	region: string;
	key: string;
	localUri?: string | null;
	visibility?: Visibility | null;
	mimeType?: string | null;
};

export enum Visibility {
	public = 'public',
	private = 'private'
}

export type UpdateJokeInput = {
	id: string;
	comedian?: string | null;
	jokeSetup?: string | null;
	jokePunchline?: string | null;
	date?: string | null;
	info?: string | null;
	file?: S3ObjectInput | null;
	owner?: string | null;
	visibility?: Visibility | null;
	searchField?: string | null;
	createdAt?: string | null;
	queryName?: string | null;
	numLikes?: number | null;
};

export type DeleteJokeInput = {
	id?: string | null;
};

export type CreateUserJokeInput = {
	id?: string | null;
	userId?: string | null;
	userName?: string | null;
	userEmail?: string | null;
	comedian?: string | null;
	jokeText?: string | null;
	info?: string | null;
	file?: S3ObjectInput | null;
	createdAt?: string | null;
};

export type UpdateUserJokeInput = {
	id: string;
	userId?: string | null;
	userName?: string | null;
	userEmail?: string | null;
	comedian?: string | null;
	jokeText?: string | null;
	info?: string | null;
	file?: S3ObjectInput | null;
	createdAt?: string | null;
};

export type DeleteUserJokeInput = {
	id?: string | null;
};

export type CreateJokeLikeInput = {
	id?: string | null;
	jokeId?: string | null;
	userId?: string | null;
	createdAt?: string | null;
};

export type UpdateJokeLikeInput = {
	id: string;
	jokeId?: string | null;
	userId?: string | null;
	createdAt?: string | null;
};

export type DeleteJokeLikeInput = {
	id?: string | null;
	jokeId?: string | null;
};

export type CreateUserInput = {
	id?: string | null;
	username: string;
	premium?: Premium | null;
	createdAt?: string | null;
	updatedAt?: string | null;
};

export enum Premium {
	premium = 'premium',
	standard = 'standard'
}

export type UpdateUserInput = {
	id: string;
	username?: string | null;
	premium?: Premium | null;
	createdAt?: string | null;
	updatedAt?: string | null;
};

export type DeleteUserInput = {
	id?: string | null;
};

export type CreatePostInput = {
	id?: string | null;
	postTitle?: string | null;
	postContent?: string | null;
	postImage?: S3ObjectInput | null;
	votes?: number | null;
	userPostsId?: string | null;
};

export type UpdatePostInput = {
	id: string;
	postTitle?: string | null;
	postContent?: string | null;
	postImage?: S3ObjectInput | null;
	votes?: number | null;
	userPostsId?: string | null;
};

export type DeletePostInput = {
	id?: string | null;
};

export type CreateVoteInput = {
	id?: string | null;
	postId: string;
	createdBy: string;
	createdAt: string;
	vote?: VoteType | null;
};

export enum VoteType {
	up = 'up',
	down = 'down'
}

export type UpdateVoteInput = {
	id: string;
	postId?: string | null;
	createdBy?: string | null;
	createdAt?: string | null;
	vote?: VoteType | null;
};

export type DeleteVoteInput = {
	id?: string | null;
};

export type ModelJokeFilterInput = {
	id?: ModelIDFilterInput | null;
	comedian?: ModelStringFilterInput | null;
	jokeSetup?: ModelStringFilterInput | null;
	jokePunchline?: ModelStringFilterInput | null;
	date?: ModelStringFilterInput | null;
	info?: ModelStringFilterInput | null;
	owner?: ModelStringFilterInput | null;
	visibility?: ModelVisibilityFilterInput | null;
	searchField?: ModelStringFilterInput | null;
	createdAt?: ModelStringFilterInput | null;
	queryName?: ModelStringFilterInput | null;
	numLikes?: ModelIntFilterInput | null;
	and?: Array<ModelJokeFilterInput | null> | null;
	or?: Array<ModelJokeFilterInput | null> | null;
	not?: ModelJokeFilterInput | null;
};

export type ModelIDFilterInput = {
	ne?: string | null;
	eq?: string | null;
	le?: string | null;
	lt?: string | null;
	ge?: string | null;
	gt?: string | null;
	contains?: string | null;
	notContains?: string | null;
	between?: Array<string | null> | null;
	beginsWith?: string | null;
};

export type ModelStringFilterInput = {
	ne?: string | null;
	eq?: string | null;
	le?: string | null;
	lt?: string | null;
	ge?: string | null;
	gt?: string | null;
	contains?: string | null;
	notContains?: string | null;
	between?: Array<string | null> | null;
	beginsWith?: string | null;
};

export type ModelVisibilityFilterInput = {
	eq?: Visibility | null;
	ne?: Visibility | null;
};

export type ModelIntFilterInput = {
	ne?: number | null;
	eq?: number | null;
	le?: number | null;
	lt?: number | null;
	ge?: number | null;
	gt?: number | null;
	contains?: number | null;
	notContains?: number | null;
	between?: Array<number | null> | null;
};

export type ModelUserJokeFilterInput = {
	id?: ModelIDFilterInput | null;
	userId?: ModelIDFilterInput | null;
	userName?: ModelStringFilterInput | null;
	userEmail?: ModelStringFilterInput | null;
	comedian?: ModelStringFilterInput | null;
	jokeText?: ModelStringFilterInput | null;
	info?: ModelStringFilterInput | null;
	createdAt?: ModelStringFilterInput | null;
	and?: Array<ModelUserJokeFilterInput | null> | null;
	or?: Array<ModelUserJokeFilterInput | null> | null;
	not?: ModelUserJokeFilterInput | null;
};

export type ModelJokeLikeFilterInput = {
	id?: ModelIDFilterInput | null;
	jokeId?: ModelIDFilterInput | null;
	userId?: ModelIDFilterInput | null;
	createdAt?: ModelStringFilterInput | null;
	and?: Array<ModelJokeLikeFilterInput | null> | null;
	or?: Array<ModelJokeLikeFilterInput | null> | null;
	not?: ModelJokeLikeFilterInput | null;
};

export type ModelUserFilterInput = {
	id?: ModelIDFilterInput | null;
	username?: ModelStringFilterInput | null;
	premium?: ModelPremiumFilterInput | null;
	createdAt?: ModelStringFilterInput | null;
	updatedAt?: ModelStringFilterInput | null;
	and?: Array<ModelUserFilterInput | null> | null;
	or?: Array<ModelUserFilterInput | null> | null;
	not?: ModelUserFilterInput | null;
};

export type ModelPremiumFilterInput = {
	eq?: Premium | null;
	ne?: Premium | null;
};

export type ModelPostFilterInput = {
	id?: ModelIDFilterInput | null;
	postTitle?: ModelStringFilterInput | null;
	postContent?: ModelStringFilterInput | null;
	votes?: ModelIntFilterInput | null;
	and?: Array<ModelPostFilterInput | null> | null;
	or?: Array<ModelPostFilterInput | null> | null;
	not?: ModelPostFilterInput | null;
};

export type ModelVoteFilterInput = {
	id?: ModelIDFilterInput | null;
	postId?: ModelIDFilterInput | null;
	createdBy?: ModelIDFilterInput | null;
	createdAt?: ModelStringFilterInput | null;
	vote?: ModelVoteTypeFilterInput | null;
	and?: Array<ModelVoteFilterInput | null> | null;
	or?: Array<ModelVoteFilterInput | null> | null;
	not?: ModelVoteFilterInput | null;
};

export type ModelVoteTypeFilterInput = {
	eq?: VoteType | null;
	ne?: VoteType | null;
};

export type ModelStringKeyConditionInput = {
	eq?: string | null;
	le?: string | null;
	lt?: string | null;
	ge?: string | null;
	gt?: string | null;
	between?: Array<string | null> | null;
	beginsWith?: string | null;
};

export enum ModelSortDirection {
	ASC = 'ASC',
	DESC = 'DESC'
}

export type CreateJokeMutationVariables = {
	input: CreateJokeInput;
};

export type CreateJokeMutation = {
	createJoke: {
		__typename: 'Joke';
		id: string;
		comedian: string | null;
		jokeSetup: string | null;
		jokePunchline: string | null;
		date: string | null;
		info: string | null;
		file: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		owner: string | null;
		visibility: Visibility | null;
		searchField: string | null;
		createdAt: string | null;
		likes: {
			__typename: 'ModelJokeLikeConnection';
			nextToken: string | null;
		} | null;
		queryName: string | null;
		numLikes: number | null;
	} | null;
};

export type UpdateJokeMutationVariables = {
	input: UpdateJokeInput;
};

export type UpdateJokeMutation = {
	updateJoke: {
		__typename: 'Joke';
		id: string;
		comedian: string | null;
		jokeSetup: string | null;
		jokePunchline: string | null;
		date: string | null;
		info: string | null;
		file: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		owner: string | null;
		visibility: Visibility | null;
		searchField: string | null;
		createdAt: string | null;
		likes: {
			__typename: 'ModelJokeLikeConnection';
			nextToken: string | null;
		} | null;
		queryName: string | null;
		numLikes: number | null;
	} | null;
};

export type DeleteJokeMutationVariables = {
	input: DeleteJokeInput;
};

export type DeleteJokeMutation = {
	deleteJoke: {
		__typename: 'Joke';
		id: string;
		comedian: string | null;
		jokeSetup: string | null;
		jokePunchline: string | null;
		date: string | null;
		info: string | null;
		file: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		owner: string | null;
		visibility: Visibility | null;
		searchField: string | null;
		createdAt: string | null;
		likes: {
			__typename: 'ModelJokeLikeConnection';
			nextToken: string | null;
		} | null;
		queryName: string | null;
		numLikes: number | null;
	} | null;
};

export type CreateUserJokeMutationVariables = {
	input: CreateUserJokeInput;
};

export type CreateUserJokeMutation = {
	createUserJoke: {
		__typename: 'UserJoke';
		id: string;
		userId: string | null;
		userName: string | null;
		userEmail: string | null;
		comedian: string | null;
		jokeText: string | null;
		info: string | null;
		file: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		createdAt: string | null;
	} | null;
};

export type UpdateUserJokeMutationVariables = {
	input: UpdateUserJokeInput;
};

export type UpdateUserJokeMutation = {
	updateUserJoke: {
		__typename: 'UserJoke';
		id: string;
		userId: string | null;
		userName: string | null;
		userEmail: string | null;
		comedian: string | null;
		jokeText: string | null;
		info: string | null;
		file: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		createdAt: string | null;
	} | null;
};

export type DeleteUserJokeMutationVariables = {
	input: DeleteUserJokeInput;
};

export type DeleteUserJokeMutation = {
	deleteUserJoke: {
		__typename: 'UserJoke';
		id: string;
		userId: string | null;
		userName: string | null;
		userEmail: string | null;
		comedian: string | null;
		jokeText: string | null;
		info: string | null;
		file: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		createdAt: string | null;
	} | null;
};

export type CreateJokeLikeMutationVariables = {
	input: CreateJokeLikeInput;
};

export type CreateJokeLikeMutation = {
	createJokeLike: {
		__typename: 'JokeLike';
		id: string;
		jokeId: string | null;
		joke: {
			__typename: 'Joke';
			id: string;
			comedian: string | null;
			jokeSetup: string | null;
			jokePunchline: string | null;
			date: string | null;
			info: string | null;
			owner: string | null;
			visibility: Visibility | null;
			searchField: string | null;
			createdAt: string | null;
			queryName: string | null;
			numLikes: number | null;
		} | null;
		userId: string | null;
		createdAt: string | null;
	} | null;
};

export type UpdateJokeLikeMutationVariables = {
	input: UpdateJokeLikeInput;
};

export type UpdateJokeLikeMutation = {
	updateJokeLike: {
		__typename: 'JokeLike';
		id: string;
		jokeId: string | null;
		joke: {
			__typename: 'Joke';
			id: string;
			comedian: string | null;
			jokeSetup: string | null;
			jokePunchline: string | null;
			date: string | null;
			info: string | null;
			owner: string | null;
			visibility: Visibility | null;
			searchField: string | null;
			createdAt: string | null;
			queryName: string | null;
			numLikes: number | null;
		} | null;
		userId: string | null;
		createdAt: string | null;
	} | null;
};

export type DeleteJokeLikeMutationVariables = {
	input: DeleteJokeLikeInput;
};

export type DeleteJokeLikeMutation = {
	deleteJokeLike: {
		__typename: 'JokeLike';
		id: string;
		jokeId: string | null;
		joke: {
			__typename: 'Joke';
			id: string;
			comedian: string | null;
			jokeSetup: string | null;
			jokePunchline: string | null;
			date: string | null;
			info: string | null;
			owner: string | null;
			visibility: Visibility | null;
			searchField: string | null;
			createdAt: string | null;
			queryName: string | null;
			numLikes: number | null;
		} | null;
		userId: string | null;
		createdAt: string | null;
	} | null;
};

export type CreateUserMutationVariables = {
	input: CreateUserInput;
};

export type CreateUserMutation = {
	createUser: {
		__typename: 'User';
		id: string;
		username: string;
		premium: Premium | null;
		posts: {
			__typename: 'ModelPostConnection';
			nextToken: string | null;
		} | null;
		createdAt: string | null;
		updatedAt: string | null;
	} | null;
};

export type UpdateUserMutationVariables = {
	input: UpdateUserInput;
};

export type UpdateUserMutation = {
	updateUser: {
		__typename: 'User';
		id: string;
		username: string;
		premium: Premium | null;
		posts: {
			__typename: 'ModelPostConnection';
			nextToken: string | null;
		} | null;
		createdAt: string | null;
		updatedAt: string | null;
	} | null;
};

export type DeleteUserMutationVariables = {
	input: DeleteUserInput;
};

export type DeleteUserMutation = {
	deleteUser: {
		__typename: 'User';
		id: string;
		username: string;
		premium: Premium | null;
		posts: {
			__typename: 'ModelPostConnection';
			nextToken: string | null;
		} | null;
		createdAt: string | null;
		updatedAt: string | null;
	} | null;
};

export type CreatePostMutationVariables = {
	input: CreatePostInput;
};

export type CreatePostMutation = {
	createPost: {
		__typename: 'Post';
		id: string;
		postTitle: string | null;
		postContent: string | null;
		postImage: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		votes: number | null;
		owner: string | null;
	} | null;
};

export type UpdatePostMutationVariables = {
	input: UpdatePostInput;
};

export type UpdatePostMutation = {
	updatePost: {
		__typename: 'Post';
		id: string;
		postTitle: string | null;
		postContent: string | null;
		postImage: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		votes: number | null;
		owner: string | null;
	} | null;
};

export type DeletePostMutationVariables = {
	input: DeletePostInput;
};

export type DeletePostMutation = {
	deletePost: {
		__typename: 'Post';
		id: string;
		postTitle: string | null;
		postContent: string | null;
		postImage: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		votes: number | null;
		owner: string | null;
	} | null;
};

export type CreateVoteMutationVariables = {
	input: CreateVoteInput;
};

export type CreateVoteMutation = {
	createVote: {
		__typename: 'Vote';
		id: string;
		postId: string;
		createdBy: string;
		createdAt: string;
		vote: VoteType | null;
	} | null;
};

export type UpdateVoteMutationVariables = {
	input: UpdateVoteInput;
};

export type UpdateVoteMutation = {
	updateVote: {
		__typename: 'Vote';
		id: string;
		postId: string;
		createdBy: string;
		createdAt: string;
		vote: VoteType | null;
	} | null;
};

export type DeleteVoteMutationVariables = {
	input: DeleteVoteInput;
};

export type DeleteVoteMutation = {
	deleteVote: {
		__typename: 'Vote';
		id: string;
		postId: string;
		createdBy: string;
		createdAt: string;
		vote: VoteType | null;
	} | null;
};

export type GetJokeQueryVariables = {
	id: string;
};

export type GetJokeQuery = {
	getJoke: {
		__typename: 'Joke';
		id: string;
		comedian: string | null;
		jokeSetup: string | null;
		jokePunchline: string | null;
		date: string | null;
		info: string | null;
		file: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		owner: string | null;
		visibility: Visibility | null;
		searchField: string | null;
		createdAt: string | null;
		likes: {
			__typename: 'ModelJokeLikeConnection';
			nextToken: string | null;
		} | null;
		queryName: string | null;
		numLikes: number | null;
	} | null;
};

export type ListJokesQueryVariables = {
	filter?: ModelJokeFilterInput | null;
	limit?: number | null;
	nextToken?: string | null;
};

export type ListJokesQuery = {
	listJokes: {
		__typename: 'ModelJokeConnection';
		items: Array<{
			__typename: 'Joke';
			id: string;
			comedian: string | null;
			jokeSetup: string | null;
			jokePunchline: string | null;
			date: string | null;
			info: string | null;
			owner: string | null;
			visibility: Visibility | null;
			searchField: string | null;
			createdAt: string | null;
			queryName: string | null;
			numLikes: number | null;
		} | null> | null;
		nextToken: string | null;
	} | null;
};

export type GetUserJokeQueryVariables = {
	id: string;
};

export type GetUserJokeQuery = {
	getUserJoke: {
		__typename: 'UserJoke';
		id: string;
		userId: string | null;
		userName: string | null;
		userEmail: string | null;
		comedian: string | null;
		jokeText: string | null;
		info: string | null;
		file: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		createdAt: string | null;
	} | null;
};

export type ListUserJokesQueryVariables = {
	filter?: ModelUserJokeFilterInput | null;
	limit?: number | null;
	nextToken?: string | null;
};

export type ListUserJokesQuery = {
	listUserJokes: {
		__typename: 'ModelUserJokeConnection';
		items: Array<{
			__typename: 'UserJoke';
			id: string;
			userId: string | null;
			userName: string | null;
			userEmail: string | null;
			comedian: string | null;
			jokeText: string | null;
			info: string | null;
			createdAt: string | null;
		} | null> | null;
		nextToken: string | null;
	} | null;
};

export type GetJokeLikeQueryVariables = {
	id: string;
};

export type GetJokeLikeQuery = {
	getJokeLike: {
		__typename: 'JokeLike';
		id: string;
		jokeId: string | null;
		joke: {
			__typename: 'Joke';
			id: string;
			comedian: string | null;
			jokeSetup: string | null;
			jokePunchline: string | null;
			date: string | null;
			info: string | null;
			owner: string | null;
			visibility: Visibility | null;
			searchField: string | null;
			createdAt: string | null;
			queryName: string | null;
			numLikes: number | null;
		} | null;
		userId: string | null;
		createdAt: string | null;
	} | null;
};

export type ListJokeLikesQueryVariables = {
	filter?: ModelJokeLikeFilterInput | null;
	limit?: number | null;
	nextToken?: string | null;
};

export type ListJokeLikesQuery = {
	listJokeLikes: {
		__typename: 'ModelJokeLikeConnection';
		items: Array<{
			__typename: 'JokeLike';
			id: string;
			jokeId: string | null;
			userId: string | null;
			createdAt: string | null;
		} | null> | null;
		nextToken: string | null;
	} | null;
};

export type GetUserQueryVariables = {
	id: string;
};

export type GetUserQuery = {
	getUser: {
		__typename: 'User';
		id: string;
		username: string;
		premium: Premium | null;
		posts: {
			__typename: 'ModelPostConnection';
			nextToken: string | null;
		} | null;
		createdAt: string | null;
		updatedAt: string | null;
	} | null;
};

export type ListUsersQueryVariables = {
	filter?: ModelUserFilterInput | null;
	limit?: number | null;
	nextToken?: string | null;
};

export type ListUsersQuery = {
	listUsers: {
		__typename: 'ModelUserConnection';
		items: Array<{
			__typename: 'User';
			id: string;
			username: string;
			premium: Premium | null;
			createdAt: string | null;
			updatedAt: string | null;
		} | null> | null;
		nextToken: string | null;
	} | null;
};

export type GetPostQueryVariables = {
	id: string;
};

export type GetPostQuery = {
	getPost: {
		__typename: 'Post';
		id: string;
		postTitle: string | null;
		postContent: string | null;
		postImage: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		votes: number | null;
		owner: string | null;
	} | null;
};

export type ListPostsQueryVariables = {
	filter?: ModelPostFilterInput | null;
	limit?: number | null;
	nextToken?: string | null;
};

export type ListPostsQuery = {
	listPosts: {
		__typename: 'ModelPostConnection';
		items: Array<{
			__typename: 'Post';
			id: string;
			postTitle: string | null;
			postContent: string | null;
			votes: number | null;
			owner: string | null;
		} | null> | null;
		nextToken: string | null;
	} | null;
};

export type GetVoteQueryVariables = {
	id: string;
};

export type GetVoteQuery = {
	getVote: {
		__typename: 'Vote';
		id: string;
		postId: string;
		createdBy: string;
		createdAt: string;
		vote: VoteType | null;
	} | null;
};

export type ListVotesQueryVariables = {
	filter?: ModelVoteFilterInput | null;
	limit?: number | null;
	nextToken?: string | null;
};

export type ListVotesQuery = {
	listVotes: {
		__typename: 'ModelVoteConnection';
		items: Array<{
			__typename: 'Vote';
			id: string;
			postId: string;
			createdBy: string;
			createdAt: string;
			vote: VoteType | null;
		} | null> | null;
		nextToken: string | null;
	} | null;
};

export type JokesByDateQueryVariables = {
	queryName?: string | null;
	date?: ModelStringKeyConditionInput | null;
	sortDirection?: ModelSortDirection | null;
	filter?: ModelJokeFilterInput | null;
	limit?: number | null;
	nextToken?: string | null;
};

export type JokesByDateQuery = {
	jokesByDate: {
		__typename: 'ModelJokeConnection';
		items: Array<{
			__typename: 'Joke';
			id: string;
			comedian: string | null;
			jokeSetup: string | null;
			jokePunchline: string | null;
			date: string | null;
			info: string | null;
			owner: string | null;
			visibility: Visibility | null;
			searchField: string | null;
			createdAt: string | null;
			queryName: string | null;
			numLikes: number | null;
		} | null> | null;
		nextToken: string | null;
	} | null;
};

export type VotesByUserQueryVariables = {
	createdBy?: string | null;
	createdAt?: ModelStringKeyConditionInput | null;
	sortDirection?: ModelSortDirection | null;
	filter?: ModelVoteFilterInput | null;
	limit?: number | null;
	nextToken?: string | null;
};

export type VotesByUserQuery = {
	votesByUser: {
		__typename: 'ModelVoteConnection';
		items: Array<{
			__typename: 'Vote';
			id: string;
			postId: string;
			createdBy: string;
			createdAt: string;
			vote: VoteType | null;
		} | null> | null;
		nextToken: string | null;
	} | null;
};

export type OnCreateJokeSubscription = {
	onCreateJoke: {
		__typename: 'Joke';
		id: string;
		comedian: string | null;
		jokeSetup: string | null;
		jokePunchline: string | null;
		date: string | null;
		info: string | null;
		file: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		owner: string | null;
		visibility: Visibility | null;
		searchField: string | null;
		createdAt: string | null;
		likes: {
			__typename: 'ModelJokeLikeConnection';
			nextToken: string | null;
		} | null;
		queryName: string | null;
		numLikes: number | null;
	} | null;
};

export type OnUpdateJokeSubscription = {
	onUpdateJoke: {
		__typename: 'Joke';
		id: string;
		comedian: string | null;
		jokeSetup: string | null;
		jokePunchline: string | null;
		date: string | null;
		info: string | null;
		file: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		owner: string | null;
		visibility: Visibility | null;
		searchField: string | null;
		createdAt: string | null;
		likes: {
			__typename: 'ModelJokeLikeConnection';
			nextToken: string | null;
		} | null;
		queryName: string | null;
		numLikes: number | null;
	} | null;
};

export type OnDeleteJokeSubscription = {
	onDeleteJoke: {
		__typename: 'Joke';
		id: string;
		comedian: string | null;
		jokeSetup: string | null;
		jokePunchline: string | null;
		date: string | null;
		info: string | null;
		file: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		owner: string | null;
		visibility: Visibility | null;
		searchField: string | null;
		createdAt: string | null;
		likes: {
			__typename: 'ModelJokeLikeConnection';
			nextToken: string | null;
		} | null;
		queryName: string | null;
		numLikes: number | null;
	} | null;
};

export type OnCreateUserJokeSubscription = {
	onCreateUserJoke: {
		__typename: 'UserJoke';
		id: string;
		userId: string | null;
		userName: string | null;
		userEmail: string | null;
		comedian: string | null;
		jokeText: string | null;
		info: string | null;
		file: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		createdAt: string | null;
	} | null;
};

export type OnUpdateUserJokeSubscription = {
	onUpdateUserJoke: {
		__typename: 'UserJoke';
		id: string;
		userId: string | null;
		userName: string | null;
		userEmail: string | null;
		comedian: string | null;
		jokeText: string | null;
		info: string | null;
		file: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		createdAt: string | null;
	} | null;
};

export type OnDeleteUserJokeSubscription = {
	onDeleteUserJoke: {
		__typename: 'UserJoke';
		id: string;
		userId: string | null;
		userName: string | null;
		userEmail: string | null;
		comedian: string | null;
		jokeText: string | null;
		info: string | null;
		file: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		createdAt: string | null;
	} | null;
};

export type OnCreateJokeLikeSubscription = {
	onCreateJokeLike: {
		__typename: 'JokeLike';
		id: string;
		jokeId: string | null;
		joke: {
			__typename: 'Joke';
			id: string;
			comedian: string | null;
			jokeSetup: string | null;
			jokePunchline: string | null;
			date: string | null;
			info: string | null;
			owner: string | null;
			visibility: Visibility | null;
			searchField: string | null;
			createdAt: string | null;
			queryName: string | null;
			numLikes: number | null;
		} | null;
		userId: string | null;
		createdAt: string | null;
	} | null;
};

export type OnUpdateJokeLikeSubscription = {
	onUpdateJokeLike: {
		__typename: 'JokeLike';
		id: string;
		jokeId: string | null;
		joke: {
			__typename: 'Joke';
			id: string;
			comedian: string | null;
			jokeSetup: string | null;
			jokePunchline: string | null;
			date: string | null;
			info: string | null;
			owner: string | null;
			visibility: Visibility | null;
			searchField: string | null;
			createdAt: string | null;
			queryName: string | null;
			numLikes: number | null;
		} | null;
		userId: string | null;
		createdAt: string | null;
	} | null;
};

export type OnDeleteJokeLikeSubscription = {
	onDeleteJokeLike: {
		__typename: 'JokeLike';
		id: string;
		jokeId: string | null;
		joke: {
			__typename: 'Joke';
			id: string;
			comedian: string | null;
			jokeSetup: string | null;
			jokePunchline: string | null;
			date: string | null;
			info: string | null;
			owner: string | null;
			visibility: Visibility | null;
			searchField: string | null;
			createdAt: string | null;
			queryName: string | null;
			numLikes: number | null;
		} | null;
		userId: string | null;
		createdAt: string | null;
	} | null;
};

export type OnCreateUserSubscriptionVariables = {
	id: string;
};

export type OnCreateUserSubscription = {
	onCreateUser: {
		__typename: 'User';
		id: string;
		username: string;
		premium: Premium | null;
		posts: {
			__typename: 'ModelPostConnection';
			nextToken: string | null;
		} | null;
		createdAt: string | null;
		updatedAt: string | null;
	} | null;
};

export type OnUpdateUserSubscriptionVariables = {
	id: string;
};

export type OnUpdateUserSubscription = {
	onUpdateUser: {
		__typename: 'User';
		id: string;
		username: string;
		premium: Premium | null;
		posts: {
			__typename: 'ModelPostConnection';
			nextToken: string | null;
		} | null;
		createdAt: string | null;
		updatedAt: string | null;
	} | null;
};

export type OnDeleteUserSubscriptionVariables = {
	id: string;
};

export type OnDeleteUserSubscription = {
	onDeleteUser: {
		__typename: 'User';
		id: string;
		username: string;
		premium: Premium | null;
		posts: {
			__typename: 'ModelPostConnection';
			nextToken: string | null;
		} | null;
		createdAt: string | null;
		updatedAt: string | null;
	} | null;
};

export type OnCreatePostSubscriptionVariables = {
	owner: string;
};

export type OnCreatePostSubscription = {
	onCreatePost: {
		__typename: 'Post';
		id: string;
		postTitle: string | null;
		postContent: string | null;
		postImage: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		votes: number | null;
		owner: string | null;
	} | null;
};

export type OnUpdatePostSubscriptionVariables = {
	owner: string;
};

export type OnUpdatePostSubscription = {
	onUpdatePost: {
		__typename: 'Post';
		id: string;
		postTitle: string | null;
		postContent: string | null;
		postImage: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		votes: number | null;
		owner: string | null;
	} | null;
};

export type OnDeletePostSubscriptionVariables = {
	owner: string;
};

export type OnDeletePostSubscription = {
	onDeletePost: {
		__typename: 'Post';
		id: string;
		postTitle: string | null;
		postContent: string | null;
		postImage: {
			__typename: 'S3Object';
			bucket: string;
			region: string;
			key: string;
			localUri: string | null;
			visibility: Visibility | null;
			mimeType: string | null;
		} | null;
		votes: number | null;
		owner: string | null;
	} | null;
};

export type OnCreateVoteSubscription = {
	onCreateVote: {
		__typename: 'Vote';
		id: string;
		postId: string;
		createdBy: string;
		createdAt: string;
		vote: VoteType | null;
	} | null;
};

export type OnUpdateVoteSubscription = {
	onUpdateVote: {
		__typename: 'Vote';
		id: string;
		postId: string;
		createdBy: string;
		createdAt: string;
		vote: VoteType | null;
	} | null;
};

export type OnDeleteVoteSubscription = {
	onDeleteVote: {
		__typename: 'Vote';
		id: string;
		postId: string;
		createdBy: string;
		createdAt: string;
		vote: VoteType | null;
	} | null;
};
