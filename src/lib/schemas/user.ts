import { Schema, Document, model } from "mongoose";

export interface UserDocument extends Document {
	name: string,
	email: string,
	emailVerified: Date | null,
	image: string,
}

const User = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	emailVerified: { type: Date },
	image: { type: String },
}, {
	timestamps: true,
	collection: "sveltekit-forum",
});

export default model<UserDocument>("user", User, "users");