import { Schema, Document, model } from "mongoose";
import type { UserDocument } from "./user";

export interface AccountDocument extends Document {
	userId: UserDocument["_id"],
	type: string,
	provider: string,
	providerAccountId: string,
    refresh_token: string,
    access_token: string,
    expires_at: Date,
    token_type: string,
    scope: string,
    id_token: string,
    session_state: string,
}

const Account = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: "User", required: true},
	type: { type: String },
	provider: { type: String },
	providerAccountId: { type: String },
    refresh_token: { type: String },
    access_token: { type: String },
    expires_at: { type: Date },
    token_type: { type: String },
    scope: { type: String },
    id_token: { type: String },
    session_state: { type: String },
}, {
	timestamps: true,
	collection: "sveltekit-forum",
});

export default model<AccountDocument>("account", Account, "accounts");