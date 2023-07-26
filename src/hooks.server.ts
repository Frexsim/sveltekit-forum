import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import type { Adapter, AdapterAccount, AdapterSession, AdapterUser } from "@auth/core/adapters";
import { MONGO_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private";
import type { Handle } from "@sveltejs/kit";

import mongoose from "mongoose";
import User from "$lib/schemas/user";
import Session from "$lib/schemas/session";
import Account from "$lib/schemas/account";

mongoose.connect(MONGO_URL, {
	dbName: "sveltekit-forum"
});

function DatabaseAdapter(config: any): Adapter {
    return {
        async createUser(user) {
            const newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                email: user.email,
                emailVerified: user.emailVerified,
                name: user.name,
                image: user.image,
            });
            await newUser.save();

            return <AdapterUser>(newUser);
        },
        async getUser(id) {
            const foundUser = await User.findById(id);

            return <AdapterUser>(foundUser);
        },
        async getUserByEmail(email) {
            const foundUser = await User.findOne({ email });

            return <AdapterUser>(foundUser);
        },
        async getUserByAccount({ providerAccountId, provider }) {
            const foundAccount = await Account.findOne({ providerAccountId })
            if (!foundAccount) return null;
            const foundUser = await User.findById(foundAccount.userId);
            if (!foundUser) return null;

            return <AdapterUser>(foundUser);
        },
        async updateUser({ id, name, email, emailVerified, image }) {
            const updatedUser = await User.findOneAndUpdate({ _id: id }, { name, email, emailVerified, image });

            return <AdapterUser>(updatedUser);
        },
        async deleteUser(userId) {
            User.deleteOne({ _id: userId });
        },
        async linkAccount(account) {
            const newAccount = new Account({
                _id: new mongoose.Types.ObjectId(),
                userId: account.userId,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refresh_token: account.refresh_token,
                access_token: account.access_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
            });
            await newAccount.save();

            return <AdapterAccount><unknown>(newAccount);
        },
        async unlinkAccount({ providerAccountId, provider }) {
            await Account.deleteOne({ providerAccountId, provider });
        },
        async createSession({ sessionToken, userId, expires }) {
            const newSession = new Session({
                _id: new mongoose.Types.ObjectId(),
                expires,
                sessionToken,
                userId,
            });
            await newSession.save()

            return <AdapterSession>(newSession);
        },
        async getSessionAndUser(sessionToken) {
            const foundSession = await Session.findOne({ sessionToken });
            if (!foundSession) return null;
            let foundUser = await User.findById(foundSession.userId);
            if (!foundUser) return null;

            return {
                user: <AdapterUser>(foundUser),
                session: <AdapterSession>(foundSession),
            }
        },
        async updateSession({ sessionToken, userId, expires }) {
            const updatedSession = await Session.findOneAndUpdate(
                { sessionToken },
                { expires, sessionToken, userId },
                { new: true },
            );

            return <AdapterSession>(updatedSession);
        },
        async deleteSession(sessionToken) {
            console.log("🔑 deleteSession");
            console.log(sessionToken);

            return
        },
        //@ts-ignore
        async createVerificationToken({ identifier, expires, token }) {
            console.log("🔑 createVerificationToken");
            console.log(identifier);
            console.log("");
            console.log(expires);
            console.log("");
            console.log(token);

            return
        },
        //@ts-ignore
        async useVerificationToken({ identifier, token }) {
            console.log("🔑 useVerificationToken");
            console.log(identifier);
            console.log("");
            console.log(token);

            return
        },
    }
}

export const handle: Handle = SvelteKitAuth({
    providers: [
        // @ts-ignore
        Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })
    ],
    secret: AUTH_SECRET,
    // @ts-ignore
    adapter: DatabaseAdapter({}),
}) satisfies Handle;
