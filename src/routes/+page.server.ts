import mongoose from "mongoose";
import Post from "$lib/schemas/post.ts"

export const load = async ({ fetch, params }) => {
	const posts = await Post.find({}, {})

	return {
		posts: posts
	};
}