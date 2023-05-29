import mongoose from "mongoose";
import Post from "$lib/schemas/post.ts"
import { redirect } from "@sveltejs/kit";
import User from "$lib/schemas/user.js";

export const load = async ({ locals }) => {
	//const tagsCollection = await db.collection("tags");
	//if (!tagsCollection) return;

	//const tagsData = await tagsCollection.find({}, {
	//	limit: 50,
	//	projection: {
	//		_id: 0,
	//		name: 1,
	//	}
	//}).toArray();

	return {
		tags: {},
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	post: async ({ request, locals }) => {
		const formData = await request.formData();
		const title = await formData.get("title");
		const content = await formData.get("content");

		const userSession = await locals.getSession();
		const foundUser = await User.findOne({ name: userSession?.user?.name, email: userSession?.user?.email });

		const postId = await Post.count() + 1;
		const newPost = new Post({
			_id: new mongoose.Types.ObjectId(),
			postId: postId,
			author: foundUser?._id,
			title: title,
			content: content,
			creationDate: Date.now()
		});

		await newPost.save().catch(console.error);

		throw redirect(302, `/${postId}`);
	}
}