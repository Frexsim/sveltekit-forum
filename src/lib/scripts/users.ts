import type { UserDocument } from "$lib/schemas/user";
import User from "$lib/schemas/user";
import type { FilterQuery } from "mongoose";

export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean();
}