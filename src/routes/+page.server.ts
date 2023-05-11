import Post from "$lib/schemas/post.ts"

export const load = async ({ fetch, params }) => {
	const posts = await Post.find({}, {
		_id: 0,
	})

	return {
		posts: posts.map((post) => post.toObject())
	};
}