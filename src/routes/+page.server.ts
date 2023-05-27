import Post from "$lib/schemas/post.ts"

export const load = async ({ fetch, params, locals }) => {
	const posts = await Post.find({}, {
		_id: 0,
	});

	let user = null;
	const userLocal = await locals.user
	if (userLocal) {
		user = {
			email: userLocal.email,
			name: userLocal.name,
			picture: userLocal.picture,
		}
	}

	return {
		posts: posts.map((post) => post.toObject()).reverse(),
		user: user,
	}
}