import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types"
import User from "$lib/schemas/user";

export const load: PageServerLoad = async ({ locals }) => {
	const currentSession = await locals.getSession();
    if (!currentSession || !currentSession.user) throw redirect(303, "/");

    const matchingUser = await User.findOne({ name: currentSession.user.name, email: currentSession.user.email });
    if (!matchingUser || matchingUser.role != "admin") throw redirect(303, "/");

    return {}
}