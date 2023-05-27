import axios from "axios";

export default async function getGoogleUser({ id_token, access_token }) {
	try {
		const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
			headers: {
				Autorization: `Bearer ${id_token}`,
			},
		});

		return res.data;
	} catch (error) {
		console.error(error)
	}
}