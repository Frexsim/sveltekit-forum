import mongoose from "mongoose";
//import { mongo_url } from "$conifg";

export default function start_mongo() {
	console.log("Connecting to mongodb...");
	mongoose.connect("mongodb+srv://linlju0601:coolpassword@cluster.458ky17.mongodb.net/?retryWrites=true&w=majority", {
		dbName: "sveltekit-forum"
	});
}