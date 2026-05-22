import type { PageServerLoad } from './$types';
import { getAuthProvider } from '$lib/server/auth/auth.ts';
import type { User } from '$lib/models/user.ts';
import { getApps } from '$lib/server/apps/apps.ts';

export const load: PageServerLoad = async ({ locals }) => {
    const authProvider = getAuthProvider();
    const user = authProvider.getConnectedUser() as User;

    const apps = (await getApps()).filter((app) => {
        const groupSet = new Set(user.roles);
        return app.roles.some((role) => groupSet.has(role));
    });

    return {
        apps: apps
    };
};
