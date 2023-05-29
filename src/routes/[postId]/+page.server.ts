import Post from "$lib/schemas/post.ts"
import User from "$lib/schemas/user.js";

export const load = async ({ params }) => {
	const post = await Post.findOne({
		postId: parseInt(params.postId)
	}, {
		_id: 0,
	});

	if (!post) return { post: null }

	let parsedPost = post.toObject();
	parsedPost.author = await User.findById(parsedPost.author, { _id: 0 });
	parsedPost.author = parsedPost.author.toObject();

	return {
		post: parsedPost
	};
}