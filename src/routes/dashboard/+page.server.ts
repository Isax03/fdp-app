import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from "../$types";
import { getClientDB } from '$lib/firebase/client';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { User } from 'lucia';
import { hasPermission } from '$lib/utils';
import { UserPermissions } from '../../models/permissions';

export const load: PageServerLoad = async ({locals}) => {
	if (!locals.user)
		redirect(302, "/login");

	if (!locals.user.email_verified)
		redirect(302, "/login/verify-email");

	if (!hasPermission(locals.user.permissions, UserPermissions.DASHBOARD))
		redirect(302, "/");

	const usersCollection = collection(getClientDB(), "users");
	const qUsers = query(usersCollection, where("permissions", ">=", UserPermissions.SELL));
	const qSnapUsers = await getDocs(qUsers);

	const sellers = (qSnapUsers.docs.map((userDoc) => {
		return userDoc.data();
	}) as User[])
	.filter(
		(user) =>
			hasPermission(user.permissions, UserPermissions.SELL)
	);

	return {
		user: locals.user,
		sellers
	};
};