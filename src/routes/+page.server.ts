import Post from "$lib/schemas/post.ts"

export const load = async () => {
	const posts = await Post.find({}, {
		_id: 0,
	});

	const parsedPosts = posts.map((post) => {
		let parsedPost = post.toObject();
		parsedPost.author = parsedPost.author.toString();

		return parsedPost;
	})

	return {
		posts: parsedPosts.reverse(),
	}
}