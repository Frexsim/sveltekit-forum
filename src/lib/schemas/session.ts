import { Schema, Document, model } from "mongoose";
import type { UserDocument } from "./user";

export interface SessionDocument extends Document {
    expires: Date,
    sessionToken: string,
    userId: UserDocument["_id"],
}

const Session = new Schema({
    expires: { type: Date },
    sessionToken: { type: String },
    userId: { type: Schema.Types.ObjectId },
}, {
    timestamps: true,
    collection: "sveltekit-forum",
});

export default model<SessionDocument>("session", Session, "sessions");