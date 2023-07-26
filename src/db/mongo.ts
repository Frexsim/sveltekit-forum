import mongoose from "mongoose";

export default function start_mongo(mongoUrl: string) {
	console.log("Connecting to mongodb...");
	//@ts-ignore
	mongoose.connect(mongoUrl, {
		dbName: "sveltekit-forum"
	});
}