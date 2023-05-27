import { Schema, Document, model } from "mongoose";
import type { UserDocument } from "./user";

export interface SessionDocument extends Document {
    user: UserDocument["_id"],
    valid: boolean,
    userAgent: string,
    createdAt: Date,
    updatedAt: Date,
}

const Session = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
}, {
    timestamps: true,
    collection: "sveltekit-forum",
});

export default model<SessionDocument>("session", Session, "sessions");