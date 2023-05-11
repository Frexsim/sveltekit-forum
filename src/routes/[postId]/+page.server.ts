import Post from "$lib/schemas/post.ts"

export const load = async ({ fetch, params }) => {
	const post = await Post.findOne({
		postId: parseInt(params.postId)
	}, {
		_id: 0,
	});

	return {
		post: post.toObject()
	};
}