import mongoose from "mongoose";
import { mongo_url } from "../../config.json";

export default function start_mongo() {
	console.log("Connecting to mongodb...");
	mongoose.connect(mongo_url, {
		dbName: "sveltekit-forum"
	});
}