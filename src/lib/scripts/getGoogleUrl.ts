import { google_oauth_redirect_url, google_client_id } from "$conifg";

export default function getGoogleOAuthURL() {
	const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

	const options = {
		redirect_uri: google_oauth_redirect_url,
		client_id: google_client_id,
		access_type: "offline",
		response_type: "code",
		prompt: "consent",
		scope: [
			"https://www.googleapis.com/auth/userinfo.profile",
			"https://www.googleapis.com/auth/userinfo.email"
		].join(" ")
	}

	const qs = new URLSearchParams(options);

	return `${rootUrl}?${qs.toString()}`
}