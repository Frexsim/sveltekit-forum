import { Schema, model } from "mongoose";

const ObjectId = Schema.ObjectId;

const User = new Schema({
	_id: Number,
	email: String,
	name: String,
	password: String
}, { collection: "sveltekit-forum" });

export default model("user", User, "users");