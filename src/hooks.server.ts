import start_mongo from "$db/mongo.ts";

start_mongo();

import Session from "$lib/schemas/session";
import User from "$lib/schemas/user";
import { verifyJwt } from "$lib/scripts/jsonwebtoken";
import { findUser } from "$lib/scripts/users";
import pkg from "lodash";
const { get } = pkg;

export const handle = async ({ event, resolve }) => {
    const accessToken = await event.cookies.get("accessToken");
    if (!accessToken) return await resolve(event);

    const { decoded } = verifyJwt(accessToken);
    if (!decoded || !get(decoded, "session")) return await resolve(event);

    const session = await Session.findById(get(decoded, "session"));
    if (!session) return await resolve(event);

    const user = await User.findById(session.user)
    if (!user) return await resolve(event);

    event.locals.user = findUser({ _id: session.user });
    
    return await resolve(event);
}