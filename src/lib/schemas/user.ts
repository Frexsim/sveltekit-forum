import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const User = new Schema({
	_id: ObjectId,
	email: String,
	name: String,
	picture: String,
	password: String
}, { collection: "sveltekit-forum" });

export default model("user", User, "users");