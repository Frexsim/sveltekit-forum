import { redirect } from "@sveltejs/kit";
import getGoogleOAuthTokens from "$lib/scripts/getGoogleOAuthTokens.ts";
import getGoogleUser from "$lib/scripts/getGoogleUser.ts";
import findAndUpdateUser from "$lib/scripts/findAndUpdateUser.ts";
import { createSession, findSessions, updateSession } from "$lib/scripts/sessions.ts";
import { signJwt } from "$lib/scripts/jsonwebtoken.js";

export const GET = async ({ url, request, cookies }) => {
	const userAgent = request.headers.get("user-agent");
	const code = url.searchParams.get("code");

	const { id_token, access_token } = await getGoogleOAuthTokens({ code });

	const googleUser = await getGoogleUser({ id_token, access_token });
	const user = await findAndUpdateUser({
		email: googleUser.email,
	}, {
		email: googleUser.email,
		name: googleUser.name,
		picture: googleUser.picture
	}, {
		upsert: true,
		new: true
	});

	const session = await createSession(user._id, userAgent || "")

	const accessToken = signJwt(
		{ ...user, session: session._id },
		{ expiresIn: "15m" }
	);
	
	const refreshToken = signJwt(
		{ ...user, session: session._id },
		{ expiresIn: "1y" }
	);

	cookies.set("accessToken", accessToken, {
		maxAge: 900000,
		httpOnly: true,
		domain: "ifrex.xyz",
		path: "/",
		sameSite: "strict",
		secure: true,
	});
	
	cookies.set("refreshToken", refreshToken, {
		maxAge: 3.154e10,
		httpOnly: true,
		domain: "ifrex.xyz",
		path: "/",
		sameSite: "strict",
		secure: true,
	});

	console.log(cookies.getAll());

	throw redirect(302, `/`);
}