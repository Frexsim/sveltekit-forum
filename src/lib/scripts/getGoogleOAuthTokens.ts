import axios from "axios"
import { google_client_id, google_client_secret, google_oauth_redirect_url } from "../../config.json";

export default async function getGoogleOAuthTokens ({ code }) {
	const url = "https://oauth2.googleapis.com/token";
	const options = {
		code,
		client_id: google_client_id,
		client_secret: google_client_secret,
		redirect_uri: google_oauth_redirect_url,
		grant_type: "authorization_code",
	};

	const qs = new URLSearchParams(options);

	try {
		const res = await axios.post(url, qs.toString(), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		return res.data
	} catch (error) {
		console.error(error)
	}
}