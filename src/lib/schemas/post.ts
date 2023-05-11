import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const Post = new Schema({
	_id: ObjectId,
	postId: Number,
	author: ObjectId,
	title: String,
	content: String,
	creationDate: Date,
	tags: [ ObjectId ],
	replies: [{ author: ObjectId, content: String, creationDate: Date }],
}, { collection: "sveltekit-forum" });

export default model("post", Post, "posts");