import db from "$db/mongo.ts"

export const load = async ({ fetch, params }) => {
	const postsCollection = db.collection("posts");

	const postData = await postsCollection.findOne({
		postId: parseInt(params.postId)
	}, {
		limit: 50,
		projection: {
			_id: 0,
			title: 1,
			content: 1,
			postId: 1,
			tags: 1,
			numberOfReplies: 1,
			replies: 1,
			creationDate: 1,
		}
	});

	return {
		post: postData
	};
}