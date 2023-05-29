import mongoose from "mongoose";
import { MONGO_URL } from "$env/static/private";

export default function start_mongo() {
	console.log("Connecting to mongodb...");
	mongoose.connect(MONGO_URL, {
		dbName: "sveltekit-forum"
	});
}