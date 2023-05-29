import { Schema, Document, model } from "mongoose";
import type { UserDocument } from "./user";

export interface PostDocument extends Document {
    postId: string,
    author: UserDocument["_id"],
    title: string,
	content: string,
    creationDate: Date,
	tags: [],
	replies: [],
}

const Post = new Schema({
	postId: { type: String, required: true },
	author: { type: Schema.Types.ObjectId, ref: "User", required: true },
	title: { type: String, required: true },
	content: { type: String, required: true },
	creationDate: { type: Date, required: true },
	tags: [
		{ type: Schema.Types.ObjectId }
	],
	replies: [
		{ author: { type: Schema.Types.ObjectId, ref: "User", required: true }, content: { type: String, required: true }, creationDate: { type: Date, required: true } }
	],
}, {
    timestamps: true,
    collection: "sveltekit-forum",
});

export default model<PostDocument>("post", Post, "posts");