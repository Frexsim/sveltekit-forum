import User, { type UserDocument } from "$lib/schemas/user.ts"
import type { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export default async function findAndUpdateUser(query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions = {}) {
	return await User.findOneAndUpdate(query, update, options);
}