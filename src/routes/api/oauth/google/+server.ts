import getGoogleOAuthTokens from "$lib/scripts/getGoogleOAuthTokens.ts"

export const GET = async ({ url }) => {
	const code = url.searchParams.get("code") as string

	const { id_token, access_token } = await getGoogleOAuthTokens({ code });
	const googleUser = await getGoogleUser({ id_token, access_token });
	console.log({ googleUser });
}